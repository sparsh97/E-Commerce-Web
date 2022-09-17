package com.ecommerce.service;

import com.ecommerce.dao.UserRepository;
import com.ecommerce.dto.UserDto;
import com.ecommerce.entity.User;
import com.ecommerce.entity.UserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = null;
        Optional<UserData> userData = userRepository.findByUsername(username);
        if(userData.isPresent()) {
            UserData userData1 = userData.get();
            user = User.builder().id(userData1.getId())
                    .firstName(userData1.getFirstName())
                    .lastName(userData1.getLastName())
                    .username(userData1.getUsername())
                    .password(userData1.getPassword())
                    .build();
        }
        return user;
    }

    public UserDto saveUser(UserDto userDto) {
        UserData user = UserData.builder().firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .username(userDto.getUsername())
                .password(userDto.getPassword()).build();

        user =  userRepository.save(user);

        return UserDto.builder().firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername()).build();
    }
}
