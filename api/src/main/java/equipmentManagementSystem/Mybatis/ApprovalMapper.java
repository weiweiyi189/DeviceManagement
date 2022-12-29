package equipmentManagementSystem.Mybatis;


import com.sun.xml.internal.ws.org.objectweb.asm.Type;
import equipmentManagementSystem.entity.Approval;
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
public interface ApprovalMapper {
    /**
     * 注解的方式
     * 参考https://www.cnblogs.com/SQLyang/p/15033720.html
     * 用注解的方式后，注意在xml文件中注释方法，否则会冲突
     */
    @Results({
            @Result(property = "id", column = "id", id = true),
            @Result(property = "name", column = "name"),
            @Result(property = "type", column = "type"),
            @Result(property = "status", column = "status"),
            @Result(property = "createTime", column = "create_time"),
            @Result(
                    property = "lendDepartment", column = "lend_department_id", javaType = Department.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.DepartmentMapper.findById")
            ),
            @Result(
                    property = "equipment", column = "equipment_id", javaType = Equipment.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.EquipmentMapper.findById")
            ),
            @Result(
                    property = "createUser", column = "create_user_id", javaType = User.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.UserMapper.findById")
            ),
            @Result(
                    property = "approvalUser", column = "approval_user_id", javaType = User.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.UserMapper.findById")
            )
    })
    @Select("SELECT * FROM approval WHERE id = #{id}")
    Approval findById(Long id);
    void deleteById(Long id);
    List<Approval> findAll();
}
