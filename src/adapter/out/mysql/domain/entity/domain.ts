/**
 * add domain mysql entity
 * example:
 * @name User
 * @description
 * User is a value object that represents a user.
 * @property {string} id - user id
 * @property {string} name - user name
 * @property {string} email - user email
 * @property {string} password - user password
 * @property {string} createdAt - user created at
 * @property {string} updatedAt - user updated at
 * @property {string} deletedAt - user deleted at
 * 
 */

export type UserMysqlEntity = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

