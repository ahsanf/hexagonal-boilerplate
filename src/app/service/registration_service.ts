import { logger } from "../../util/logger/logger";
import { FirestoreBaseAdapter } from "../../adapter/out/firebase/firestore/adapter/base_adapter";
import { FirestoreAdapter } from "../../adapter/out/firebase/firestore/adapter/adapter";
import { RegistrationUseCase } from "../port/out/registration_use_case";

export class RegistrationService implements RegistrationUseCase{
  private firestoreAdapter:FirestoreBaseAdapter

  constructor(){
    this.firestoreAdapter = new FirestoreAdapter()
  }
  async register(email: string, token: string, traceId?: string | undefined): Promise<void> {
    logger.info(this.register.name, RegistrationService.name, traceId)
    return await this.firestoreAdapter.registerToken(email, token, traceId)
  }
  async clear(email: string, traceId?: string | undefined): Promise<void> {
    logger.info(this.clear.name, RegistrationService.name, traceId)
    return await this.firestoreAdapter.clearToken(email, traceId)
  }
}