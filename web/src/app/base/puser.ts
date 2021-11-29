/**
 * 对应user（用户修改手机号）
 */
export class PUser {
  /** 新手机号 */
  newPhoneNumber: string;

  /** 新手机号验证码 */
  code: string;

  /** 原手机号验证码 */
  verificationCode: string;
}
