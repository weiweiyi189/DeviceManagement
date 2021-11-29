import { Menu } from './Menu';

/**
 * 角色实体
 */
export class Role {
  /** id */
  id: number;

  /** 名称 */
  name: string;

  /** 菜单 */
  menus: Array<Menu>;

  constructor(data?: { id?: number, name?: string, menus?: Array<Menu> }) {
    if (data) {
      if (data.id) {
        this.id = data.id;
      }
      if (data.name) {
        this.name = data.name;
      }
      if (data.menus) {
        this.menus = data.menus;
      }
    }
  }
}
