package equipmentManagementSystem.schedule;

import equipmentManagementSystem.service.DingServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Date;

/**
 * 定时删除三个月前的日志信息
 *
 * @author jincheng
 */
@Component
public class DeleteDayLogSchedule {
    DingServiceImpl dingService = new DingServiceImpl();


    @Scheduled(cron = "0 0 8 ? * *")
    public void runTask(){
        LocalTime localTime = LocalTime.now();
//        dingService.dingRequest("日志推送");
//        dingService.dingRequest("执行定时任务" + localTime);
        System.out.println("执行定时任务" + localTime);
    }
}
