package equipmentManagementSystem.controller;

import com.fasterxml.jackson.annotation.JsonView;
import equipmentManagementSystem.entity.*;
import equipmentManagementSystem.service.EquipmentService;
import equipmentManagementSystem.entity.CodeUpdatePwdVo;
import equipmentManagementSystem.service.MailService;
import equipmentManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.PrimitiveIterator;

@RestController
@RequestMapping("equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    private final UserService userService;


    public EquipmentController(EquipmentService equipmentService,UserService userService) {
        this.equipmentService = equipmentService;
        this.userService=userService;
    }

    @GetMapping("getAll")
    @JsonView(GetAllJsonView.class)
    public List<Equipment> page(@RequestParam int page, @RequestParam int size) {
//        Equipment equipment = this.equipmentService.getEquipmentById(4L);
//        CodeUpdatePwdVo codeUpdatePwdVo = new CodeUpdatePwdVo("chenyu","511393","chenyu");
//        userService.codeUpdatePwd(codeUpdatePwdVo);
        return this.equipmentService.findAll(PageRequest.of(page, size));
    }

    @GetMapping("getToRepair")
    @JsonView(GetAllJsonView.class)
    public Page<Equipment> getToRepair(@RequestParam int page, @RequestParam int size) {
        return this.equipmentService.getToRepair(PageRequest.of(page, size));
    }

    @GetMapping("getBorrow")
    @JsonView(GetAllJsonView.class)
    public Page<Equipment> getBorrow(@RequestParam int page, @RequestParam int size) {
        return this.equipmentService.getBorrow(PageRequest.of(page, size));
    }


    @PutMapping("{id}")
    @JsonView(Department.UserJsonView.class)
    public Equipment update(@PathVariable Long id, @RequestBody Equipment equipment) {
        return this.equipmentService.update(id, equipment);
    }

    @GetMapping("{id}")
    @JsonView(GetAllJsonView.class)
    public Equipment getEquipmentById(@PathVariable Long id) {
        return this.equipmentService.getEquipmentById(id);
    }

    @GetMapping("query")
    @JsonView(GetAllJsonView.class)
    public Page<Equipment> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String internalNumber,
            @RequestParam(required = false) String  place,
            @RequestParam(required = false) Long states,
            @RequestParam(required = false) Long type,
            Pageable pageable) {
        return this.equipmentService.quaryAll(
                name,
                states,
                place,
                internalNumber,
                pageable,
                type);
    }

    @PostMapping
    public void add(@RequestBody Equipment equipment) {
        this.equipmentService.add(equipment);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.equipmentService.delete(id);
    }


    @PutMapping("report/{id}")
    @JsonView(Department.UserJsonView.class)
    public Equipment  report(@PathVariable Long id, @RequestBody Equipment equipment) {
        return this.equipmentService.report(id, equipment);
    }

    @PutMapping("borrow/{id}")
    @JsonView(Department.UserJsonView.class)
    public Equipment  borrow(@PathVariable Long id, @RequestBody Equipment equipment) {
        return this.equipmentService.borrow(id, equipment);
    }

    @PutMapping("return/{id}")
    @JsonView(Department.UserJsonView.class)
    public Equipment  toReturn(@PathVariable Long id, @RequestBody Equipment equipment) {
        return this.equipmentService.toReturn(id, equipment);
    }


    @PutMapping("repair/{id}")
    @JsonView(Department.UserJsonView.class)
    public Equipment  repair(@PathVariable Long id, @RequestBody Equipment equipment) {
        return this.equipmentService.repair(id);
    }

    @PutMapping("toRepair/{id}")
    @JsonView(Department.UserJsonView.class)
    public Equipment  toRepair(@PathVariable Long id, @RequestBody Equipment equipment) {
        return this.equipmentService.toRepair(id);
    }

    @PutMapping("scrap/{id}")
    @JsonView(Department.UserJsonView.class)
    public Equipment  scrap(@PathVariable Long id, @RequestBody Equipment equipment) {
        return this.equipmentService.scrap(id, equipment);
    }

    public class GetAllJsonView implements Equipment.DepartmentJsonView, Equipment.UserJsonView, Department.UserJsonView {}
}