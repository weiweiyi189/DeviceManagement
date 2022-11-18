/**
 * 用户实体
 */
import {Department} from './Department';

export class User {
  /** id */
  id: number;

  jobNumber: string;

  department: Department;

  /** 名称 */
  name: string;

  /** 用户名 */
  username: string;

  /** 密码 */
  password: string;

  /** 角色 */
  role: number;

  /** 是否为admin */
  sex: boolean;

  phone: string;

  // tslint:disable-next-line:max-line-length
  constructor(data?: { id?: number, name?: string, username?: string, password?: string, role?: number,
    sex?: boolean, jobNumber?: string, phone?: string, department?: Department}) {
    if (data) {
      if (data.id) {
        this.id = data.id;
      }

      if (data.name) {
      this.name = data.name;
    }

      if (data.username) {
        this.username = data.username;
      }

      if (data.password) {
        this.password = data.password;
      }

      if (data.role) {
        this.role = data.role;
      }

      if (data.sex) {
        this.sex = data.sex;
      }
      if (data.jobNumber) {
        this.jobNumber = data.jobNumber;
      }
      if (data.department) {
        this.department = data.department;
      }
      if (data.phone) {
        this.phone = data.phone;
      }
    }

  }
}

export interface UserInterface {
  /** id */
  id: number;

  jobNumber: string;

  department: Department;

  /** 名称 */
  name: string;

  /** 用户名 */
  username: string;

  /** 密码 */
  password: string;

  /** 角色 */
  role: number;

  /** 是否为admin */
  sex: boolean;

  phone: string;
}

