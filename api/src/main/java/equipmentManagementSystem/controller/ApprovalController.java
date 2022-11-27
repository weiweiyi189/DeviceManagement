package equipmentManagementSystem.controller;

import com.fasterxml.jackson.annotation.JsonView;
import equipmentManagementSystem.entity.Approval;
import equipmentManagementSystem.entity.Equipment;
import equipmentManagementSystem.entity.User;
import equipmentManagementSystem.service.ApprovalService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("approval")
public class ApprovalController {
  private final ApprovalService approvalService;

  public ApprovalController(ApprovalService approvalService) {
    this.approvalService = approvalService;
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Approval> page(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
                                 Pageable pageable) {
    return this.approvalService.page(pageable);
  }

  @GetMapping("allPage")
  @JsonView(PageJsonView.class)
  public Page<Approval> allPage(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
                                 Pageable pageable) {
    return this.approvalService.allPage(pageable);
  }

  @GetMapping("returnPage")
  @JsonView(ReturnPageJsonView.class)
  public Page<Approval> repairPage(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
                                 Pageable pageable) {
    return this.approvalService.repairPage(pageable);
  }

  @GetMapping("salePage")
  @JsonView(ReturnPageJsonView.class)
  public Page<Approval> salePage(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
                                       Pageable pageable) {
    return this.approvalService.salePage(pageable);
  }

  @GetMapping("upSalePage")
  @JsonView(ReturnPageJsonView.class)
  public Page<Approval> upSalePage(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
                                       Pageable pageable) {
    return this.approvalService.upSalePage(pageable);
  }

  @GetMapping("scrapPage")
  @JsonView(ReturnPageJsonView.class)
  public Page<Approval> scrapPage(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
                                 Pageable pageable) {
    return this.approvalService.scrapPage(pageable);
  }

  @GetMapping("pass/{id}")
  public void pass(@PathVariable Long id) {
    this.approvalService.pass(id);
  }

  @GetMapping("salePass/{id}")
  public void salePass(@PathVariable Long id) {
    this.approvalService.salePass(id);
  }

  @GetMapping("upSalePass/{id}")
  public void upSalePass(@PathVariable Long id) {
    this.approvalService.upSalePass(id);
  }

  @GetMapping("repairPass/{id}")
  public void repairPass(@PathVariable Long id) {
    this.approvalService.repairPass(id);
  }

  @GetMapping("scrapPass/{id}")
  public void scrapPass(@PathVariable Long id) {
    this.approvalService.scrapPass(id);
  }

  @GetMapping("returnChange/{id}")
  public void returnChange(@PathVariable Long id) {
    this.approvalService.returnChange(id);
  }

  @GetMapping("fail/{id}")
  public void fail(@PathVariable Long id) {
    this.approvalService.fail(id);
  }

  @GetMapping("saleFail/{id}")
  public void saleFail(@PathVariable Long id) {
    this.approvalService.saleFail(id);
  }

  @GetMapping("upSaleFail/{id}")
  public void upSaleFail(@PathVariable Long id) {
    this.approvalService.upSaleFail(id);
  }

  @GetMapping("repairFail/{id}")
  public void repairFail(@PathVariable Long id) {
    this.approvalService.repairFail(id);
  }

  @GetMapping("scrapFail/{id}")
  public void scrapFail(@PathVariable Long id) {
    this.approvalService.scrapFail(id);
  }

  public class PageJsonView implements Approval.CreateUserJsonView, Approval.EquipmentJsonView, Approval.LendDepartmentJsonView, Approval.IdJsonView, Equipment.DepartmentJsonView,  User.DepartmentJsonView, Approval.ApprovalUserJsonView  {
  }

  public class ReturnPageJsonView implements Approval.CreateUserJsonView, Approval.EquipmentJsonView, Approval.LendDepartmentJsonView, Approval.IdJsonView, Equipment.DepartmentJsonView, User.DepartmentJsonView, Approval.ApprovalUserJsonView {
  }
}
