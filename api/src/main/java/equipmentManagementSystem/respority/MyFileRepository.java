package equipmentManagementSystem.respority;

import equipmentManagementSystem.entity.MyFile;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface MyFileRepository extends CrudRepository<MyFile, Long>, JpaSpecificationExecutor<MyFile> {

    MyFile findTopBySha1AndMd5(String sh1, String md5);
}
