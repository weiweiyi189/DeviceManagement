/**
 * 前台菜单实体
 */
export class BaseMenu {
  /** 名称 */
  name: string;

  /** 路由 */
  url: string;

  /** 图标 */
  icon: string;

  /** 默认显示: 可选 无论是否有权限都显示 */
  defaultShow?: boolean;
}
