package equipmentManagementSystem.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * 以静态变量的形式存储一些bean
 * 此bean可被一些非spring管理的对象使用
 *
 * @author yz
 */

@Component
public class BeanService {

    private static PasswordEncoder passwordEncoder;

    public BeanService(PasswordEncoder passwordEncoder) {
        BeanService.passwordEncoder = passwordEncoder;
    }

    /**
     * 使用方法向外暴露变量，能够在后期的扩展中在需求返回PasswordEncoder
     *
     * @return PasswordEncoder
     */
    public static PasswordEncoder getPasswordEncoder() {
        return BeanService.passwordEncoder;
    }
}
