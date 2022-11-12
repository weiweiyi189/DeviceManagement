package equipmentManagementSystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling
@MapperScan(basePackages = "equipmentManagementSystem.Mybatis")
public class EquipmentManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EquipmentManagementSystemApplication.class, args);
	}
}
