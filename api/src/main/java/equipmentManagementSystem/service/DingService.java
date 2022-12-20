package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.Ding;

public interface DingService {
    //请求地址以及access_token
    static String webHook = "";
    //密钥
    static String secret = "";
    String encode() throws Exception;
    void dingRequest(String message, String webHook);
    void setDing(Ding ding);
    Ding getDing();
}