/**
 * 状态实体
 */
export class Status {
  /** id */
  id: number;

  /** 名称 */
  name: string;

  constructor(data?: { id?: number, name?: string}) {
    if (data) {
      if (data.id) {
        this.id = data.id;
      }
      if (data.name) {
        this.name = data.name;
      }
    }
  }
}
