package equipmentManagementSystem.service;

import com.mengyunzhi.core.service.CommonService;
import equipmentManagementSystem.Mybatis.EquipmentMapper;
import equipmentManagementSystem.Mybatis.TypeMapper;
import equipmentManagementSystem.entity.*;
import equipmentManagementSystem.respority.ApprovalRepository;
import equipmentManagementSystem.respority.EquipmentRepository;
import equipmentManagementSystem.respority.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class EquipmentServiceImpl implements EquipmentService{
    private EquipmentRepository equipmentRepository;
    private DingService dingService;
    private UserService userService;
    private TypeRepository typeRepository;
    private Type type;
    private final ApprovalRepository approvalRepository;

    @Autowired
    private EquipmentMapper equipmentMapper;


    public EquipmentServiceImpl(EquipmentRepository equipmentRepository,
                                ApprovalRepository approvalRepository,
                                UserService userService,
                                TypeRepository typeRepository,
                                DingService dingService){
        this.equipmentRepository = equipmentRepository;
        this.dingService = dingService;
        this.typeRepository = typeRepository;
        this.userService = userService;
        this.approvalRepository = approvalRepository;
    }
    @Override
    public List<Equipment> findAll(Pageable pageable) {
        List<Equipment> equipments = this.equipmentMapper.findAll();
        return equipments;
    }

    @Override
    public Page<Equipment> getToRepair(Pageable pageable) {
        return this.equipmentRepository.getToRepair(pageable);
    }

    @Override
    public Equipment getEquipmentById(Long id) {
        Equipment equipment = this.equipmentMapper.findById(id);
        if(equipment==null)throw new EntityNotFoundException("找不到相关设备");
        return equipment;
    }

    @Override
    public Page<Equipment> quaryAll(String name, Long states, String place, String internalNumber, Pageable pageable, Long typeId) {
        if (typeId != null){
            this.type = new Type();
            Type type1 = this.typeRepository.findById(typeId).get();
            this.type.setId(type1.getId());
        }else {
            this.type = null;
        }
        return this.equipmentRepository.query(name,states, place, internalNumber, pageable, this.type);
    }

    @Override
    public Equipment update(Long id, Equipment equipment) {
        Equipment oldEquipment= this.getEquipmentById(id);
       oldEquipment.setDepartment(equipment.getDepartment());
       oldEquipment.setInternalNumber(equipment.getInternalNumber());
       oldEquipment.setModel(equipment.getModel());
       oldEquipment.setName(equipment.getName());
       oldEquipment.setPlace(equipment.getPlace());
       oldEquipment.setType(equipment.getType());
        return this.equipmentRepository.save(oldEquipment);
    }

    @Override
    public void add(Equipment equipment) {
        // 管理员不用审批
        if (this.userService.getCurrentLoginUser().getRole() == 0) {
            equipment.setStates(0);
            this.equipmentRepository.save(equipment);
        } else {
            dingService.dingRequest("新增推送" + "\n" + "用户  " +
                    this.userService.getCurrentLoginUser().getName() + " 提交审批" + "\n" + "新增设备： " + equipment.getName());
            equipment.setStates(4);
            Approval approval = new Approval();
            approval.setCreateUser(userService.getCurrentLoginUser());
            Equipment equipment1 = this.equipmentRepository.save(equipment);
            approval.setEquipment(equipment1);
            approval.setType((short) 5);
            approval.setStatus(Approval.PENDING_APPROVEAl);
            this.approvalRepository.save(approval);
        }
    }

    @Override
    public void delete(Long id) {
        Equipment equipment = this.equipmentMapper.findById(id);
        dingService.dingRequest("删除推送" + "\n" +
                "用户  " + this.userService.getCurrentLoginUser().getName() + "   删除" + "\n" + "删除设备： " + equipment.getName());
        this.equipmentMapper.deleteById(id);
    }

    @Override
    public Equipment report(Long id, Equipment equipment) {
        Equipment equipment1 = this.equipmentRepository.findById(id).get();

        dingService.dingRequest("报修推送" + "\n" +"用户  "
                + this.userService.getCurrentLoginUser().getName() + "申请报修" +"\n" + "报修设备： " + equipment1.getName());
        Approval approval = new Approval();
        approval.setEquipment(equipment1);
        equipment1.setStates(7);
        approval.setType((short)2);
        approval.setStatus(Approval.PENDING_APPROVEAl);
        approval.setCreateUser(userService.getCurrentLoginUser());
        this.approvalRepository.save(approval);
        return this.equipmentRepository.save(equipment1);
    }

    @Override
    public Equipment borrow(Long departmentId, Equipment equipment) {
        Long id = equipment.getId();
        Department department = new Department();
        department.setId(departmentId);
        Approval approval = new Approval();
        approval.setType((short)1);
        approval.setStatus(Approval.PENDING_APPROVEAl);
        approval.setEquipment(equipment);
        approval.setCreateUser(userService.getCurrentLoginUser());
        approval.setLendDepartment(department);
        approvalRepository.save(approval);
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        Equipment equipment1 = this.equipmentRepository.findById(id).get();

        dingService.dingRequest("借用推送" + "\n" +"用户  "
                + this.userService.getCurrentLoginUser().getName() + " 申请借用" +"\n" + "借用设备： " + equipment1.getName() + "\n"
        + "借用时间： " + dateString);
        equipment1.setUser(this.userService.getCurrentLoginUser());
        equipment1.setStates(6);
        return this.equipmentRepository.save(equipment1);
    }

    @Override
    public Equipment toReturn(Long id, Equipment equipment) {
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        Equipment equipment1 = this.equipmentRepository.findById(id).get();

        dingService.dingRequest("归还推送" + "\n" +"用户  "
                + this.userService.getCurrentLoginUser().getName() + "   归还" +"\n" + "归还设备： " + equipment1.getName() + "\n"
                + "归还时间： " + dateString);
        equipment1.setUser(null);
        equipment1.setStates(0);
        return this.equipmentRepository.save(equipment1);
    }

    @Override
    public Equipment toRepair(Long id) {
        Equipment equipment = equipmentRepository.findById(id).get();
        equipment.setStates(0);
        return this.equipmentRepository.save(equipment);
    }

    @Override
    public Equipment repair(Long id) {
        Approval approval = new Approval();
        approval.setType((short) 2);
        approval.setStatus(Approval.PENDING_APPROVEAl);

        Equipment equipment = equipmentRepository.findById(id).get();
        equipment.setStates(7);
        approval.setEquipment(equipment);
        approval.setCreateUser(userService.getCurrentLoginUser());
        this.approvalRepository.save(approval);
        return this.equipmentRepository.save(equipment);
    }

    @Override
    public Equipment scrap(Long id, Equipment equipment) {
        Equipment equipment1 = this.equipmentRepository.findById(id).get();
        dingService.dingRequest("报废推送" + "\n"
                +"申请报废设备： " + equipment1.getName() + "\n" + "用户  " + this.userService.getCurrentLoginUser().getName() + "  执行操作");
        Approval approval = new Approval();
        approval.setEquipment(equipment1);
        equipment1.setStates(8);
        approval.setType((short)3);
        approval.setStatus(Approval.PENDING_APPROVEAl);
        approval.setCreateUser(userService.getCurrentLoginUser());
        this.approvalRepository.save(approval);
        return this.equipmentRepository.save(equipment1);
    }

    @Override
    public Page<Equipment> getBorrow(Pageable pageable) {
        User user = this.userService.getCurrentLoginUser();
        return this.equipmentRepository.getBorrow(user, pageable);
    }
}
