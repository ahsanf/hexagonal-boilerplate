import { logger } from "../../../../../util/logger/logger";
import { IDomainMysqlAdapter } from "./base_adapter";

export class DomainMysqlAdapter implements IDomainMysqlAdapter {
  insert(): Promise<void> {
    logger.info(this.insert.name, DomainMysqlAdapter.name); // implement log
    throw new Error("Method not implemented.");
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}
  