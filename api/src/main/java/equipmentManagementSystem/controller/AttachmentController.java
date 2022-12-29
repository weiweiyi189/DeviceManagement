package equipmentManagementSystem.controller;


import com.fasterxml.jackson.annotation.JsonView;
import equipmentManagementSystem.entity.Attachment;
import equipmentManagementSystem.service.AttachmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;


@RestController
@RequestMapping("attachment")
public class AttachmentController {
  final private AttachmentService attachmentService;

  public AttachmentController(AttachmentService attachmentService) {
    this.attachmentService = attachmentService;
  }


  /**
   * 上传文件
   *
   * @param multipartFile 附件
   * @return 上传附件结果
   */
  @PostMapping("upload")
  @JsonView(UploadJsonView.class)
  public Attachment upload(@RequestParam("file") MultipartFile multipartFile) throws Exception {
    return this.attachmentService.upload(multipartFile);
  }

  /**
   * 下载
   *
   * @param id       id
   * @param md5      md5
   * @param filename 保存的文件名
   * @param response 响应
   * @throws UnsupportedEncodingException 传入的文件名转码失败时异常
   */
  @GetMapping({"download/{id}/{md5}",})
  public void download(@PathVariable Long id,
                       @PathVariable String md5,
                       @RequestParam(required = false) String filename,
                       HttpServletResponse response)
          throws UnsupportedEncodingException {
    if (filename != null) {
      response.setHeader("Content-disposition", "attachment; filename=" +
              URLEncoder.encode(filename, "UTF-8"));
    }
    this.attachmentService.download(id, md5, response);
  }

  @GetMapping({"getAttachmentByIds"})
  @JsonView(getByIdsJsonView.class)
  public List<Attachment> getAttachmentByIds(@RequestParam List<Long> attachmentIds) {
    return this.attachmentService.getByIds(attachmentIds);

  }

  interface getByIdsJsonView extends Attachment.MyFileJsonView {
  }

  interface UploadJsonView extends Attachment.MyFileJsonView {
  }

  private class PageJsonView implements Attachment.MyFileJsonView {
  }
}
