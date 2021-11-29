/**
 * 仿java Optional
 */
import {Assert} from '../core/secondUtils';


export class Optional<T> {
  private readonly value = null as T;

  public static of<T>(t: T): Optional<any> {
    Assert.isNotNullOrUndefined(t, '传入的值必须为真');
    return new Optional(t);
  }

  public static empty<T>(): Optional<any> {
    return new Optional(null);
  }

  private constructor(value: T) {
    this.value = value;
  }

  public get(): T {
    if (this.value === null) {
      throw new Error('当前值为null，不能够调用get方法');
    }
    return this.value;
  }

  public present(): boolean {
    return !this.value === null;
  }
}
