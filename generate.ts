import path from "path";
const fs = require("fs");
import { readFileSync, writeFileSync, renameSync } from "fs";
const argv = process.argv;

// Usage bun run generate.ts --domain=User --domainFile=user.ts --mongoEntityFile=user_mongo.ts
const args = Object.fromEntries(
  argv.slice(2).map(arg => {
    const [key, val] = arg.replace(/^--/, "").split("=");
    return [key, val];
  })
);

const domain = args.domain; // User
const domainFile = args.domainFile; // user.ts
const mongoEntityFile = args.mongoEntityFile; // user_mongo.ts

if (!domain || !domainFile || !mongoEntityFile) {
  console.error("Missing required arguments.");
  process.exit(1);
}

// --- Utils ---
const toSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter, i) => (i ? "_" : "") + letter.toLowerCase());
const toUrlCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter, i) => (i ? "-" : "") + letter.toLowerCase());
const domainSnake = toSnakeCase(domain);
const domainCamel = domain;
const domainUrl = toUrlCase(domain);

const srcDir = `src`;

const adapterOutDir = `${srcDir}/adapter/out/mongodb/${domainSnake}`;
const adapterInDir = `${srcDir}/adapter/in/rest/${domainSnake}`;
const appDir = `${srcDir}/app`;

const utilInDir = path.join(adapterOutDir, 'util');
const entityDir = path.join(adapterOutDir, 'entity');
const repositoryDir = path.join(adapterOutDir, 'repository');
const adapterDir = path.join(adapterOutDir, 'adapter');

const controllerDir = path.join(adapterInDir, 'controller');
const utilOutDir = path.join(adapterInDir, 'util');

const useCaseDir = path.join(appDir, 'port/out');
const serviceDir = path.join(appDir, 'service');
const domainDir = path.join(srcDir, 'domain');


[utilInDir, entityDir, repositoryDir, adapterDir, controllerDir, utilOutDir, useCaseDir, serviceDir].forEach(dir => {
  mkdirSync(dir, { recursive: true });
});


// --- Read Types ---
const domainContent = readFileSync(domainFile, "utf-8");
const mongoContent = readFileSync(mongoEntityFile, "utf-8");



const parseFields = (content: string) => {
  const match = content.match(/type\s+\w+\s+=\s+{([^}]+)}/);
  if (!match) return [];
  return match[1]
    .trim()
    .split("\n")
    .map(line => line.trim().replace(/,$/, ""))
    .filter(Boolean);
};

const keyOnlyFields = (fields: string[]) => {
  return fields.map(field => {
    const key = field.split(":")[0].trim();
    return key.endsWith("?") ? `${key.slice(0, -1)}` : key;
  });
}

const domainFields = parseFields(domainContent); // id, name, email?
const mongoFields = parseFields(mongoContent); // _id, name, email?
const keyDomainFields = keyOnlyFields(domainFields);
const keyMongoFields = keyOnlyFields(mongoFields);

// --- Move Mongo Entity File ---
renameSync(mongoEntityFile, `${entityDir}/${mongoEntityFile}`);

// --- Move Domain File ---
renameSync(domainFile, `${domainDir}/${domainFile}`);

