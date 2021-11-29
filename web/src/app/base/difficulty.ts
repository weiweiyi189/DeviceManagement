/**
 * 难度等级规格
 */
export class Difficulty {
  /** 难度等级: 1 - 5 */
  value: number;
  /** 难度名称: 易 - 难 */
  name: string;
  /** 颜色样式: 浅 - 深 */
  clazz: string;

  constructor(value: number, name: string, clazz: string) {
    this.value = value;
    this.name = name;
    this.clazz = clazz;
  }
}
