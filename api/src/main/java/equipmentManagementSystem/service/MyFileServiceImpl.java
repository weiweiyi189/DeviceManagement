package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.MyFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class MyFileServiceImpl implements MyFileService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Override
  public void download(String filename, MyFile myFile, HttpServletResponse response) {
    Path path = Paths.get(myFile.getPath())
        .resolve(myFile.getName());
    java.io.File file = path.toFile();
    logger.debug("输出文件类型");
    FileInputStream inputStream;
    try {
      inputStream = new FileInputStream(file);
    } catch (FileNotFoundException e) {
      logger.error("读取文件出错" + myFile.getId() + file.getAbsolutePath());
      e.printStackTrace();
      throw new RuntimeException("读取文件发生错误");
    }

    response.setHeader("Content-Type", myFile.getMime());

    logger.debug("输出文件长度");
    response.setContentLength((int) file.length());

    logger.debug("写入数据流");
    try {
      org.apache.commons.io.IOUtils.copy(inputStream, response.getOutputStream());
      response.flushBuffer();
    } catch (IOException e) {
      logger.error("下发数据时发生了错误");
      e.printStackTrace();
      throw new RuntimeException("下发数据时发生了错误");
    }
  }
}
