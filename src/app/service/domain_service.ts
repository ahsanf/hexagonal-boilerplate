/**
 * @fileoverview domain service
 * @description This file defines the domain service, this service is used to handle the business logic of the domain
 * 
 */

import { logger } from "../../util/logger/logger";
import { IDomainUseCase } from "../port/out/domain_use_case";

export class DomainService implements IDomainUseCase {
  //add your function here
  insert(): Promise<void> {
    logger.info(this.insert.name, DomainService.name); // implement log
    throw new Error("Method not implemented.");
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}