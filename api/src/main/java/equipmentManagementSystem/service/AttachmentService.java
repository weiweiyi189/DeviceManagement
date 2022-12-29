package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.Attachment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface AttachmentService {

  String CONFIG_PATH = "attachment/";

  /**
   * 下载
   *
   * @param id       附件ID
   * @param md5      md5
   * @param response 响应
   */
  void download(Long id, String md5, HttpServletResponse response);


  /**
   * 根据id数组获取附件
   * @return 附件数组
   */
  List<Attachment> getByIds(List<Long> ids);




  /**
   * 上传附件
   *
   * @param multipartFile 文件
   */
  Attachment upload(MultipartFile multipartFile) throws Exception;
}
