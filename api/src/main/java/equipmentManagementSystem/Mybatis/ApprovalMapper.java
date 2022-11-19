package equipmentManagementSystem.Mybatis;


import equipmentManagementSystem.entity.Approval;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ApprovalMapper {
    List<Approval> findAll();
    Approval findById(Long id);
    void deleteById(Long id);
}
