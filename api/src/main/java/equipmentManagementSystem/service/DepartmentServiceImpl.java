package equipmentManagementSystem.service;

import equipmentManagementSystem.Mybatis.DepartmentMapper;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.respority.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService{

    private DepartmentRepository departmentRepository;
    @Autowired
    private DepartmentMapper departmentMapper;
    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }


    @Override
    public Page<Department> findAll(Pageable pageable) {
        return this.departmentRepository.findAll(pageable);
    }

    @Override
    public List<Department> getAll() {
        return this.departmentMapper.findAll();
    }

    @Override
    public Department add(Department department) {
        return this.departmentRepository.save(department);
    }

    @Override
    public Department getDepartmentById(Long id) {
        Department department=this.departmentMapper.findById(id);
        if(department==null)throw new EntityNotFoundException("找不到相关设备");
        return department;
    }

    @Override
    public Department update(Long id, Department department) {
        Department oldDepartment= this.getDepartmentById(id);
        oldDepartment.setName(department.getName());
        oldDepartment.setCode(department.getCode());
        return this.departmentRepository.save(oldDepartment);
    }
}
