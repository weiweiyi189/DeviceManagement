/**
 * 类型实体
 */
export class Type {
  /** id */
  id: number;

  /** 名称 */
  name: string;

  deleted: boolean;

  constructor(data?: { id?: number, name?: string, deleted?: boolean}) {
    if (data) {
      if (data.id) {
        this.id = data.id;
      }

      if (data.name) {
        this.name = data.name;
      }

      if (data.deleted) {
        this.deleted = data.deleted;
      }
    }

  }
}
