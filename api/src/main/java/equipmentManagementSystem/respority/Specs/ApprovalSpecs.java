package equipmentManagementSystem.respority.Specs;

import equipmentManagementSystem.entity.Approval;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;

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

  public static Specification<Approval> isBelongMyDepartment(Department department) {
    if (department == null) {
      return Specification.where(null);
    }
    return (Specification<Approval>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.join("equipment", JoinType.LEFT).get("department").as(Department.class),  department);
  }

  public static Specification<Approval> equalStatus(Short status) {
    if (status == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
  }
}
