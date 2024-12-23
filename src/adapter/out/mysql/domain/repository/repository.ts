import { UserMysqlEntity } from "../entity/domain";
import { IDomainMysqlRepository } from "./base_repository";
import { logger } from "@logger";
import { getMysqlClient } from "@mysql";

export class DomainMysqlRepository implements IDomainMysqlRepository {
  private tableName: string = "users";
  private perPage: number = 10;
  private client = getMysqlClient();

  async findAll(perPage: number, currentPage: number, traceId?: string | undefined ): Promise<UserMysqlEntity[]> {
    logger.info(this.findAll.name, DomainMysqlRepository.name, traceId);
    if (perPage) this.perPage = perPage;
    const current = currentPage ?? 1;
    const skip: number = (current - 1) * this.perPage;
    const data = this.client<UserMysqlEntity>(this.tableName)
      .select("*")
      .limit(perPage)
      .offset(skip)
      .orderBy("id", "desc");

    return Promise.resolve(data);
  }
}
