import {Injectable} from '@angular/core';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {isDefined} from '@angular/compiler/src/util';

/**
 * 用于获取组件、指令、管道实例的控制服务
 * 使用示例：
 * 1. 在组件初始化时调用add()方法
 * 2. 通过get()方法按类型获取组件实例
 * 3. 在组件销毁时调用remove方法
 * 本方法主要用于组件嵌套测试时，获取被嵌套的组件以完成组件交互的测试
 */
@Injectable({
  providedIn: 'root'
})
export class UnitController {
  /**
   * 存储组件、指令或管道
   * Record<类名称, Record<类的标识符token, Array<Clazz>>>;
   */
  private unitRecords = {} as Record<string, Record<string, Array<object>>>;

  constructor() {
  }

  /**
   * 添加单元（组件、指令或管道）
   * @param unit 单元
   * @param token 当多个组件的名称发生冲突时，可以指定token的值来区别各个组件
   */
  add(unit: object, token = 'main'): void {
    const className = unit.constructor.name;
    if (!isNotNullOrUndefined(this.unitRecords[className])) {
      this.unitRecords[className] = {};
      this.unitRecords[className][token] = new Array<object>();
    } else if (!isNotNullOrUndefined(this.unitRecords[className][token])) {
      this.unitRecords[className][token] = new Array<object>();
    }
    this.unitRecords[className][token].push(unit);
  }

  /**
   * 获取单元（组件、指令或管道）
   * @param unit 类型
   * @param index 索引号：当某个组件初多次实例化时，可以指定该索引号来获取想要的那个
   * @param token 组件标识
   */
  get<T>(unit: Class<T>, index = 0, token = 'main'): T {
    let result: T = null;
    if (isNotNullOrUndefined(this.unitRecords[unit.name]) && isNotNullOrUndefined(this.unitRecords[unit.name][token])) {
      const results = this.unitRecords[unit.name][token] as Array<any>;
      if (isDefined(results[index])) {
        result = results[index];
      }
    }

    return result;
  }

  /**
   * 当组件被销毁时，必须调用该方法及时地移除组件
   * @param unit 组件、指令、管道
   */
  remove(unit: object): void {
    const className = unit.constructor.name;
    if (isNotNullOrUndefined(this.unitRecords[className])) {
      const unitRecord = this.unitRecords[className];
      for (const key in unitRecord) {
        if (unitRecord.hasOwnProperty(key)) {
          const units = unitRecord[key];
          for (let i = units.length - 1; i >= 0; i--) {
            if (unit === units[i]) {
              units.splice(i, 1);
            }
          }
        }
      }
    }
  }
}


/**
 * 定义一个Class类型，用于参数中接收 类、接口等
 * angular提供了 Type<T> 来替换该Class类型
 * https://2ality.com/2020/04/classes-as-values-typescript.html
 */
export type Class<T> = new(...args: any[]) => T;

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

