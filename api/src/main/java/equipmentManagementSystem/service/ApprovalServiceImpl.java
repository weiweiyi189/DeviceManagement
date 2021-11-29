package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.Approval;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.respority.ApprovalRepository;
import equipmentManagementSystem.respority.EquipmentRepository;
import equipmentManagementSystem.respority.Specs.ApprovalSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class ApprovalServiceImpl implements ApprovalService {
  private final ApprovalRepository approvalRepository;
  private final EquipmentRepository equipmentRepository;
  private final UserService userService;

  public ApprovalServiceImpl(ApprovalRepository approvalRepository,
                             EquipmentRepository equipmentRepository,
                             UserService userService) {
    this.approvalRepository = approvalRepository;
    this.equipmentRepository = equipmentRepository;
    this.userService = userService;
  }

  @Override
  public Page<Approval> page(Pageable pageable) {
    Short type = 0;
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> repairPage(Pageable pageable) {
    Short type = 10;
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> salePage(Pageable pageable) {
    Short type = 23;
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> upSalePage(Pageable pageable) {
    Short type = 20;
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type), pageable);
    return approvals;
  }

  @Override
  public void salePass(Long id) {
    Approval approval = getById(id);
    approval.setType((short)21);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(0);
    this.equipmentRepository.save(equipment);
    this.approvalRepository.save(approval);
  }

  @Override
  public void upSalePass(Long id) {
    Approval approval = getById(id);
    approval.setType((short)23);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(5);
    this.equipmentRepository.save(equipment);
    this.approvalRepository.save(approval);
  }

  @Override
  public Approval getById(Long id) {
    return this.approvalRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("实体未找到"));
  }

  @Override
  public void repairPass(Long id) {
    Approval approval = getById(id);
    approval.setType((short)11);
    this.approvalRepository.save(approval);
  }

  @Override
  public void pass(Long id) {
    Approval approval = getById(id);
    approval.setType(Approval.PASSED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.approvalRepository.save(approval);
  }

  @Override
  public void scrapPass(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(3);
    this.equipmentRepository.save(equipment);
    approval.setType((short)16);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.approvalRepository.save(approval);
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
    approval.setType(Approval.FAILDED);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    equipmentRepository.save(equipment);
    this.approvalRepository.save(approval);
  }

  @Override
  public void saleFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    this.equipmentRepository.deleteById(equipment.getId());
    approval.setType((short)22);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.approvalRepository.save(approval);
  }

  @Override
  public void upSaleFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    this.equipmentRepository.deleteById(equipment.getId());
    this.approvalRepository.deleteById(id);
  }

  @Override
  public void repairFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(0);
    equipmentRepository.save(equipment);
    approval.setType((short) 12);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.approvalRepository.save(approval);
  }

  @Override
  public void scrapFail(Long id) {
    Approval approval = getById(id);
    Equipment equipment = approval.getEquipment();
    equipment.setStates(0);
    approval.setType((short)17);
    approval.setApprovalUser(userService.getCurrentLoginUser());
    this.equipmentRepository.save(equipment);
    this.approvalRepository.save(approval);
  }

  @Override
  public Page<Approval> scrapPage(Pageable pageable) {
    Short type = 15;
    Page<Approval> approvals = this.approvalRepository.findAll(ApprovalSpecs.equalType(type), pageable);
    return approvals;
  }

  @Override
  public Page<Approval> allPage(Pageable pageable) {
    Page<Approval> approvals = this.approvalRepository.findAll(pageable);
    return approvals;
  }
}
