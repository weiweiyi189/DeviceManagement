package equipmentManagementSystem.controller;

import com.fasterxml.jackson.annotation.JsonView;
import equipmentManagementSystem.entity.AjaxResult;
import equipmentManagementSystem.entity.CodeUpdatePwdVo;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.input.PUser;
import equipmentManagementSystem.input.VUser;
import equipmentManagementSystem.service.MailService;
import equipmentManagementSystem.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.ValidationException;
import java.security.Principal;
import java.util.List;

/**
 * 用户
 *
 * @author yz
 */
@RestController
@RequestMapping("user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final MailService mailService;

    public UserController(UserService userService,MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * 验证码重置密码
     */
    @GetMapping("/codeUpdatePwd")
    public void codeUpdatePwd(@RequestParam String num,@RequestParam String codes,@RequestParam String password){
        userService.codeUpdatePwd(num,codes,password);
    }

    @PostMapping
    public void add(@RequestBody User user) {
        this.userService.add(user);
    }

    @PostMapping("checkPasswordIsRight")
    public boolean checkPasswordIsRight(@RequestBody VUser vUser) {
        return this.userService.checkPasswordIsRight(vUser);
    }

    @GetMapping("me")
    @JsonView(User.DepartmentJsonView.class)
    public User me(@AuthenticationPrincipal Principal user) {
        logger.debug("获取用户名");
        String username = user.getName();

        return this.userService.findByUsername(username);
    }

    @GetMapping("logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        logger.info("用户注销");
        // 获取用户认证信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 存在认证信息，注销
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
    }

    @GetMapping("user")
    @JsonView(User.DepartmentJsonView.class)
    public User getCurrentLoginUser() {
        return this.userService.getCurrentLoginUser();
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.userService.delete(id);
    }

    @GetMapping("existByPhone/{phoneNumber}")
    public Boolean existByPhone(@PathVariable String phoneNumber) {
        return this.userService.existByPhone(phoneNumber);
    }


    @GetMapping("{id}")
    @JsonView(User.DepartmentJsonView.class)
    public User getUserById(@PathVariable Long id) {
        return this.userService.getUserById(id);
    }

    @GetMapping("isUsernameExist")
    public Boolean isUsernameExist(@RequestParam String username) {
        return this.userService.isUsernameExist(username);
    }

    /**
     * 获取所有
     * @param pageable 分页信息
     * @return 所有
     */
    @GetMapping("getAll")
    @JsonView(User.DepartmentJsonView.class)
    public Page<User> findAll(
            Pageable pageable) {
//        mailService.getCode("chenyu","2823316458@qq.com");
        return this.userService.getAll(pageable);
    }

    @PatchMapping("resetPassword/{id}")
    public void resetPassword(@PathVariable Long id) {
        this.userService.resetPassword(id);
    }


    @PutMapping("{id}")
    @JsonView(Department.UserJsonView.class)
    public User update(@PathVariable Long id, @RequestBody User user) {
        return this.userService.update(id, user);
    }

    @PutMapping("updatePassword")
    public void updatePassword(@RequestBody VUser vUser) throws ValidationException {
        this.userService.updatePassword(vUser);
    }

    @PutMapping("updatePhone")
    public void updatePhone(@RequestBody PUser pUser) throws ValidationException {
        this.userService.updatePhone(pUser);
    }

    @GetMapping("verifyPassword")
    public boolean verifyPassword() {
        return this.userService.verifyPassword();
    }

    @GetMapping("verifyPhoneNumber")
    public Boolean verifyPhoneNumber(@RequestParam String phoneNumber) {
        return this.userService.verifyPhoneNumber(phoneNumber);
    }

    @GetMapping("getAllCharge")
    @JsonView(GetAllCharge.class)
    public List<User> getAllCharge() {
        return this.userService.getAllCharge();
    }

    /**
     * 心跳方法
     */
    @GetMapping("heartbeat")
    public void heartbeat() {
        logger.info("heartbeat");
    }


    /**
     * 获取所有作业
     * @param pageable 分页信息
     * @return 所有作业
     */
    @GetMapping("query")
    @JsonView(Department.UserJsonView.class)
    public Page<User> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String jobNumber,
            Pageable pageable) {
        return this.userService.quaryAll(
                name,
                jobNumber,
                pageable);
    }

    public class GetAllCharge  {}
}
