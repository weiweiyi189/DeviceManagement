package equipmentManagementSystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 验证码重置密码参数VO
 *
 * @author zzw
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodeUpdatePwdVo {

    /**
     * 用户账号
     */
    private String staffNumber;

    /**
     * 邮箱验证码
     */
    private String code;

    /**
     * 新密码
     */
    private String loginPassword;
//    CodeUpdatePwdVo(String staffNumber,String code,String loginPassword){
//        this.staffNumber=staffNumber;
//        this.code=code;
//        this.loginPassword=loginPassword;
//    }

}
