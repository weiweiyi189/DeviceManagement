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

    List<User> findByName(String name);

    List<User> findAll();


    void deleteById(Long id);

}