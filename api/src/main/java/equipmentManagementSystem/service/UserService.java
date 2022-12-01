package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.AjaxResult;
import equipmentManagementSystem.entity.CodeUpdatePwdVo;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.input.PUser;
import equipmentManagementSystem.input.VUser;
import net.bytebuddy.utility.RandomString;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.xml.bind.ValidationException;
import java.util.List;
import java.util.Optional;

public interface UserService {
    static User getOneUser() {
        User user = new User();
        user.setUsername(RandomString.make(10));
        user.setPassword(RandomString.make(10));
        return user;
    }

    /**
     * 添加用户
     *
     * @param user
     */
    void add(User user);

    /**
     * 删除
     *
     * @param id
     */
    void delete(Long id);

    /**
     * 获得一个未保存的用户
     *
     * @return
     */
    User getOneUnsavedUser();

    User findByUsername(String username);

    /**
     * 邮箱验证码重置密码
     * @return
     */
    AjaxResult codeUpdatePwd(String num,String codes ,String password);

    /**
     * 校验密码是否正确
     *
     * @param vUser 带有密码的VUser
     * @return true 正确 false 不正确
     */
    boolean checkPasswordIsRight(VUser vUser);

    /**
     * 修改密码
     *
     * @param vUser 带有新密码和旧密码VUser
     */
    void updatePassword(VUser vUser) throws ValidationException;

    /**
     * 获取一个保存的用户
     *
     * @return
     */
    User getOneSavedUser();

    /**
     * 通过Id获取用户
     *
     * @param id 用户Id
     * @return User
     */
    User getUserById(Long id);

    /**
     * 获取所有用户
     * <p>
     * List<User>
     */
    Page<User> getAll(Pageable pageable);


    /**
     * 验证新号码是否被用户使用
     *
     * @param username
     */
    Boolean isUsernameExist(String username);


    /**
     * 更新
     *
     * @param id   用户Id
     * @param user 用户
     * @return 新用户
     */
    User update(Long id, User user);


    /**
     * 验证是否是默认密码
     *
     * @return true 是 false 不是
     */
    boolean verifyPassword();

    /**
     * 修改手机号（用户名）
     *
     * @param pUser 带有新的手机号和密码
     */
    void updatePhone(PUser pUser) throws ValidationException;

    /**
     * 验证新老手机号是否一致
     *
     * @param phoneNumber 新手机号
     * @return true 一致 false 不一致
     */
    Boolean verifyPhoneNumber(String phoneNumber);

    /**
     * 通过手机号（用户名）判断用户是否存在
     *
     * @param phoneNumber 手机号
     * @return true 存在  false 不存在
     */
    Boolean existByPhone(String phoneNumber);

    /**
     * 重置密码
     *
     * @param id 用户id
     */
    void resetPassword(Long id);

    /**
     * 获取当前登录用户
     *
     * @return
     */
    User getCurrentLoginUser();

    Page<User> quaryAll(String name, String jobNumber, Pageable pageable);

    List<User> getAllCharge();

    Optional<User> getCurrentLoginUserWithoutTransaction();
}
