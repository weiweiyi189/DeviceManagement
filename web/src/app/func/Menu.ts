
/**
 * 菜单实体
 */
export class Menu {
  static ROLE_ADMIN = 0;
  static ROLE_COMMON = 1;
  static ROLE_REPAIR = 2;
  static ROLE_MANAGER = 3;
  /** id */
  id: number;
  /** 名称 */
  name: string;
  /** 路由 */
  url: string;
  /** 图标 */
  icon: string;
  roles = [Menu.ROLE_ADMIN];
  constructor(data?: {
    id?: number,
    name?: string,
    url?: string,
    roles?: number[],
    icon?: string
  }) {
    if (data) {
      this.id = data.id;
      this.name =  data.name;
      this.roles = data.roles;
      this.url = data.url;
      this.icon = data.icon;
    }
  }
}
