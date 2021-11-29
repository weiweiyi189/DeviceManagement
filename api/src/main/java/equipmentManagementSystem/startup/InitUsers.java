package equipmentManagementSystem.startup;

import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.respority.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;

@Component
public class InitUsers implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger logger = LoggerFactory.getLogger(InitUsers.class);

    private String username;
    private String password;

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    public InitUsers(PasswordEncoder encoder, UserRepository userRepository) {
        this.username = "admin";
        this.password = "hebut";
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        logger.debug("查询已有用户");
        List<User> users = (List<User>) this.userRepository.findAll();

        if (!users.isEmpty()) {
            logger.debug("用户存在，return");
            return;
        }

        User user = new User();
        user.setName("系统管理员");
        user.setUsername(this.username);
        user.setPassword(this.password);
        user.setJobNumber("00000");
        user.setRole(0L);
        users.add(user);

        logger.debug("保存");
        this.userRepository.saveAll(users);
    }
}
