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
public interface EquipmentMapper {
    List<Equipment> findAll();

    /**
     * 注解的方式
     * 参考https://www.cnblogs.com/SQLyang/p/15033720.html
     * 用注解的方式后，注意在xml文件中注释方法，否则会冲突
     */
    @Results({
            @Result(property = "id", column = "id", id = true),
            @Result(property = "name", column = "name"),
            @Result(property = "model", column = "model"),
            @Result(property = "place", column = "place"),
            @Result(property = "states", column = "states"),
            @Result(property = "purpose", column = "purpose"),
            @Result(property = "saleTime", column = "sale_time"),
            @Result(property = "internalNumber", column = "internal_number"),
            @Result(
                    property = "type", column = "type_id", javaType = Type.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.TypeMapper.findById")
            ),
            @Result(
                    property = "department", column = "department_id", javaType = Department.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.DepartmentMapper.findById")
            ),
            @Result(
                    property = "user", column = "user_id", javaType = User.class,
                    one = @One(select = "equipmentManagementSystem.Mybatis.UserMapper.findById")
            )
    })
    @Select("SELECT id,name,model,place,states,purpose,sale_time,internal_number,type_id,department_id,user_id FROM equipment WHERE id = #{id}")
    Equipment findById(Long id);


    void deleteById(Long id);
}
