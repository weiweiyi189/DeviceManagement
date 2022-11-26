package equipmentManagementSystem.Mybatis;

import equipmentManagementSystem.entity.Equipment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentMapper {
    List<Equipment> findAll();
    Equipment findById(Long id);
    void deleteById(Long id);
}
