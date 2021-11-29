package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DepartmentService {

    Page<Department> findAll(Pageable pageable);

    List<Department> getAll();

    Department add(Department department);

    Department update(Long id, Department department);

    Department getDepartmentById(Long id);
}
