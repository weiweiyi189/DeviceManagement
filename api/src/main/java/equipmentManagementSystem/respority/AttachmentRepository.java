package equipmentManagementSystem.respority;

import equipmentManagementSystem.entity.Attachment;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface AttachmentRepository extends CrudRepository<Attachment, Long>, JpaSpecificationExecutor<Attachment> {
}
