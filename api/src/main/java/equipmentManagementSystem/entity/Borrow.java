//package equipmentManagementSystem.entity;
//
//import com.mengyunzhi.core.entity.YunzhiEntity;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name="borrows")
//public class Borrow implements YunzhiEntity {
//    @Id
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
//    private String id;
//
//
//
////    @ManyToOne
////    @JoinColumn(nullable = false)
////    private User user;
//
//    @ManyToOne
//    @JoinColumn(nullable = false)
//    private Equipment equipment;
//
//    private String startTime;
//
//    private String endTime;
//
//    private String remark;
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
////    public User getUser() {
////        return user;
////    }
////
////    public void setUser(User user) {
////        this.user = user;
////    }
//
//    public String getStartTime() {
//        return startTime;
//    }
//
//    public void setStartTime(String startTime) {
//        this.startTime = startTime;
//    }
//
//    public String getEndTime() {
//        return endTime;
//    }
//
//    public void setEndTime(String endTime) {
//        this.endTime = endTime;
//    }
//
//    public String getRemark() {
//        return remark;
//    }
//
//    public void setRemark(String remark) {
//        this.remark = remark;
//    }
//
//    public Equipment getEquipment() {
//        return equipment;
//    }
//
//    public void setEquipment(Equipment equipment) {
//        this.equipment = equipment;
//    }
//}
