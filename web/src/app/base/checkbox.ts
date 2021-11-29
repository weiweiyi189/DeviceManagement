import {Observable, Subject} from 'rxjs';
import {Assert, isNotNullOrUndefined} from '../core/secondUtils';

/**
 * 用于checkbox的选项
 */
export class Checkbox<T> {
  private checkedSubject = new Subject<boolean>();
  public checked$: Observable<boolean>;
  private _CHECKED: boolean;
  content: T;

  /**
   * 生成checkbox数组
   * @param checkedList 应该选中的列表
   * @param allList 所有的列表
   * @param id 比较两个对应相等的关键字
   */
  public static getCheckboxes<T>(checkedList: T[], allList: T[], id = 'id'): Checkbox<T>[] {
    Assert.isArray(checkedList, '第一个参数必须为数组');
    Assert.isArray(allList, '第二个参数必须为数组');
    const result = new Array<Checkbox<T>>();
    allList.forEach(v => {
      let found = false;
      checkedList.forEach(u => {
        if (!found && isNotNullOrUndefined(u) && isNotNullOrUndefined(v) &&
          isNotNullOrUndefined(u[id]) && isNotNullOrUndefined(v[id]) && u[id] === v[id]) {
          found = true;
        }
      });

      result.push(new Checkbox<T>(v, found));
    });
    return result;
  }

  set checked(checked: boolean) {
    this._CHECKED = checked;
  }

  get checked(): boolean {
    return this._CHECKED;
  }

  constructor(content: T, checked: boolean) {
    this.checked$ = this.checkedSubject.asObservable();
    this.checked = checked;
    this.content = content;
  }

  public onChanged(checked: boolean): void {
    this.checked = checked;
    this.checkedSubject.next(checked);
  }

  click(): void {
    this._CHECKED = !this._CHECKED;
  }

  toggleChecked(): void {
    this.click();
  }


}
