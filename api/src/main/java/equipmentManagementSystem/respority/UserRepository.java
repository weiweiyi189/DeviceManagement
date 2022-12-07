package equipmentManagementSystem.respority;

import equipmentManagementSystem.entity.Department;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.respority.Specs.UserSpecs;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor {
    long count();

    /**
     * 根据用户名查询用户
     */
    @Transactional
    User findByUsernameAndDeletedIsFalse(String username);

    @Transactional
    Optional<User> findByIdAndDeletedIsFalse(Long id);

    @Transactional
    default boolean existsByIdAndDeletedIsFalse(Long id) {
        return this.findById(id).isPresent();
    }

    default Page<User> query(Department department, String name, String jobNumber, Pageable pageable, Long id){
        Assert.notNull(pageable, "pageable不能为null");
        Specification<User> specification = UserSpecs.containingName(name).and(UserSpecs.containingJobNumber(jobNumber))
                .and(UserSpecs.isNotCurrentUser(id)).and(UserSpecs.isDepartment(department));
        return this.findAll(specification, pageable);
    };

    default Page<User> getAllByDepartment(Department department, Pageable pageable, Long id){
        Specification<User> specification = UserSpecs.isDepartment(department).and(UserSpecs.isNotCurrentUser(id));
        return this.findAll(specification, pageable);
    };
}
