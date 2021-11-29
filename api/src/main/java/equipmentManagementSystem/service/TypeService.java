package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.Type;
import equipmentManagementSystem.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TypeService {
    Page<Type> findAll(Pageable pageable);

    void add(Type type);

    List<Type> getAll();
    /**
     * 删除
     *
     * @param id
     */
    void delete(Long id);

    Type update(Long id, Type type);

    Type getTypeById(Long id);
}
