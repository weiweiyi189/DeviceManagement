/**
 * 分页对象
 */
import {config} from '../conf/app.config';
import {Pageable} from './pageable';
import {isNotNullOrUndefined} from '../core/secondUtils';

export class Page<T> {

  /**
   * 分页内容
   */
  content: Array<T>;

  /**
   * 是否首页
   */
  first: boolean;

  /**
   * 是否尾页
   */
  last: boolean;

  /**
   * 每页大小
   */
  size: number;

  /**
   * 第几页
   */
  number: number;

  /**
   * 总页数
   */
  totalPages: number;

  /**
   * 当前页数据条数
   */
  numberOfElements: number;

  /**
   * 总数据条数
   */
  totalElements: number;


  constructor(data?: { content?: Array<T>, pageable?: Pageable, total?: number }) {
    this.content = new Array<T>();
    this.first = true;
    this.last = true;
    this.size = config.size;
    this.number = 0;
    this.totalPages = 0;
    this.numberOfElements = 0;
    this.totalElements = 0;

    if (data) {
      if (data.content) {
        this.content = data.content;
        this.numberOfElements = data.content.length;
      }

      if (data.pageable) {
        this.number = data.pageable.page;
        this.size = data.pageable.size;
      }

      if (isNotNullOrUndefined(data.total)) {
        this.totalElements = data.total;
      }

      if (data.content && data.pageable && isNotNullOrUndefined(data.total)) {
        if (data.pageable.page === 0) {
          this.first = true;
        }

        this.totalPages = data.total / data.pageable.size + 1;

        if (data.pageable.page === this.totalPages) {
          this.last = true;
        }
      }
    }
  }
}
