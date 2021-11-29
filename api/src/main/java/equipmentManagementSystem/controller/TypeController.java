package equipmentManagementSystem.controller;

import com.fasterxml.jackson.annotation.JsonView;
import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.Type;
import equipmentManagementSystem.service.TypeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("type")
public class TypeController {
    private final TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.typeService.delete(id);
    }

    @GetMapping("getAll")
    public Page<Type> page(@RequestParam int page, @RequestParam int size) {
        return this.typeService.findAll(PageRequest.of(page, size));
    }


    @GetMapping
    public List<Type> getAll() {
        return this.typeService.getAll();
    }

    @PostMapping
    public void add(@RequestBody Type type) {
        this.typeService.add(type);
    }

    @PutMapping("{id}")
    public Type update(@PathVariable Long id, @RequestBody Type type) {
        return this.typeService.update(id, type);
    }

    @GetMapping("{id}")
    public Type getTypeById(@PathVariable Long id) {
        return this.typeService.getTypeById(id);
    }
}
