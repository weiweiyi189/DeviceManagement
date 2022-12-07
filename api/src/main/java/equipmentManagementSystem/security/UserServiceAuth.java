package equipmentManagementSystem.security;

import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.respority.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Component
public class UserServiceAuth implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceAuth.class);

    private final UserRepository userRepository;

    public UserServiceAuth(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("根据用户名查询用户");
        User user = userRepository.findByUsernameAndDeletedIsFalse(username);

        if (user == null) {
            logger.error("用户名不存在");
            throw new UsernameNotFoundException("用户名不存在");
        }

        logger.debug("初始化授权列表");
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        logger.debug("对用户进行授权");
        // TODO: 根据用户的角色，对用户进行不同的接口授权

        logger.debug("构造用户");
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), authorities);
    }
}