package equipmentManagementSystem.Mybatis;

import equipmentManagementSystem.entity.Department;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentMapper {
    List<Department> findAll();
    Department findById(Long id);
    void deleteById(Long id);
}