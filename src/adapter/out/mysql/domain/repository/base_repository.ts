import { UserMysqlEntity } from "../entity/domain";

/**
 * Base repository interface
 * @interface IDomainMysqlRepository
 * @description Base repository interface for user mysql, this interface must be implemented in the repository layer
 */
export interface IDomainMysqlRepository {
  findAll( perPage: number, currentPage: number, traceId?: string | undefined ): Promise<UserMysqlEntity[]>
}
  