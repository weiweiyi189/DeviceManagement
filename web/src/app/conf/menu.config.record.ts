import { BaseMenu } from '../base/base-menu';

/**
 * 菜单配置
 */
export const menus: Array<BaseMenu> = [
  {
    name: '仪表盘',
    url: 'dashboard',
    icon: 'fas fa-tachometer-alt',
    defaultShow: true
  },
  {
    name: '科目管理',
    url: 'course-user',
    icon: 'fas fa-book'
  },
  {
    name: '试卷上传',
    url: 'paper',
    icon: 'fas fa-file-upload'
  },
  {
    name: '试题管理',
    url: 'subject',
    icon: 'fas fa-file'
  },
  {
    name: '个人中心',
    url: 'personal',
    icon: 'fas fa-user'
  }
];
