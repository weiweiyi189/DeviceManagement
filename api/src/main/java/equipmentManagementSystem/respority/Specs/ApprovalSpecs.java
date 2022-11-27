package equipmentManagementSystem.respority.Specs;

import equipmentManagementSystem.entity.Approval;
import org.springframework.data.jpa.domain.Specification;

public class ApprovalSpecs {
  /**
   * 属于某个类型
   *
   * @param type 类型
   * @return
   */
  public static Specification<Approval> equalType(Short type) {
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("type"), type);
  }

  public static Specification<Approval> equalStatus(Short status) {
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
  }
}
