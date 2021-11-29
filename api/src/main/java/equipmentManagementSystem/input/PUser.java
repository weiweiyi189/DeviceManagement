package equipmentManagementSystem.input;

/**
 * 对应user 用于修改手机号
 */
public class PUser {

    /**
     * 新手机号
     */
    private String newPhoneNumber;

    /**
     * 密码
     */

    private String password;


    public String getPassword() {
        return password;
    }

    public String getNewPhoneNumber() {
        return newPhoneNumber;
    }

    public void setNewPhoneNumber(String newPhoneNumber) {
        this.newPhoneNumber = newPhoneNumber;
    }
}
