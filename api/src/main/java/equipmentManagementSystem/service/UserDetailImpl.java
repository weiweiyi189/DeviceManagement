package equipmentManagementSystem.service;

import equipmentManagementSystem.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class UserDetailImpl extends org.springframework.security.core.userdetails.User implements UserDetails {
  private User user;
  public UserDetailImpl(String username, String password, Collection<? extends GrantedAuthority> authorities, User user) {
    super(username, password, authorities);
    this.user = user;
  }

  public User getUser() {
    return user;
  }
}