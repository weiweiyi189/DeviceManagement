package equipmentManagementSystem.service;

import com.mengyunzhi.core.service.CommonService;
import equipmentManagementSystem.entity.Attachment;
import equipmentManagementSystem.entity.MyFile;
import equipmentManagementSystem.respority.AttachmentRepository;
import equipmentManagementSystem.respority.MyFileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttachmentServiceImpl implements AttachmentService {

  private static final Logger logger = LoggerFactory.getLogger(AttachmentServiceImpl.class);

  final private MyFileRepository myFileRepository;
  final private MyFileService myFileService;
  final private AttachmentRepository attachmentRepository;
  final private UserService userService;

  public AttachmentServiceImpl(MyFileRepository myFileRepository,
                               AttachmentRepository attachmentRepository,
                               MyFileService myFileService,
                               UserService userService) {
    this.myFileRepository = myFileRepository;
    this.attachmentRepository = attachmentRepository;
    this.myFileService = myFileService;
    this.userService = userService;
  }

  @Override
  public void download(Long id, String md5, HttpServletResponse response) {
    Attachment attachment = this.getById(id);
    if (!attachment.getFile().getMd5().equals(md5)) {
      throw new EntityNotFoundException();
    }
    this.myFileService.download(attachment.getName(), attachment.getFile(), response);
  }

  public Attachment getById(Long id) {
    return this.attachmentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关附件"));
  }

  @Override
  public List<Attachment> getByIds(List<Long> ids) {
    List<Attachment> attachmentList = new ArrayList<>();
    for (Long id : ids) {
      attachmentList.add(this.getById(id));
    }
    return attachmentList;
  }


  @Override
  public Attachment upload(MultipartFile multipartFile) throws Exception {
    Path saveFilePath = Paths.get(CONFIG_PATH + this.getYearMonthDay());
    return this.saveAttachment(multipartFile, saveFilePath, false);
  }

  public Attachment saveAttachment(MultipartFile multipartFile, Path saveFilePath, Boolean useOriginNameSave) throws Exception {
    logger.debug("新建附件对象");
    Attachment attachment = new Attachment();

    logger.debug("获取文件名");
    String fileName = multipartFile.getOriginalFilename();

    logger.debug("从文件名中截取拓展名");
    // 从"."最后一次出现的位置的下一位开始截取，获取扩展名
    assert fileName != null;
    String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

    logger.debug("对文件进行sha1,md5加密");
    String sha1ToMultipartFile = CommonService.encrypt(multipartFile, "SHA-1");
    String md5ToMultipartFile = CommonService.encrypt(multipartFile, "MD5");

    logger.debug("设置文件信息");
    attachment.setName(fileName);
    attachment.setExt(ext);

    MyFile oldFile = this.myFileRepository.findTopBySha1AndMd5(sha1ToMultipartFile, md5ToMultipartFile);
    // 判断是否保存file
    if (oldFile == null) {
      logger.debug("设置保存文件名");
      String saveName;
      if (useOriginNameSave) {
        saveName = fileName;
      } else {
        saveName = CommonService.md5(md5ToMultipartFile + System.currentTimeMillis()) + "." + ext;
      }

      logger.debug("判断上传的文件是否为空");
      if (multipartFile.isEmpty()) {
        throw new RuntimeException("上传的附件不能为空" + fileName);
      }

      logger.debug("如果目录不存在，则创建目录。如果目录存在，则不创建");
      if (!Files.exists(saveFilePath)) {
        Files.createDirectories(saveFilePath);
        new File(saveFilePath.resolve("index.html").toString()).createNewFile();
      }

      logger.debug("将文件移动至储存文件的路径下");
      Files.copy(multipartFile.getInputStream(), saveFilePath.resolve(saveName),
              StandardCopyOption.REPLACE_EXISTING);

      logger.debug("新建文件实体，并保存到数据库");
      MyFile file = new MyFile();
      file.setName(saveName);
      file.setMime(multipartFile.getContentType());
      file.setPath(saveFilePath.toString());
      file.setSha1(sha1ToMultipartFile);
      file.setMd5(md5ToMultipartFile);
      oldFile = this.myFileRepository.save(file);
    } else {
      oldFile = this.myFileRepository.save(oldFile);
    }

    attachment.setFile(oldFile);
    this.attachmentRepository.save(attachment);
    return attachment;
  }

  /**
   * 返回当前时间的字符串信息
   */
  private String getYearMonthDay() {
    Calendar calendar = Calendar.getInstance();
    return "" + calendar.get(Calendar.YEAR)
            + (calendar.get(Calendar.MONTH) + 1)
            + calendar.get(Calendar.DAY_OF_MONTH);
  }
}