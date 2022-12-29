package equipmentManagementSystem.Mybatis;

import com.sun.xml.internal.ws.org.objectweb.asm.Type;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * mybatis数据层接口
 *
 */
@Repository
public interface UserMapper {
    /**
     * 注解的方式
     * 参考https://www.cnblogs.com/SQLyang/p/15033720.html
     * 用注解的方式后，注意在xml文件中注释方法，否则会冲突
     */
    @Results({
            @Result(property = "id", column = "id", id = true),
            @Result(property = "name", column = "name"),
            @Result(property = "jobNumber", column = "job_number"),
            @Result(property = "phone", column = "phone"),
            @Result(property = "password", column = "password"),
            @Result(property = "username", column = "username"),
            @Result(property = "role", column = "role"),
            @Result(property = "sex", column = "sex"),
            @Result(
                    property = "department", column = "department_id", javaType = Department.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.DepartmentMapper.findById")
            )
    })

    List<User> findByName(String name);

    List<User> findAll();


    void deleteById(Long id);

    @Select("SELECT * FROM User WHERE id = #{id}")
    User findById(Long id);

    int updatePwdByStaffNumber(@Param("staffNumber") String staffNumber, @Param("password") String password);

}