const converterLines = [
  `import { ${domainCamel} } from "@domain/${domainSnake}";`,
  `import { ${domainCamel}MongoEntity } from "../entity/${domainSnake}_mongo";`,
  `import { ObjectId } from "mongodb";`,
  ``,
  `export const toDomain = (entity: ${domainCamel}MongoEntity): ${domainCamel} => {`,
  `  return {`,
  ...domainFields.map((field, index) => {
    if (field.startsWith("id")) return `    id: entity._id.toHexString(),`;
    const key = field.split(":")[0].trim().replace("?", "");
    return `    ${key}: entity.${keyMongoFields[index]},`;
  }),
   `  };`,
  `};`,
  ``,
  `export const toEntity = (domain: ${domainCamel}): ${domainCamel}MongoEntity => {`,
  `  return {`,
  ...domainFields.map((field, index) => {
    if (field.startsWith("id")) return `    _id: domain.id ? new ObjectId(domain.id) : new ObjectId(),`;
    const key = field.split(":")[0].trim().replace("?", "");
    return `    ${keyMongoFields[index]}: domain.${key},`;
  }),
  `  };`,
  `};`,
  ``,
  `export const toPartialDomain = (entity: Partial<${domainCamel}MongoEntity>): Partial<${domainCamel}> => {`,
  `  return {`,
  ...mongoFields.map((field, index) => {
    if (field.startsWith("_id")) return `    id: entity._id?.toString(),`;
    const key = field.split(":")[0].trim().replace("?", "");
    return `    ${keyDomainFields[index]}: entity.${key},`;
  }), 
  `  };`,
  `};`,
  ``,
  `export const toPartialEntity = (domain: Partial<${domainCamel}>): Partial<${domainCamel}MongoEntity> => {`,
  `  return {`,
  ...domainFields.map((field, index) => {
    if (field.startsWith("id")) return `    _id: domain.id ? new ObjectId(domain.id) : undefined,`;
    const key = field.split(":")[0].trim().replace("?", "");
    return `    ${keyMongoFields[index]}: domain.${key},`;
  }),
  `  };`,
  `};`,
  ``,
];

const baseRepoContent = `
import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { ObjectId } from "mongodb"
import { ${domainCamel}MongoEntity } from "../entity/${domainSnake}_mongo"

export interface I${domainCamel}MongoRepository {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<${domainCamel}MongoEntity[]>
  getStats(traceId?: string): Promise<Stats>
  getById(id: ObjectId, traceId?: string): Promise<${domainCamel}MongoEntity | null>
  create(data: ${domainCamel}MongoEntity, traceId?: string): Promise<${domainCamel}MongoEntity>
  update(id: ObjectId, data: Partial<${domainCamel}MongoEntity>, traceId?: string): Promise<Partial<${domainCamel}MongoEntity>>
  delete(id: ObjectId, traceId?: string): Promise<boolean>
}
`;

