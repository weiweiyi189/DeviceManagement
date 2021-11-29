package equipmentManagementSystem.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

/**
 * WEB配置
 * @author yz
 */
@Configuration
@EnableWebMvc
@EnableJpaAuditing
public class WebConfig implements WebMvcConfigurer {
    public static String ADMIN_PREFIX = "admin";
    /**
     * 配置JsonView
     * @param converters
     */
    @Override
    public void configureMessageConverters(final List<HttpMessageConverter<?>> converters) {
        final ObjectMapper mapper = Jackson2ObjectMapperBuilder.json().defaultViewInclusion(true).build();
        converters.add(new MappingJackson2HttpMessageConverter(mapper));
    }


    /**
     * URL忽略大小写
     * 为admin包设置访问前缀
     *
     * @param configurer 配置信息
     */
    @Override
    public void configurePathMatch(final PathMatchConfigurer configurer) {
        final AntPathMatcher pathMatcher = new AntPathMatcher();
        pathMatcher.setCaseSensitive(false);
        configurer.setPathMatcher(pathMatcher);
        configurer.addPathPrefix(ADMIN_PREFIX, HandlerTypePredicate.forBasePackage("club.yunzhi.exam.controller.admin"));
    }

    @Autowired
    UserService userService;

    /**
     * 自动添加创建用户，创建时间，更新用户，更新时间
     * panjie
     * 官方手册地址： https://docs.spring.io/spring-data/jpa/docs/2.0.8.RELEASE/reference/html/#auditing
     */
    @Bean
    public AuditorAware<User> auditorProvider() {
        return new SpringSecurityAuditorAware(userService);
    }

    private static class SpringSecurityAuditorAware implements AuditorAware<User> {
        private final UserService userService;

        private SpringSecurityAuditorAware(UserService userService) {
            this.userService = userService;
        }


        @Override
        public Optional<User> getCurrentAuditor() {
            Optional<User> user = this.userService.getCurrentLoginUserWithoutTransaction();
            return user;
        }
    }
}
