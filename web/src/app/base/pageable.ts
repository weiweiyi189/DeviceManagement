/**
 *  分页信息
 */
export class Pageable {
  page: number;
  size: number;

  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;
  }
}
