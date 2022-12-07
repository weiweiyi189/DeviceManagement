package equipmentManagementSystem.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.entity.YunzhiEntity;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;

@Entity
@SQLDelete(sql = "update `department` set deleted = 1 where id = ?")
public class Department implements SoftDelete {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    /**
     * 部门名称
     */
    private String name;

    private String code;

    private Boolean deleted = false;

    @OneToOne
    @JsonView(UserJsonView.class)
    private User user;

    public String getName() {
        return name;
    }

    public User getUser() {
        return user;
    }

    public String getCode() {
        return code;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCode(String number) {
        this.code = number;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }

    @Override
    public Boolean getDeleted() {
        return this.deleted;
    }

    // 设置为私有
    private void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public interface UserJsonView{}
}
