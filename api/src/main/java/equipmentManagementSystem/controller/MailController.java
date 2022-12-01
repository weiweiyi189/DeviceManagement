package equipmentManagementSystem.controller;

import equipmentManagementSystem.entity.AjaxResult;
import equipmentManagementSystem.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 邮箱业务 前端控制器
 * @author zzw
 * @date 2022-01-14
 */
@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private MailService mailService;

    /**
     * 获取重置密码的验证码
     */
    @GetMapping("/getCode")
    public void getCode(@RequestParam String staffNumber, @RequestParam String mailAddress){
         mailService.getCode(staffNumber,mailAddress);
    }
}
