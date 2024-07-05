/**
 * Interface for domain use case
 * @interface IDomainUseCase
 */
export interface IDomainUseCase {
  //add your function here
  insert(): Promise<void>;
  update(): Promise<void>;
  delete(): Promise<void>;
}