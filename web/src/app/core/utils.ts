import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

// 解码
const decodeUnicode = (str): string => {
  str = '\\u' + str;
  str = str.replace(/\\/g, '%');

  str = unescape(str);
  str = str.replace(/%/g, '\\');
  return str;
};

export class Random {
  /**
   * 获取随机数据
   * @param width 位宽
   */
  static nextNumber(width = 32): number {
    let range = 1;
    while (width > 0) {
      range = range * 2;
      width--;
    }

    return Math.floor(Math.random() * range);
  }

  /**
   * 获取随机字符串
   * @param prefix 返回字符串的前缀
   * @param length 字符串长度
   */
  static nextString(prefix = '', length = 4): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix + result;
  }
}

/*
* 获取取机的中文字符串
*/
export const randomChineseString = (preString = '', length = 3): string => {
  let name = '';
  for (let i = 0; i < length; i++) {
    let unicodeNum = '';
    unicodeNum = randomNumberByRange(0x4e00, 0x9fa5).toString(16);
    name += decodeUnicode(unicodeNum);
  }
  return preString + name;
};

/**
 * 获取指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 */
const randomNumberByRange = (min = 0, max = 1000): number => {
  return Math.floor(Math.random() * (min - max) + max);
};

/**
 * 随机时间戳
 * @param day 随机生成的时间范围（天）
 * @param baseDate 生成时间范围基于某天
 * @sample
 * randomTimestamp(10, new Date(2020, 7, 12))
 * 返回：2020年7月12日前后10天的随机一天
 */
export const randomTimestamp = (day = 7, baseDate = new Date()) => {
  const range = 1000 * 60 * 60 * 24 * day * 2;
  return baseDate.getTime() + randomNumber(range) - range / 2;
};


export const randomBoolean = () => {
  return randomNumber(10) % 2 === 0;
};

export const randomNumber = (range = 1000) => {
  return Math.floor(Math.random() * range);
};

export const randomString = (prefix = '', length = 4) => {
  return prefix + Math.random().toString(36).slice(-length);
};

/**
 * 等待方法体中的函数返回true后，再返回promise
 * @param untilTruthy 返回boolean值的函数
 */
export const waitsFor = async (lastMethod: () => boolean, failureMessage = '花费的时间过长，请检查判断条件', timeout = 2000): Promise<boolean> => {
  let spentTime = 0;
  while (!lastMethod()) {
    if (spentTime > timeout) {
      throw new Error('花费的时间过长，请检查判断条件');
    }
    await interval(25).pipe(take(1)).toPromise();
    spentTime += 25;
  }
  return Promise.resolve(true);
};

/**
 * 等待一会
 * @param timeout 中断时长
 */
export const waits = async (timeout = 25): Promise<void> => {
  while (timeout > 0) {
    await interval(25).pipe(take(1)).toPromise();
    timeout -= 25;
  }
  return Promise.resolve();
};
