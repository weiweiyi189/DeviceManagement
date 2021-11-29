package equipmentManagementSystem.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.entity.YunzhiEntity;

import javax.persistence.*;

@Entity
public class Department implements YunzhiEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    /**
     * 部门名称
     */
    private String name;

    private String code;

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

    public interface UserJsonView{}
}
