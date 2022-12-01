package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.AjaxResult;
import equipmentManagementSystem.entity.Constants;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.respority.UserRepository;
import equipmentManagementSystem.redis.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityNotFoundException;
import java.util.Random;
import java.util.concurrent.TimeUnit;


/**
 * 邮箱业务 实现类
 *
 * @author zzw
 * @date 2022-01-14
 */
@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    @Value("${spring.mail.username}")
    private String mailUserName;

    @Value("${mail.code.overtime}")
    private Integer overtime; // 过期时间

    /**
     * 获取重置密码的验证码
     *
     * @param staffNumber 用户账号
     * @param mailAddress 用户邮箱
     * @return
     */
    @Override
    public AjaxResult getCode(String staffNumber, String mailAddress) {
        // 非空校验
        if (null == staffNumber || "".equals(staffNumber)) throw new EntityNotFoundException("账号不能为空!");
        if (null == mailAddress || "".equals(mailAddress)) throw new EntityNotFoundException("邮箱不能为空！");

        // 账号存在校验
        User user = userRepository.findByUsername(staffNumber);
        if (null == user) throw new EntityNotFoundException("账号不存在！");
        if (!user.getPhone().equals(mailAddress)) throw new EntityNotFoundException("输入邮箱和预留邮箱不一致！");

        String verifyCode = redisCache.getCacheObject(Constants.MAIL_CODE_KEY + staffNumber);
        if (verifyCode == null) {
            verifyCode = String.valueOf(new Random().nextInt(899999) + 100000);//生成短信验证码
        }
        // 验证码存入redis并设置过期时间
        redisCache.setCacheObject(Constants.MAIL_CODE_KEY + staffNumber, verifyCode, overtime, TimeUnit.MINUTES);

        // 编写邮箱内容
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("<html><head><title></title></head><body>");
        stringBuilder.append("您好<br/>");
        stringBuilder.append("您的验证码是：").append(verifyCode).append("<br/>");
        stringBuilder.append("您可以复制此验证码并返回至设备管理系统找回密码页面，以验证您的邮箱。<br/>");
        stringBuilder.append("此验证码只能使用一次，在");
        stringBuilder.append(overtime.toString());
        stringBuilder.append("分钟内有效。验证成功则自动失效。<br/>");
        stringBuilder.append("如果您没有进行上述操作，请忽略此邮件。");
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        // 发件配置并发送邮件
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            //这里只是设置username 并没有设置host和password，因为host和password在springboot启动创建JavaMailSender实例的时候已经读取了
            mimeMessageHelper.setFrom(mailUserName);
            mimeMessageHelper.setTo(mailAddress);
            mimeMessage.setSubject("邮箱验证-重置密码");
            mimeMessageHelper.setText(stringBuilder.toString(), true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return AjaxResult.success("获取验证码成功，请查看移步您的邮箱" + mailAddress + "查看验证码！");
    }
}