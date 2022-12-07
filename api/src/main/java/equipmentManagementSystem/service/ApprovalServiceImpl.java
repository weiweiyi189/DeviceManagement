package equipmentManagementSystem.service;

import equipmentManagementSystem.Mybatis.ApprovalMapper;
import equipmentManagementSystem.Mybatis.EquipmentMapper;
import equipmentManagementSystem.entity.Approval;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.respority.ApprovalRepository;
import equipmentManagementSystem.respority.EquipmentRepository;
import equipmentManagementSystem.respority.Specs.ApprovalSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class ApprovalServiceImpl implements ApprovalService {
  private final ApprovalRepository approvalRepository;
  private final EquipmentRepository equipmentRepository;
  private final UserService userService;
  @Autowired
  private ApprovalMapper approvalMapper;
  @Autowired
  private EquipmentMapper equipmentMapper;

  public ApprovalServiceImpl(ApprovalRepository approvalRepository,
                             EquipmentRepository equipmentRepository,
                             UserService userService) {
    this.approvalRepository = approvalRepository;
    this.equipmentRepository = equipmentRepository;
    this.userService = userService;
  }

  @Override
  public Page<Approval> page(Pageable pageable) {
    Short type = 1;
    Short status = Approval.PENDING_APPROVEAl;
    User user = this.userService.getCurrentLoginUser();
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type).and(ApprovalSpecs.equalStatus(status)).and(ApprovalSpecs.isBelongMyDepartment(user.getDepartment())), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> repairPage(Pageable pageable) {
    Short type = 2;
    Short status = Approval.PENDING_APPROVEAl;
    User user = this.userService.getCurrentLoginUser();
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type).and(ApprovalSpecs.equalStatus(status)).and(ApprovalSpecs.isBelongMyDepartment(user.getDepartment())), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> salePage(Pageable pageable) {
    Short type = 4;
    Short status = Approval.PENDING_APPROVEAl;
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type).and(ApprovalSpecs.equalStatus(status)), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> upSalePage(Pageable pageable) {
    Short type = 5;
    Short status = Approval.PENDING_APPROVEAl;
    User user = this.userService.getCurrentLoginUser();
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type).and(ApprovalSpecs.equalStatus(status)).and(ApprovalSpecs.isBelongMyDepartment(user.getDepartment())), pageable);
    return approvals;
  }

  @Override
  public void salePass(Long id) {
    Approval approval = getById(id);
    approval.setType((short)4);
    approval.setStatus(Approval.PASSED);
    approval.setApprovalUser(this.userService.getCurrentLoginUser());
    Equipment equipment = approval.getEquipment();
    equipment.setStates(0);
    this.equipmentRepository.save(equipment);
    this.approvalRepository.save(approval);
  }

  @Override
  public void upSalePass(Long id) {
    Approval approval = getById(id);
    approval.setType((short)5);
    approval.setStatus(Approval.PASSED);
    approval.setApprovalUser(this.userService.getCurrentLoginUser());
    Equipment equipment = approval.getEquipment();
    equipment.setStates(5);

    this.approvalRepository.save(approval);
    this.equipmentRepository.save(equipment);


    Approval approval1 = new Approval();
    approval1.setType((short)4);
    approval1.setStatus(Approval.PENDING_APPROVEAl);
    approval1.setEquipment(approval.getEquipment());
    approval1.setCreateUser(this.userService.getCurrentLoginUser());
    this.approvalRepository.save(approval1);
  }

  @Override
  public Approval getById(Long id) {
    Approval approval=this.approvalMapper.findById(id);
    if(approval==null)throw new EntityNotFoundException("实体未找到");
    return approval;
  }

  @Override
  public void repairPass(Long id) {
    Approval approval = getById(id);
    approval.setType((short)2);
    approval.setStatus(Approval.PASSED);
    approval.setApprovalUser(this.userService.getCurrentLoginUser());
    Equipment equipment = approval.getEquipment();
    equipment.setStates(2);
    this.approvalRepository.save(approval);
    this.equipmentRepository.save(equipment);
  }

  @Override
  public void pass(Long id) {
    Approval approval = getById(id);
    approval.setStatus(Approval.PASSED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    Equipment equipment = approval.getEquipment();
    equipment.setStates(1);
    this.approvalRepository.save(approval);
    this.equipmentRepository.save(equipment);
  }

  @Override
  public void scrapPass(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(3);
    this.equipmentRepository.save(equipment);
    approval.setStatus(Approval.PASSED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.approvalRepository.save(approval);
    this.equipmentRepository.save(equipment);
  }

  @Override
  public void returnChange(Long id) {
//    Approval approval = getById(id);
//    approval.setType((short)5);
//    Equipment equipment = approval.getEquipment();
//    equipment.setStates(0);
//    this.equipmentRepository.save(equipment);
//    this.approvalRepository.save(approval);
  }

  @Override
  public void fail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(0);
    approval.setStatus(Approval.FAILDED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    equipmentRepository.save(equipment);
    this.approvalRepository.save(approval);
  }

  @Override
  public void saleFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    this.equipmentMapper.deleteById(equipment.getId());
    approval.setStatus(Approval.FAILDED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.approvalRepository.save(approval);
  }

  @Override
  public void upSaleFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    approval.setStatus(Approval.FAILDED);
    this.equipmentMapper.deleteById(equipment.getId());
    this.approvalRepository.save(approval);
  }

  @Override
  public void repairFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(0);
    equipmentRepository.save(equipment);
    approval.setStatus(Approval.FAILDED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.approvalRepository.save(approval);
  }

  @Override
  public void scrapFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(0);
    approval.setStatus(Approval.FAILDED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.equipmentRepository.save(equipment);
    this.approvalRepository.save(approval);
  }

  @Override
  public Page<Approval> scrapPage(Pageable pageable) {
    Short type = 3;
    Short status = Approval.PENDING_APPROVEAl;
    User user = this.userService.getCurrentLoginUser();
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type).and(ApprovalSpecs.equalStatus(status)).and(ApprovalSpecs.isBelongMyDepartment(user.getDepartment())), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> allPage(Pageable pageable) {
    Page<Approval> approvals = this.approvalRepository.findAll(pageable);
    return approvals;
  }
}
