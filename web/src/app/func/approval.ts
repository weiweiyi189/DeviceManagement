import {Department} from './Department';
import {Equipment} from './Equipment';
import {User} from './User';

export class Approval {
  id: number;

   type: number;

  /**
   * 借出部门
   */
   lendDepartment: Department ;

  /**
   * 借出设备
   */
   equipment: Equipment ;

    createTime: number;

  /**
   * 创建用户
   */
   createUser: User;

  /**
   * 审批者
   */
   approvalUser: User ;

  status: number;

  deleted: boolean;
}
