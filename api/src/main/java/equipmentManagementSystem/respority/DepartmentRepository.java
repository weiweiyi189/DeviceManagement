package equipmentManagementSystem.respority;

import equipmentManagementSystem.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface DepartmentRepository extends PagingAndSortingRepository<Department, Long>, JpaSpecificationExecutor {
}
