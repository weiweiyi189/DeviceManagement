/**
 * 地点实体
 */
export class Place {
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
