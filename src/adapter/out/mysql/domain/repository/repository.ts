import knex from "knex";
import { config } from "../../../../../util/mysql/mysql";
import { UserMysqlEntity } from "../entity/domain";
import { IDomainMysqlRepository } from "./base_repository";
import { logger } from "../../../../../util/logger/logger";

export class DomainMysqlRepository implements IDomainMysqlRepository {
  private tableName: string = "users";
  private perPage: number = 10;
  private db = knex(config);

  async findAll(perPage: number, currentPage: number, traceId?: string | undefined ): Promise<UserMysqlEntity[]> {
    logger.info(this.findAll.name, DomainMysqlRepository.name, traceId);
    if (perPage) this.perPage = perPage;
    const current = currentPage ?? 1;
    const skip: number = (current - 1) * this.perPage;
    const data = this.db<UserMysqlEntity>(this.tableName)
      .select("*")
      .limit(perPage)
      .offset(skip)
      .orderBy("id", "desc");

    return Promise.resolve(data);
  }
}