const repoContent = `
import { Filter } from "@domain/filter";
import { Stats } from "@domain/stats";
import { Collection, Db, FindOptions, ObjectId } from "mongodb";
import { ${domainCamel}MongoEntity } from "../entity/${domainSnake}_mongo";
import { I${domainCamel}MongoRepository } from "./base_repository";
import { logger } from "@logger";
import { config } from "@config";
import { COLLECTION } from "@domain/constant";
import { getMongoClient } from "@util/mongodb/mongodb";
import { ApplicationError } from "@util/error/application_error";
import { HttpError } from "@util/error/type/http_error";
import { removeUndefinedField } from "@util/converter/global_converter";

export class ${domainCamel}MongoRepository implements I${domainCamel}MongoRepository {
  private dbName: string = 'dbName' // Replace with actual database name;
  private tableName: string = 'tableName' // Replace with actual table name
  private db: Db
  private collection: Collection<${domainCamel}MongoEntity>
  private perPage: number | undefined = 10 
  private current: number | undefined = 1
  private query: any = {}
  private findOptions: FindOptions = {}

  constructor(){
    this.db = getMongoClient().db(this.dbName)
    this.collection = this.db.collection(this.tableName)
  }

  filterSearch(query?: string): any {
    if(query === undefined) return {}
    return {
      $or: [
        { year: { $regex: '.*'+query+'.*', $options: 'i' } },
        { description: { $regex: '.*'+query+'.*', $options: 'i' } },
      ]
    }
  }

  filterIsActive(isActive?: boolean): any {
    return isActive === undefined ? {} : { is_active: isActive };
  }

  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<${domainCamel}MongoEntity[]> {
    logger.info(this.getAll.name, ${domainCamel}MongoRepository.name, traceId);
    let sortOrder: 'asc' | 'desc' = 'asc';
    if (filter?.sortOrder === 1 || filter?.sortOrder === 'asc') sortOrder = 'asc';
    else if (filter?.sortOrder === -1 || filter?.sortOrder === 'desc') sortOrder = 'desc';

    this.findOptions = {
      collation: { locale: 'en', numericOrdering: true },
      limit: perPage,
      skip: currentPage && perPage ? (currentPage - 1) * perPage : 0,
      sort: filter?.sortBy ? [[filter.sortBy, sortOrder]] : []
    };
    
    this.query = {
      $and: [
        this.filterSearch(filter?.query),
        this.filterIsActive(filter?.isActive)
      ]
    }


    const data = await this.collection
      .find(this.query, this.findOptions)
      .toArray();

    return data;
  }
  
  async getStats(traceId?: string): Promise<Stats> {
    logger.info(this.getStats.name, ${domainCamel}MongoRepository.name, traceId);
    if(this.perPage && this.current) {
      const totalData: number = await this.collection.countDocuments(this.query)
      const totalPage: number = Math.ceil(totalData / this.perPage)
     
      return {
        totalData: totalData,
        currentPage: this.current,
        totalPage: totalPage,
        perPage: this.perPage
      }
    }

    return {
      totalData: 0,
      currentPage: 0,
      totalPage: 0,
      perPage: 0
    }
  }
  
  async getById(id: ObjectId, traceId?: string): Promise<${domainCamel}MongoEntity | null> {
    logger.info(this.getById.name, ${domainCamel}MongoRepository.name, traceId);
    return await this.collection.findOne({ _id: id });;
  }
  
  async create(data: ${domainCamel}MongoEntity, traceId?: string): Promise<${domainCamel}MongoEntity> {
    logger.info(this.create.name, ${domainCamel}MongoRepository.name, traceId);
    try {
      await this.collection.insertOne({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      return data
    } catch (error) {
      throw new ApplicationError(HttpError('Failed to insert data').INTERNAL_SERVER_ERROR)
    }
  }
  
  async update(id: ObjectId, data: Partial<${domainCamel}MongoEntity>, traceId?: string): Promise<Partial<${domainCamel}MongoEntity>> {
    logger.info(this.update.name, ${domainCamel}MongoRepository.name, traceId);
    const {_id,...updateData} = data
    try {
      await this.collection.updateOne({ _id: id }, {
        $set: {
          ...removeUndefinedField(updateData),
          updated_at: new Date()
        }
      })
      return data
    } catch (error) {
      throw new ApplicationError(HttpError('Failed to update data').INTERNAL_SERVER_ERROR)
    }
  }
  
  async delete(id: ObjectId, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, ${domainCamel}MongoRepository.name, traceId);
    const result = await this.collection.deleteOne({ _id: id })
    return result.deletedCount > 0
  }
  
}
`

const baseAdapterContent = `
import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { ${domainCamel} } from "@domain/${domainSnake}"

export interface I${domainCamel}MongoAdapter {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<${domainCamel}[]>
  getStats(traceId?: string): Promise<Stats>
  getById(id: string, traceId?: string): Promise<${domainCamel} | null>
  create(data: ${domainCamel}, traceId?: string): Promise<${domainCamel}>
  update(id: string, data: Partial<${domainCamel}>, traceId?: string): Promise<Partial<${domainCamel}>>
  delete(id: string, traceId?: string): Promise<boolean>
}
`;

