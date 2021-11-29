package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.Type;
import equipmentManagementSystem.respority.TypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TypeServiceImpl implements TypeService{
    private TypeRepository typeRepository;

    public TypeServiceImpl(TypeRepository typeRepository){
        this.typeRepository = typeRepository;
    }
    @Override
    public Page<Type> findAll(Pageable pageable) {
        return this.typeRepository.findAll(pageable);
    }

    @Override
    public void add(Type type) {
        this.typeRepository.save(type);
    }

    @Override
    public List<Type> getAll() {
        return (List<Type>) this.typeRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        this.typeRepository.deleteById(id);
    }

    @Override
    public Type getTypeById(Long id) {
        return this.typeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关设备"));
    }

    @Override
    public Type update(Long id, Type type) {
        Type oldType= this.getTypeById(id);
      oldType.setName(type.getName());
        return this.typeRepository.save(type);
    }
}
