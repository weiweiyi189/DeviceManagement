package equipmentManagementSystem.Mybatis;

import equipmentManagementSystem.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * mybatis数据层接口
 *
 */
@Repository
public interface UserMapper {

    // 自定义添加通过用户名称模糊查找用户信息
    List<User> findByName(String name);

    List<User> findAll();

    public void addUser(User user);

    void deleteById(Long id);

}