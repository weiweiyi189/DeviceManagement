package equipmentManagementSystem.respority.Specs;

import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.Type;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.service.MailService;
import org.springframework.data.jpa.domain.Specification;

public class EquipmentSpecs {

    public static Specification<Equipment> isStatus(Long status) {
        if (status == null) {
            return Specification.where(null);
        }
        return (Specification<Equipment>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("states").as(Long.class),  status);
    }
    public static Specification<Equipment> isType(Type type) {
        if (type == null) {
            return Specification.where(null);
        }
        return (Specification<Equipment>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("type").as(Type.class),  type);
    }
    public static Specification<Equipment> containPlace(String place) {
        if (place == null) {
            return Specification.where(null);
        }
        return (Specification<Equipment>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("place").as(String.class),  place);
    }
    public static Specification<Equipment> containingName(String name) {
        if (name != null) {
            return (Specification<Equipment>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }
    public static Specification<Equipment> containingInternalNumber(String internalNumber) {
        if (internalNumber != null) {
            return (Specification<Equipment>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("internalNumber").as(String.class), String.format("%%%s%%", internalNumber));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Equipment> isCurrentUser(User user) {
        if (user == null) {
            return Specification.where(null);
        }
        return (Specification<Equipment>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("user").as(User.class),  user);
    }
}
