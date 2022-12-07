package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.SoftDelete;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 软删除实现类
 * https://www.codedemo.club/spring-data-jpa-soft-delete/
 * https://developer.aliyun.com/article/465404
 * https://stackoverflow.com/questions/36721601/spring-boot-how-to-declare-a-custom-repository-factory-bean
 */
@Transactional(
    readOnly = true
)
public class SoftDeleteRepositoryImpl<T, ID> extends SimpleJpaRepository<T, ID>  implements PagingAndSortingRepository<T, ID>,
    CrudRepository<T, ID>,
    JpaSpecificationExecutor<T> {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  public SoftDeleteRepositoryImpl(Class<T> domainClass, EntityManager em) {
    this(JpaEntityInformationSupport.getEntityInformation(domainClass, em), em);
  }

  public SoftDeleteRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
    super(entityInformation, entityManager);
  }

  @Override
  public boolean existsById(ID id) {
    return this.findById(id).isPresent();
  }

  @Override
  public List<T> findAll() {
    return this.findAll(this.andDeleteFalseSpecification(null));
  }

  @Override
  public Page<T> findAll(Pageable pageable) {
    return this.findAll(this.andDeleteFalseSpecification(null), pageable);
  }

  @Override
  public List<T> findAll(@Nullable Specification<T> specification) {
    return super.findAll(this.andDeleteFalseSpecification(specification));
  }

  @Override
  public Page<T> findAll(@Nullable Specification<T> specification, Pageable pageable) {
    return super.findAll(this.andDeleteFalseSpecification(specification), pageable);
  }

  @Override
  public List<T> findAll(@Nullable Specification<T> specification, Sort sort) {
    return super.findAll(this.andDeleteFalseSpecification(specification), sort);
  }

  @Override
  public Optional<T> findById(ID id) {
    Optional<T> entityOptional = super.findById(id);
    if (entityOptional.isPresent()) {
      T entity = entityOptional.get();
      if (entity instanceof SoftDelete) {
        if (!((SoftDelete) entity).getDeleted())
          return entityOptional;
      } else {
        this.logger.warn("未实现SoftDeleteEntity的实体" + entity.getClass() + "使用了软删除功能。请检查JpaRepositoryFactoryBean配置");
      }
    }
    return Optional.empty();
  }

  @Override
  public List<T> findAllById(Iterable<ID> ids) {
    return super.findAllById(ids).stream().filter(entity -> {
      if (entity instanceof SoftDelete) {
        return !((SoftDelete) entity).getDeleted();
      } else {
        this.logger.warn("未实现SoftDeleteEntity的实体" + entity.getClass() + "使用了软删除功能。请检查JpaRepositoryFactoryBean配置");
      }
      return false;
    }).collect(Collectors.toList());
  }

  @Override
  public long count() {
    return this.count(this.andDeleteFalseSpecification(null));
  }

  @Override
  public long count(@Nullable Specification<T> specification) {
    return super.count(this.andDeleteFalseSpecification(specification));
  }

  /**
   * 添加软查询条件
   *
   * @param specification 综合查询条件
   */
  private Specification<T> andDeleteFalseSpecification(Specification<T> specification) {
    Specification<T> deleteIsFalse = (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("deleted").as(Boolean.class), false);
    if (specification == null) {
      specification = deleteIsFalse;
    } else {
      specification = specification.and(deleteIsFalse);
    }
    return specification;
  }
}
