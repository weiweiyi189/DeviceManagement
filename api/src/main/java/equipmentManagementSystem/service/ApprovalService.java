package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.Approval;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ApprovalService {
  Page<Approval> page(Pageable pageable);
  Page<Approval> repairPage(Pageable pageable);

  Approval getById(Long id);

  void pass(Long id);
  void repairPass(Long id);
  void scrapPass(Long id);
  void returnChange(Long id);

  void fail(Long id);
  void repairFail(Long id);
  void saleFail(Long id);
  void upSaleFail(Long id);
  void scrapFail(Long id);


  Page<Approval> scrapPage(Pageable pageable);

  Page<Approval> allPage(Pageable pageable);

  Page<Approval> salePage(Pageable pageable);
  Page<Approval> upSalePage(Pageable pageable);

  void salePass(Long id);

  void upSalePass(Long id);
}
