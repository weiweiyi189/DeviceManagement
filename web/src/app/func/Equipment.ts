/**
 * 设备实体
 */
import {Department} from './Department';
import {Type} from './Type';
import {User} from './User';

export class Equipment {
  /** id */
  id: number;

  /** 名称 */
  name: string;

  /** 类型 */
  type: Type;

  /** 型号 */
  model: string;

  user: User;

  /** 内部编号 */
  internalNumber: string;

  department: Department;

  place: string;

  states: number;

  deleted: boolean;

  // 用途
  purpose: string;

  // 评分 满分5
  score: number;

  // tslint:disable-next-line:max-line-length
  constructor(data?: {
    id?: number, name?: string, type?: Type, model?: string,
    internalNumber?: string, department?: Department, place?: string,
    states?: number, user?: User, deleted?: boolean, purpose?: string;
  }) {
    if (data) {
      if (data.id) {
        this.id = data.id;
      }

      if (data.name) {
        this.name = data.name;
      }

      if (data.type) {
        this.type = data.type;
      }

      if (data.model) {
        this.model = data.model;
      }

      if (data.internalNumber) {
        this.internalNumber = data.internalNumber;
      }
      if (data.department) {
        this.department = data.department;
      }
      if (data.states) {
        this.states = data.states;
      }
      if (data.place) {
        this.place = data.place;
      }

      if (data.user) {
        this.user = data.user;
      }

      if (data.deleted) {
        this.deleted = data.deleted;
      }

      if (data.purpose) {
        this.purpose = data.purpose;
      }
    }

  }
}
