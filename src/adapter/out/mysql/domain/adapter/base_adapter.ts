/**
 * @interface IDomainMysqlAdapter
 * @description Adapter interface for domain mysql, this interface must be implemented in the adapter layer
 */
export interface IDomainMysqlAdapter {
  //add your function here
  insert(): Promise<void>;
  update(): Promise<void>;
  delete(): Promise<void>;
}