const adapterContent = `
import { Filter } from "@domain/filter";
import { Stats } from "@domain/stats";
import { I${domainCamel}MongoRepository } from "../repository/base_repository";
import { ${domainCamel}MongoRepository } from "../repository/repository";
import { I${domainCamel}MongoAdapter } from "./base_adapter";
import { logger } from "@logger";
import { toDomain, toEntity, toPartialDomain, toPartialEntity } from "../util/converter";
import { ObjectId } from "mongodb";
import { ${domainCamel} } from "@domain/${domainSnake}";

export class ${domainCamel}MongoAdapter implements I${domainCamel}MongoAdapter {
  private repository: I${domainCamel}MongoRepository;

  constructor() {
    this.repository = new ${domainCamel}MongoRepository();
  }
  
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<${domainCamel}[]> {
    logger.info(this.getAll.name, ${domainCamel}MongoAdapter.name, traceId);
    return (await this.repository.getAll(currentPage, perPage, filter, traceId)).map(toDomain)
  }
  
  async getStats(traceId?: string): Promise<Stats> {
    logger.info(this.getStats.name, ${domainCamel}MongoAdapter.name, traceId);
    return await this.repository.getStats(traceId);
  }
  
  async getById(id: string, traceId?: string): Promise<${domainCamel} | null> {
    logger.info(this.getById.name, ${domainCamel}MongoAdapter.name, traceId);
    const data = await this.repository.getById(new ObjectId(id), traceId);
    return data !== null ? toDomain(data) : null;
  }
  
  async create(data: ${domainCamel}, traceId?: string): Promise<${domainCamel}> {
    logger.info(this.create.name, ${domainCamel}MongoAdapter.name, traceId);
    return toDomain(await this.repository.create(toEntity(data), traceId));
  }
  
  async update(id: string, data: Partial<${domainCamel}>, traceId?: string): Promise<Partial<${domainCamel}>> {
    logger.info(this.update.name, ${domainCamel}MongoAdapter.name, traceId);
    return toPartialDomain(await this.repository.update(new ObjectId(id), toPartialEntity(data), traceId));
  }
  
  async delete(id: string, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, ${domainCamel}MongoAdapter.name, traceId);
    return await this.repository.delete(new ObjectId(id), traceId);
  }
}
`

const useCaseContent = `
import { Stats } from "@domain/stats"
import { Filter } from "@domain/filter"
import { ${domainCamel} } from "@domain/${domainSnake}"

export interface I${domainCamel}UseCase {
  getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<${domainCamel}[]>
  getStats(traceId?: string): Promise<Stats>
  getById(id: string, traceId?: string): Promise<${domainCamel} | null>
  create(data: ${domainCamel}, traceId?: string): Promise<${domainCamel}>
  update(id: string, data: Partial<${domainCamel}>, traceId?: string): Promise<Partial<${domainCamel}>>
  delete(id: string, traceId?: string): Promise<boolean>
}
`

const serviceContent = `
import { ${domainCamel}MongoAdapter } from "@adapter_out/mongodb/${domainSnake}/adapter/adapter";
import { I${domainCamel}MongoAdapter } from "@adapter_out/mongodb/${domainSnake}/adapter/base_adapter";
import { ${domainCamel} } from "@domain/${domainSnake}";
import { Filter } from "@domain/filter";
import { Stats } from "@domain/stats";
import { logger } from "@logger";
import { I${domainCamel}UseCase } from "@use_case/${domainSnake}_use_case";

export class ${domainCamel}Service implements I${domainCamel}UseCase {
  private mongoAdapter: I${domainCamel}MongoAdapter;

  constructor() {
    this.mongoAdapter = new ${domainCamel}MongoAdapter();
  }
  
  async getAll(currentPage?: number, perPage?: number, filter?: Filter, traceId?: string): Promise<${domainCamel}[]> {
    logger.info(this.getAll.name, ${domainCamel}Service.name, traceId);
    return await this.mongoAdapter.getAll(currentPage, perPage, filter, traceId);
  }
  
  async getStats(traceId?: string): Promise<Stats> {
    logger.info(this.getStats.name, ${domainCamel}Service.name, traceId);
    return await this.mongoAdapter.getStats(traceId);
  }
  
  async getById(id: string, traceId?: string): Promise<${domainCamel} | null> {
    logger.info(this.getById.name, ${domainCamel}Service.name, traceId);
    return await this.mongoAdapter.getById(id, traceId);
  }
  
  async create(data: ${domainCamel}, traceId?: string): Promise<${domainCamel}> {
    logger.info(this.create.name, ${domainCamel}Service.name, traceId);
    return await this.mongoAdapter.create(data, traceId);
  }
  
  async update(id: string, data: Partial<${domainCamel}>, traceId?: string): Promise<Partial<${domainCamel}>> {
    logger.info(this.update.name, ${domainCamel}Service.name, traceId);
    return await this.mongoAdapter.update(id, data, traceId);
  }
  
  async delete(id: string, traceId?: string): Promise<boolean> {
    logger.info(this.delete.name, ${domainCamel}Service.name, traceId);
    return await this.mongoAdapter.delete(id, traceId);
  }

}
`

