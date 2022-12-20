package equipmentManagementSystem.service;

import equipmentManagementSystem.Mybatis.DepartmentMapper;
import equipmentManagementSystem.Mybatis.EquipmentMapper;
import equipmentManagementSystem.Mybatis.UserMapper;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.respority.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import equipmentManagementSystem.respority.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Objects;

@Service
public class DepartmentServiceImpl implements DepartmentService{

    private DepartmentRepository departmentRepository;
    private UserService userService;
    @Autowired
    private DepartmentMapper departmentMapper;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private EquipmentMapper equipmentMapper;

    @Autowired
    private EquipmentService equipmentService;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository,
                                 UserService userService) {
        this.departmentRepository = departmentRepository;
        this.userService = userService;
    }


    @Override
    public Page<Department> findAll(Pageable pageable) {
        return this.departmentRepository.findAll(pageable);
    }

    @Override
    public List<Department> getAll() {
        return (List<Department>) this.departmentRepository.findAll();
    }

    @Override
    public Department add(Department department) {
        User user=this.userMapper.findById(department.getUser().getId());
        department.setUser(user);
        return this.departmentRepository.save(department);
    }

    @Override
    public void delete(Long id) {
        List<Equipment> equipments = this.equipmentService.findAll(null);
        for(Equipment equipment: equipments) {
            if(Objects.equals(equipment.getDepartment().getId(), id)) {
                this.equipmentMapper.deleteById(equipment.getId());
            }
        }
        this.departmentMapper.deleteById(id);
    }

    @Override
    public Department getDepartmentById(Long id) {
        return this.departmentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关设备"));
    }

    @Override
    public Department update(Long id, Department department) {
        Department oldDepartment= this.getDepartmentById(id);
        oldDepartment.setName(department.getName());
        oldDepartment.setCode(department.getCode());
        oldDepartment.setWebHook(department.getWebHook());
        User user=this.userMapper.findById(department.getUser().getId());
        oldDepartment.setUser(user);
        return this.departmentRepository.save(oldDepartment);
    }
}
