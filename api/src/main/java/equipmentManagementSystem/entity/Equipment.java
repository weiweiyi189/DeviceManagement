package equipmentManagementSystem.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.entity.YunzhiEntity;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@SQLDelete(sql = "update `equipment` set deleted = 1 where id = ?")
public class Equipment implements Serializable, SoftDelete {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    /**
     * 型号
     */
    private String model;

    /**
     * 设备名称
     */
    private String name;

    /**
     * 种类
     */
    @OneToOne
    private Type type;

    /**
     * 内部编号
     */
    //@JsonProperty("internal_number")
    private String internalNumber;

    /**
     * 所属部门
     */
    @OneToOne
    @JsonView(DepartmentJsonView.class)
    private Department department;

    /**
     * 存放位置
     */
    private String place;

    // 用途
    private String purpose;

    // 平均得分 满分5分
    private Double score = 0.0;

    // 评价次数
    private Integer number = 0;

    private Boolean deleted = false;

    /**
     * 购入时间
     */
    private Long saleTime;

    @OneToOne
    @JsonView(UserJsonView.class)
    private User user;

    /**
     * 状态
     */
//    case 0:
//            return `正常`;
//      case 1:
//              return `借出`;
//      case 2:
//              return `维修中`;
//      case 3:
//              return `报废`;
//      case 4:
//              return `购入待上报`;
//      case 5:
//              return `购入待审批`;
//      case 6:
//              return `借用待审批`;
//      case 7:
//              return `维修待审批`;
//      case 8:
//              return `报废待审批`;
    private Integer states;


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Department getDepartment() {
        return department;
    }

    public Long getSaleTime() {
        return saleTime;
    }

    public String getInternalNumber() {
        return internalNumber;
    }

    public String getModel() {
        return model;
    }

    public String getPlace() {
        return place;
    }

    public Type getType() {
        return type;
    }

    public Integer getStates() {
        return states;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public void setInternalNumber(String internalNumber) {
        this.internalNumber = internalNumber;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public void setSaleTime(Long saleTime) {
        this.saleTime = saleTime;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public void setStates(Integer states) {
        this.states = states;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public Boolean getDeleted() {
        return this.deleted;
    }

    // 设置为私有
    private void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Double getScore() {
        return score;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public interface DepartmentJsonView{}
    public interface UserJsonView{}
}

