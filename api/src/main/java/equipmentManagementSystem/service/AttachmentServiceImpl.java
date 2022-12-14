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
    return this.attachmentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("?????????????????????"));
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
    logger.debug("??????????????????");
    Attachment attachment = new Attachment();

    logger.debug("???????????????");
    String fileName = multipartFile.getOriginalFilename();

    logger.debug("??????????????????????????????");
    // ???"."?????????????????????????????????????????????????????????????????????
    assert fileName != null;
    String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

    logger.debug("???????????????sha1,md5??????");
    String sha1ToMultipartFile = CommonService.encrypt(multipartFile, "SHA-1");
    String md5ToMultipartFile = CommonService.encrypt(multipartFile, "MD5");

    logger.debug("??????????????????");
    attachment.setName(fileName);
    attachment.setExt(ext);

    MyFile oldFile = this.myFileRepository.findTopBySha1AndMd5(sha1ToMultipartFile, md5ToMultipartFile);
    // ??????????????????file
    if (oldFile == null) {
      logger.debug("?????????????????????");
      String saveName;
      if (useOriginNameSave) {
        saveName = fileName;
      } else {
        saveName = CommonService.md5(md5ToMultipartFile + System.currentTimeMillis()) + "." + ext;
      }

      logger.debug("?????????????????????????????????");
      if (multipartFile.isEmpty()) {
        throw new RuntimeException("???????????????????????????" + fileName);
      }

      logger.debug("???????????????????????????????????????????????????????????????????????????");
      if (!Files.exists(saveFilePath)) {
        Files.createDirectories(saveFilePath);
        new File(saveFilePath.resolve("index.html").toString()).createNewFile();
      }

      logger.debug("??????????????????????????????????????????");
      Files.copy(multipartFile.getInputStream(), saveFilePath.resolve(saveName),
              StandardCopyOption.REPLACE_EXISTING);

      logger.debug("??????????????????????????????????????????");
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
   * ????????????????????????????????????
   */
  private String getYearMonthDay() {
    Calendar calendar = Calendar.getInstance();
    return "" + calendar.get(Calendar.YEAR)
            + (calendar.get(Calendar.MONTH) + 1)
            + calendar.get(Calendar.DAY_OF_MONTH);
  }
}