package equipmentManagementSystem.respority;

import equipmentManagementSystem.entity.Approval;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ApprovalRepository extends JpaSpecificationExecutor<Approval>, PagingAndSortingRepository<Approval, Long> {
}
