package equipmentManagementSystem.service;




import equipmentManagementSystem.entity.MyFile;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;

/**
 * 文件服务.
 */
public interface MyFileService {
  /**
   * 下载
   * @param filename 文件名
   * @param file 文件
   * @param response 响应
   */
  void download(String filename, MyFile file, HttpServletResponse response);
}
