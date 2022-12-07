package equipmentManagementSystem.entity;

import com.mengyunzhi.core.entity.YunzhiEntity;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
@SQLDelete(sql = "update `type` set deleted = 1 where id = ?")
public class Type implements Serializable,SoftDelete {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    /**
     * 设备类型名称
     */
    private String name;

    private Boolean deleted = false;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Boolean getDeleted() {
        return this.deleted;
    }

    // 设置为私有
    private void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
