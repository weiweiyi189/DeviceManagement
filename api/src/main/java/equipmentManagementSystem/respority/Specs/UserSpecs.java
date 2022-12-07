package equipmentManagementSystem.respority.Specs;

import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecs {
    public static Specification<User> containingName(String name) {
        if (name != null && !name.isEmpty()) {
            return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<User> containingUsername(String username) {
        if (username != null) {
            return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("username").as(String.class), String.format("%%%s%%", username));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<User> containingJobNumber(String jobNumber) {
        if (jobNumber != null && !jobNumber.isEmpty()) {
            return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("jobNumber").as(String.class), String.format("%%%s%%", jobNumber));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<User> getAllCharge() {
        Long id = 3L;
        return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("role"), id);
    }

    public static Specification<User> isRole(Long role) {
        if (role == null) {
            return Specification.where(null);
        }
        return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("role").as(Long.class),  role);
    }

    public static Specification<User> isNotCurrentUser(Long id) {
        if (id == null) {
            return Specification.where(null);
        }
        return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.notEqual(root.get("id").as(Long.class),  id);
    }

    public static Specification<User> isDepartment(Department department) {
        if (department == null) {
            return Specification.where(null);
        }
        return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("department").as(Department.class),  department);
    }

}
