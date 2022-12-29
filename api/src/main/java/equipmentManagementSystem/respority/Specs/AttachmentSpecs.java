package equipmentManagementSystem.respority.Specs;

import equipmentManagementSystem.entity.Attachment;
import org.springframework.data.jpa.domain.Specification;

public class AttachmentSpecs {
  public static Specification<Attachment> containingName(String name) {
    if (name != null) {
      return (Specification<Attachment>) (root, criteriaQuery, criteriaBuilder)
              -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
    } else {
      return Specification.where(null);
    }
  }
}
