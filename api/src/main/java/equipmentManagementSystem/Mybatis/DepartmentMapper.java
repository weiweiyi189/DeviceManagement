package equipmentManagementSystem.Mybatis;

import com.sun.xml.internal.ws.org.objectweb.asm.Type;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.User;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentMapper {
    /**
     * 注解的方式
     * 参考https://www.cnblogs.com/SQLyang/p/15033720.html
     * 用注解的方式后，注意在xml文件中注释方法，否则会冲突
     */
    @Results({
            @Result(property = "id", column = "id", id = true),
            @Result(property = "name", column = "name"),
            @Result(property = "code", column = "code"),
            @Result(property = "web_hook", column = "webHook"),
            @Result(
                    property = "user", column = "user_id",
                    one = @One(select = "equipmentManagementSystem.Mybatis.UserMapper.findById")
            )
    })
    @Select("SELECT * FROM department WHERE id = #{id}")
    Department findById(Long id);
    void deleteById(Long id);
    List<Department> findAll();
}