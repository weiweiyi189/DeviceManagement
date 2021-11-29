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
    name: '组合试卷',
    url: 'paper',
    icon: 'fas fa-clipboard-list'
  },
  {
    name: '试卷管理',
    url: 'paper-manage',
    icon: 'fas fa-clipboard-list'
  },
  {
    name: '试卷上传',
    url: 'paper-admin',
    icon: 'fas fa-file-upload'
  },
  {
    name: '试题管理',
    url: 'subject-admin',
    icon: 'fas fa-file'
  },
  {
    name: '学院管理',
    url: 'college',
    icon: 'fas fa-university'
  },
  {
    name: '科目管理',
    url: 'course-admin',
    icon: 'fas fa-book'
  },
  {
    name: '题型管理',
    url: 'model',
    icon: 'fas fa-layer-group'
  },
  {
    name: '角色管理',
    url: 'role',
    icon: 'fas fa-users-cog'
  },
  {
    name: '用户管理',
    url: 'user',
    icon: 'fas fa-user-friends'
  },
  {
    name: '个人中心',
    url: 'personal',
    icon: 'fas fa-user'
  },
  {
    name: '系统设置',
    url: 'setting',
    icon: 'fas fa-cogs'
  }
];
