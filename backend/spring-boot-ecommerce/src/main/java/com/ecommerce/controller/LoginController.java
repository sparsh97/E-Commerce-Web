package com.ecommerce.controller;

import com.ecommerce.config.JWTUtility;
import com.ecommerce.dto.JWTRequest;
import com.ecommerce.dto.JWTResponse;
import com.ecommerce.dto.UserDto;
import com.ecommerce.entity.User;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public JWTResponse authenticate(@RequestBody JWTRequest jwtRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    ));
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS",e);
        }

        final User user = (User) userService.loadUserByUsername(jwtRequest.getUsername());

        final String token = jwtUtility.generateToken(user);

        return new JWTResponse(token);
    }

    @PostMapping("/sign-up")
//    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
//       return new ResponseEntity<UserDto>(userService.saveUser(userDto), HttpStatus.ACCEPTED);
//    }
//
    public UserDto createUse(@RequestBody UserDto userDto) {
        return userService.saveUser(userDto);
    }
}
