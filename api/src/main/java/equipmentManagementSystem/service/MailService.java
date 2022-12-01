package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.AjaxResult;

/**
 * 邮箱业务 服务类
 * @author zzw
 * @date 2022-01-14
 */
public interface MailService {

    /**
     * 获取重置密码的验证码
     * @param staffNumber 用户账号
     * @param mailAddress 用户邮箱
     * @return
     */
    AjaxResult getCode(String staffNumber, String mailAddress);
}