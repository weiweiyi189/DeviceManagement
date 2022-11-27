package equipmentManagementSystem.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Approval {
  public final static Short PENDING_APPROVEAl = 0;
  public final static Short PASSED = 1;
  public final static Short FAILDED = 2;
  @Id
  @JsonView(IdJsonView.class)
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  //    1:转借     2:维修     3:报废     4:购入  5： 上报购入
  private Short type;

  // 1 同意  2 未审批 3. 拒绝
  private Short status;

  /**
   * 借出部门
   */
  @JsonView(LendDepartmentJsonView.class)
  @ManyToOne
  private Department lendDepartment;

  /**
   * 借出设备
   */
  @ManyToOne
  @JsonView(EquipmentJsonView.class)
  private Equipment equipment;

  @CreationTimestamp
  private Timestamp createTime;

  /**
   * 创建用户
   */
  @ManyToOne
  @JsonView(CreateUserJsonView.class)
  @NotFound(action = NotFoundAction.IGNORE)
  private User createUser;

  /**
   * 审批者
   */
  @ManyToOne
  @JsonView(ApprovalUserJsonView.class)
//  @CreatedBy
  private User approvalUser;

  public User getApprovalUser() {
    return approvalUser;
  }

  public void setApprovalUser(User approvalUser) {
    this.approvalUser = approvalUser;
  }

  public Department getLendDepartment() {
    return lendDepartment;
  }

  public void setLendDepartment(Department lendDepartment) {
    this.lendDepartment = lendDepartment;
  }

  public Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Timestamp createTime) {
    this.createTime = createTime;
  }

  public User getCreateUser() {
    return createUser;
  }

  public void setCreateUser(User createUser) {
    this.createUser = createUser;
  }

  public Equipment getEquipment() {
    return equipment;
  }

  public void setEquipment(Equipment equipment) {
    this.equipment = equipment;
  }

  public Short getType() {
    return type;
  }

  public void setType(Short type) {
    this.type = type;
  }

  public Short getStatus() {
    return status;
  }

  public void setStatus(Short status) {
    this.status = status;
  }

  public interface ApprovalUserJsonView {}
  public interface CreateUserJsonView {}
  public interface EquipmentJsonView {}
  public interface LendDepartmentJsonView {}
  public interface IdJsonView {}
}
