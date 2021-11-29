package equipmentManagementSystem.respority;

import equipmentManagementSystem.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TypeRepository extends JpaRepository<Type, Long>, JpaSpecificationExecutor {
}
