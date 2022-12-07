package equipmentManagementSystem.entity;


import com.fasterxml.jackson.annotation.JsonView;
import equipmentManagementSystem.service.BeanService;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 用户
 */

@Entity
@SQLDelete(sql = "update `user` set deleted = 1 where id = ?")
public class User implements Serializable,SoftDelete {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    /**
     * 工号
     */
    private String jobNumber = "";

    /**
     * 部门
     */
    @ManyToOne
    @JsonView(DepartmentJsonView.class)
    private Department department;

    /**
     * 姓名
     */
    private String name;

    private String phone;

    private Boolean deleted = false;

    /**
     * 密码
     */
    @Column(nullable = false)
    @JsonView(PasswordJsonView.class)
    private String password;

    /**
     * 角色
     */
    private Long role;

    /**
     * 性别
     * false: 男
     * true:  女
     */
    private Boolean sex = false;

    /**
     * 用户名
     */
    @Column(nullable = false)
    private String username;


    /**
     * 校验密码
     *
     * @param password 密码
     * @return
     */
    public boolean verifyPassword(String password) {
        return BeanService.getPasswordEncoder().matches(password, this.password);
    }

    public Long getId() {
        return id;
    }

    public String getJobNumber() {
        return jobNumber;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }

    public Department getDepartment() {
        return department;
    }

    public String getName() {
        return name;
    }

    public Boolean getSex() {
        return sex;
    }

    public Long getRole() {
        return role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setJobNumber(String jobNumber) {
        this.jobNumber = jobNumber;
    }

    public void setPassword(String password) {
        this.password = BeanService.getPasswordEncoder().encode(password);
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public void setRole(Long role) {
        this.role = role;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    @Override
    public Boolean getDeleted() {
        return this.deleted;
    }

    // 设置为私有
    private void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }


    public interface RolesJsonView {
    }

    public interface PasswordJsonView {
    }

    public interface DepartmentJsonView {
    }


}