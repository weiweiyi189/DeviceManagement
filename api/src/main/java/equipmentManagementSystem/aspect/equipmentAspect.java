package equipmentManagementSystem.aspect;

import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.respority.EquipmentRepository;
import equipmentManagementSystem.service.DingService;
import equipmentManagementSystem.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class equipmentAspect {

    @Autowired
    private EquipmentRepository equipmentRepository;

    /**
     * 切入toReturn, 修改设备得分
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
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

//    /**
//     * 添加设备成功，切入钉钉推送
//     * 可参考 https://juejin.cn/post/6999570632409088008
//     */
//    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.add(..)) && args(equipment)")
//    public void addEquipment(final ProceedingJoinPoint joinPoint, Equipment equipment) throws Throwable {
//        joinPoint.proceed();
//        if(equipment.getDepartment().getWebHook() != null) {
//            String message = "新增推送" + "\n" + "用户  " +
//                    this.userService.getCurrentLoginUser().getName()
//                    + " 提交审批" + "\n" + "新增设备： " + equipment.getName();
//            dingService.dingRequest(message,equipment.getDepartment().getWebHook());
//        }
//    }


}
