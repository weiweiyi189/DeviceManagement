package equipmentManagementSystem.aspect;

import equipmentManagementSystem.entity.Constants;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.redis.RedisCache;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;

@Aspect
@Component
public class userAspect {
    @Autowired
    private RedisCache redisCache;

    /**
     * 切入codeUpdatePwd, 验证码校验
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.UserController.codeUpdatePwd(..)) && args(num,codes,password)")
    public void judgeCode(final ProceedingJoinPoint joinPoint,String num,String codes ,String password) throws Throwable {
        String cacheCode = redisCache.getCacheObject(Constants.MAIL_CODE_KEY + num); // 获取缓存中该账号的验证码
        if (cacheCode == null) {
            throw new EntityNotFoundException("验证码已过期，请重新获取！");
        }

        // 验证码正确性校验
        if (!cacheCode.equals(codes)) {
            throw new EntityNotFoundException("验证码错误！");
        }
        joinPoint.proceed();
    }
}

