import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass']
})
export class PageComponent implements OnInit {

  constructor() { }
  /* 分页数据 */
  pages: Array<number>;


  @Output() selectedPage = new EventEmitter<number>();
  @Output() selectedSize = new EventEmitter<number>();

  @Input() set setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
    this.pages = this.makePagesByTotalPages(this.page, totalPages);
  }
  @Input() set setPage(page: number) {
    this.page = page;
    this.pages = this.makePagesByTotalPages(page, this.totalPages);
  }
  @Input() set setSize(size: number) {
    this.size = size;
    this.pages = this.makePagesByTotalPages(this.page, this.totalPages);
  }

  page: number;
  totalPages: number;
  size: number;

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * 加载数据
   */
  loadData(): void {
    this.pages = this.makePagesByTotalPages(this.page, this.totalPages);
    }

  onPage(page: number): void {
    if (page < 0 || page >= this.totalPages) {
      return ;
    }
    // this.page = page;
    this.selectedPage.emit(page);
    this.loadData();
  }

  /**
   * 生成分页数据
   * @param currentPage 当前页
   * @param totalPages 总页数
   */
  makePagesByTotalPages(currentPage: number, totalPages: number): Array<number> {
    if (totalPages > 0) {
      /* 总页数小于5 */
      if (totalPages <= 5) {
        return this.makePages(0, totalPages - 1);
      }

      /* 首2页 */
      if (currentPage < 2) {
        return this.makePages(0, 4);
      }

      /* 尾2页 */
      if (currentPage > totalPages - 3) {
        return this.makePages(totalPages - 5, totalPages - 1);
      }

      /* 总页数大于5，且为中间页码*/
      return this.makePages(currentPage - 2, currentPage + 2);
    }

    return new Array();
  }

  /**
   * 生成页码
   * @param begin 开始页码
   * @param end 结束页码
   */
  makePages(begin: number, end: number): Array<number> {
    const result = new Array<number>();
    for (; begin <= end; begin++) {
      result.push(begin);
    }
    return result;
  }

  onSizeSelected(size: number): void {
    this.selectedSize.emit(size);
  }
}
