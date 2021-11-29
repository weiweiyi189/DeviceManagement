package equipmentManagementSystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.session.ExpiringSession;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.SessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.web.http.HttpSessionStrategy;
import org.springframework.stereotype.Component;

/**
 * 启用 Spring Security
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // basic 认证
                .httpBasic()
                // 设置授权配置
                .and().authorizeRequests()
                // 开放登录接口
                .antMatchers("/user/register").permitAll()
                // 任何请求都需要认证
                .anyRequest().authenticated()
                // 禁用 csrf
                .and().csrf().disable();
    }

//    /**
//     * 使用header认证来替换默认的cookie认证
//     */
//    @Bean
//    public HttpSessionStrategy httpSessionStrategy() {
//        return new HeaderAndParamHttpSessionStrategy();
//    }
//
//    /**
//     * 由于我们启用了@EnableSpringHttpSession后，而非RedisHttpSession.
//     * 所以应该为SessionRepository提供一个实现。
//     * 而Spring中默认给了一个SessionRepository的实现MapSessionRepository.
//     *
//     * @return session策略
//     */
//    @Bean
//    public SessionRepository<ExpiringSession> sessionRepository() {
//        return new MapSessionRepository();
//    }

}
