package equipmentManagementSystem;

import equipmentManagementSystem.service.SoftDeleteRepositoryFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ServletComponentScan
@MapperScan(basePackages = "equipmentManagementSystem.Mybatis")
@EnableJpaRepositories(value = "equipmentManagementSystem",
		repositoryFactoryBeanClass = SoftDeleteRepositoryFactoryBean.class)
public class EquipmentManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EquipmentManagementSystemApplication.class, args);
	}
}
