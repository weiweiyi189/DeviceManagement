package equipmentManagementSystem.aspect;

import equipmentManagementSystem.entity.AjaxResult;
import equipmentManagementSystem.entity.Constants;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.redis.RedisCache;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Aspect
@Component
public class mailAspect {
    @Autowired
    private RedisCache redisCache;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailUserName;

    @Value("${mail.code.overtime}")
    private Integer overtime; // 过期时间

    /**
     * 切入codeUpdatePwd, 验证码发送
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.MailController.getCode(..)) && args(staffNumber,mailAddress)")
    public void getcode(final ProceedingJoinPoint joinPoint, @RequestParam String staffNumber, @RequestParam String mailAddress) throws Throwable {
        joinPoint.proceed();

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
        } catch (
                MessagingException e) {
            e.printStackTrace();
        }
    }
}