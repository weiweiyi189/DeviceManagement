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
public class dingAspect {
    @Autowired
    private DingService dingService;
    @Autowired
    private UserService userService;
    @Autowired
    private EquipmentMapper equipmentMapper;
    @Autowired
    private EquipmentRepository equipmentRepository;

    /**
     * 添加设备，切入钉钉推送
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.add(..)) && args(equipment)")
    public void addEquipment(final ProceedingJoinPoint joinPoint, Equipment equipment) throws Throwable {
        if(equipment.getDepartment().getWebHook() != null) {
            String message = "新增推送" + "\n" + "用户  " +
                    this.userService.getCurrentLoginUser().getName()
                    + " 提交审批" + "\n" + "新增设备： " + equipment.getName();
            dingService.dingRequest(message,equipment.getDepartment().getWebHook());
        }
        joinPoint.proceed();
    }

    /**
     * 删除设备，切入钉钉推送
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.delete(..)) && args(id)")
    public void adeleteEquipment(final ProceedingJoinPoint joinPoint, Long id) throws Throwable {
        Equipment equipment = this.equipmentMapper.findById(id);
        if(equipment.getDepartment().getWebHook() != null) {
            String message = "删除推送" + "\n" +
                    "用户  " + this.userService.getCurrentLoginUser().getName()
                    + "   删除" + "\n" + "删除设备： " + equipment.getName();
            dingService.dingRequest(message,equipment.getDepartment().getWebHook());
        }
        joinPoint.proceed();
    }

    /**
     * 报修设备，切入钉钉推送
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.report(..)) && args(id,equipment)")
    public void reportEquipment(final ProceedingJoinPoint joinPoint, Long id,Equipment equipment) throws Throwable {
        Equipment equipment1 = this.equipmentRepository.findById(id).get();
        if(equipment.getDepartment().getWebHook() != null) {
            String message = "报修推送" + "\n" +"用户  "
                    + this.userService.getCurrentLoginUser().getName()
                    + "申请报修" +"\n" + "报修设备： " + equipment1.getName();
            dingService.dingRequest(message,equipment.getDepartment().getWebHook());
        }
        joinPoint.proceed();
    }

    /**
     * 借用设备，切入钉钉推送
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.borrow(..)) && args(departmentId,equipment)")
    public void borrowEquipment(final ProceedingJoinPoint joinPoint,Long departmentId, Equipment equipment) throws Throwable {
        Long id = equipment.getId();
        Equipment equipment1 = this.equipmentRepository.findById(id).get();
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        if(equipment.getDepartment().getWebHook() != null) {
            String message = "借用推送" + "\n" +"用户  "
                    + this.userService.getCurrentLoginUser().getName() + " 申请借用" +"\n" + "借用设备： " + equipment1.getName() + "\n"
                    + "借用时间： " + dateString;
            dingService.dingRequest(message,equipment.getDepartment().getWebHook());
        }
        joinPoint.proceed();
    }

    /**
     * 归还设备，切入钉钉推送
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.toReturn(..)) && args(departmentId,equipment)")
    public void toReturnEquipment(final ProceedingJoinPoint joinPoint,Long departmentId, Equipment equipment) throws Throwable {
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        if(equipment.getDepartment().getWebHook() != null) {
            String message = "归还推送" + "\n" +"用户  "
                    + this.userService.getCurrentLoginUser().getName() + "   归还" +"\n" + "归还设备： " + equipment.getName() + "\n"
                    + "归还时间： " + dateString;
            dingService.dingRequest(message,equipment.getDepartment().getWebHook());
        }
        joinPoint.proceed();
    }

    /**
     * 报废设备，切入钉钉推送
     * 可参考 https://juejin.cn/post/6999570632409088008
     */
    @Around("execution(* equipmentManagementSystem.controller.EquipmentController.scrap(..)) && args(id,equipment)")
    public void scrapEquipment(final ProceedingJoinPoint joinPoint,Long id, Equipment equipment) throws Throwable {
        if(equipment.getDepartment().getWebHook() != null) {
            String message = "报废推送" + "\n"
                    +"申请报废设备： " + equipment.getName() + "\n" + "用户  " + this.userService.getCurrentLoginUser().getName() + "  执行操作";
            dingService.dingRequest(message,equipment.getDepartment().getWebHook());
        }
        joinPoint.proceed();
    }
}
