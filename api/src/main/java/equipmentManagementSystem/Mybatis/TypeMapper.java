package equipmentManagementSystem.Mybatis;

import equipmentManagementSystem.entity.Type;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeMapper {
    List<Type> findAll();
    void deleteById(Long id);
    Type findById(Long id);
}
