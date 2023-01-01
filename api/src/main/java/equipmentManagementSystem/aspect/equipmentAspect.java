package equipmentManagementSystem.aspect;

import equipmentManagementSystem.Mybatis.EquipmentMapper;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.respority.EquipmentRepository;
import equipmentManagementSystem.service.DingService;
import equipmentManagementSystem.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Aspect
@Component
public class equipmentAspect {
    @Autowired
    private EquipmentRepository equipmentRepository;
//     切入toReturn, 修改设备得分
    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.toReturn(..)) && args(id,equipment)")
    public void setScore(final ProceedingJoinPoint joinPoint, Long id, Equipment equipment) throws Throwable {
        Equipment equipment1 = this.equipmentRepository.findById(id).get();
        if(equipment1.getScore() == null || equipment1.getNumber() == null) {
            equipment1.setScore(equipment.getScore());
            equipment1.setNumber(1);
        } else {
            Double score = (equipment1.getScore() * equipment1.getNumber()  + equipment.getScore()) / (equipment1.getNumber()+1);
            equipment1.setScore(score);
            equipment1.setNumber(equipment1.getNumber()+1);
        }
        this.equipmentRepository.save(equipment1);

        joinPoint.proceed();
    }
}