const restControllerContent = `
import { BaseController } from "@common/base_controller";
import { Express, Request, Response } from "express";
import { queryToFilter } from "../util/converter";
import { getLogTraceId } from "@logger";
import { dataToRestResponse } from "@util/converter/global_converter";
import { errorHandler } from "@util/error/error_handler";
import { globalAuthMiddleware } from "@util/middlewares/auth";
import { I${domainCamel}UseCase } from "@use_case/${domainSnake}_use_case";
import { ${domainCamel}Service } from "@service/${domainSnake}_service";

export class ${domainCamel}RestController implements BaseController {
  private app: Express;
  private readonly prefix: string = "/${domainUrl}s";
  private service: I${domainCamel}UseCase;

  constructor(app: Express) {
    this.app = app;
    this.service = new ${domainCamel}Service();
  }

  init(): void {
    this.app.get(this.prefix, globalAuthMiddleware, this.getAll.bind(this));
    this.app.get(this.prefix + '/:id', globalAuthMiddleware, this.getById.bind(this));
    this.app.post(this.prefix, globalAuthMiddleware, this.create.bind(this));
    this.app.put(this.prefix + '/:id', globalAuthMiddleware, this.update.bind(this));
    this.app.delete(this.prefix + '/:id', globalAuthMiddleware, this.delete.bind(this));
  }

  async getAll(req: Request, res: Response): Promise<void> {
     try {
      const filter = queryToFilter(req)
      const traceId = getLogTraceId();
      const data = await this.service.getAll(filter.currentPage, filter.perPage, filter, traceId)
      const stats = filter.currentPage !== undefined && filter.perPage !== undefined ? await this.service.getStats(traceId) : undefined;
      res.json(dataToRestResponse(data, stats));
      
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.getById(req.params.id, getLogTraceId());
      res.json(dataToRestResponse(data));
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.create(req.body, getLogTraceId());
      res.status(201).json(dataToRestResponse(data));
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.update(req.params.id, req.body, getLogTraceId());
      res.json(dataToRestResponse(data));
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.service.delete(req.params.id, getLogTraceId());
      res.json(dataToRestResponse(result));
    } catch (error) {
      errorHandler(error, res);
    }
  }
}
`

const converterInContent = `
import { COMMON } from "@domain/constant"
import { Filter } from "@domain/filter"
import { Request } from "express"

export const queryToFilter = (req: Request): Filter => {
  return {
    perPage: req.query.perPage !== undefined && req.query.perPage !== '' ? parseInt(req.query.perPage.toString()) : undefined,
    currentPage: req.query.page !== undefined && req.query.page !== '' ? parseInt(req.query.page.toString()) : undefined,
    query: req.query.q !== undefined ? req.query.q as string : '',
    sortBy: req.query.sortBy !== undefined ? req.query.sortBy as string : undefined,
    sortOrder: req.query.sortOrder !== undefined ? (req.query.sortOrder === COMMON.ASC || req.query.sortOrder === '1' ? COMMON.ASC : (req.query.sortOrder === COMMON.DESC || req.query.sortOrder === '-1' ? COMMON.DESC : parseInt(req.query.sortOrder as string))) : undefined,
    isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
  }
}
`



writeFileSync(`${repositoryDir}/base_repository.ts`, baseRepoContent.trim());
writeFileSync(`${repositoryDir}/repository.ts`, repoContent.trim());

writeFileSync(`${adapterDir}/base_adapter.ts`, baseAdapterContent.trim());
writeFileSync(`${adapterDir}/adapter.ts`, adapterContent.trim());

writeFileSync(`${appDir}/port/out/${domainSnake}_use_case.ts`, useCaseContent.trim());
writeFileSync(`${serviceDir}/${domainSnake}_service.ts`, serviceContent.trim());

writeFileSync(`${utilInDir}/converter.ts`, converterLines.join("\n"));
writeFileSync(`${controllerDir}/controller.ts`, restControllerContent.trim());
writeFileSync(`${utilOutDir}/converter.ts`, converterInContent.trim());

console.log("✔️ Generation complete.");

function mkdirSync(dir: string, arg1: { recursive: boolean; }) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: arg1.recursive });
    }
    return dir;
}

