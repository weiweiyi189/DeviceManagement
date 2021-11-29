/**
 * 对字符串进行简单的加密
 * @param string 加密后的字符串
 */
export function hash(sourceString: string): number {
  let hashCode = 0;
  let i;
  let chr;
  for (i = 0; i < sourceString.length; i++) {
    chr = sourceString.charCodeAt(i);
    // tslint:disable-next-line:no-bitwise
    hashCode = ((hashCode << 5) - hashCode) + chr;
    // tslint:disable-next-line:no-bitwise
    hashCode |= 0; // Convert to 32bit integer
  }
  return hashCode;
}

/**
 * 转换为loading字样
 * @param target 目标字符串
 * @param suffix 后缀
 * @param length 长度
 * @example
 * '请稍候' => '请稍候.'
 * '请稍候.' => '请稍候..'
 * '请稍候..' => '请稍候...'
 * '请稍候...' => '请稍候'
 */
export function convertToLoadingFormat(target: string, suffix = '.', length = 3): string {
  const strings = target.split(suffix);
  if (strings.length <= length) {
    target += '.';
  } else {
    target = strings[0];
  }
  return target;
}


export class Assert {

  /**
   * 断言是数组
   * @param value 断言的值
   * @param message 出错提示
   */
  static isArray(value: any, message: string): void {
    if (!isNotNullOrUndefined(value) || !Array.isArray(value)) {
      throw new Error(message);
    }
  }

  /**
   * 断言被定义
   * undefined 异常
   * null 成功
   * other 成功
   * @param args 多参数
   */
  static isDefined(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (!isDefined(value)) {
        throw new Error(message);
      }
    });
  }

  static isObject(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(arg => {
      const type = typeof arg;
      const isObject = type === 'function' || type === 'object' && !!arg;
      if (!isObject) {
        throw new Error(message);
      }
    });
  }

  /**
   * 断言输入的值为字符串
   * @param args 字符串1，字符串2...提示信息
   */
  static isString(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (typeof value !== 'string') {
        throw new Error(message);
      }
    });
  }

  static isNotNullOrUndefined(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (!isNotNullOrUndefined(value)) {
        throw new Error(message);
      }
    });
  }

  /**
   * 校验参考并返回参数的最后一项做为message提示消息返回
   * @param args 多个参数
   */
  private static validateArgs(args: any[]): string {
    if (args.length < 2) {
      throw new Error('最少输入两个参数');
    }

    if (typeof (args[args.length - 1]) !== 'string') {
      throw new Error('最后一个参数必须为字符串');
    }

    const message = args.pop();
    return message;
  }

  static isUndefined(param: any): void {
    if (typeof param !== 'undefined') {
      throw new Error('变量已定义');
    }
  }

  /**
   * 断言为null
   * null 成功
   * undefined 异常
   * other 异常
   * @param param 输入
   */
  static isNull(param: any): void {
    if (typeof param === 'undefined' || param !== null) {
      throw new Error('变量非空');
    }
  }
}

/**
 * 是否不为null或undefined
 * undefined -> false
 * null -> false
 * other -> true
 * @param value 值
 */
export function isNotNullOrUndefined<T>(value: T | undefined | null): value is T {
  return value as T !== undefined && value as T !== null;
}

/**
 * 为null或undefined
 * @param value 值
 */
export function isNullOrUndefined<T>(value: T | undefined | null): value is T {
  return !isNotNullOrUndefined(value);
}

/**
 * 是否被定义
 * undefined -> false
 * other -> true
 * @param value 校验值
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value as T !== undefined;
}


/**
 * 只包含属性而不包含方法
 * https://stackoverflow.com/questions/52692606/how-to-declare-a-type-in-typescript-that-only-includes-objects-and-not-functions
 */
export interface UnknownProperty {
  [k: string]: unknown;
}
