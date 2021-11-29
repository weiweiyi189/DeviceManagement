/**
 * 部门实体
 */
import {User} from './User';

export class Department {
  /** id */
  id: number;

  /** 名称 */
  name: string;

  /** 编号 */
  code: string;

  /** 部门经理 */
  user: User;
  constructor(data?: { id?: number, name?: string, code?: string, user?: User}) {
    if (data) {
      if (data.id) {
        this.id = data.id;
      }

      if (data.name) {
        this.name = data.name;
      }

      if (data.code) {
         this.code = data.code;
       }

      if (data.user) {
        this.user = data.user;
      }
    }

  }
}
