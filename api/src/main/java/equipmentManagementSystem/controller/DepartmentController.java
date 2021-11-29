package equipmentManagementSystem.controller;

import com.fasterxml.jackson.annotation.JsonView;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("department")
public class DepartmentController {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping("getAll")
    @JsonView(Department.UserJsonView.class)
    public Page<Department> page(@RequestParam int page, @RequestParam int size) {
        return this.departmentService.findAll(PageRequest.of(page, size));
    }

    @PutMapping("{id}")
    @JsonView(Department.UserJsonView.class)
    public Department update(@PathVariable Long id, @RequestBody Department department) {
        return this.departmentService.update(id, department);
    }

    @GetMapping("{id}")
    @JsonView(Department.UserJsonView.class)
    public Department getEquipmentById(@PathVariable Long id) {
        return this.departmentService.getDepartmentById(id);
    }

    @GetMapping
    @JsonView(Department.UserJsonView.class)
    public List<Department> getAll() {
        return this.departmentService.getAll();
    }

    @PostMapping
    public Department add(@RequestBody Department department) {
       return this.departmentService.add(department);
    }
}
