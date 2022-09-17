package com.ecommerce.dao;

import com.ecommerce.entity.User;
import com.ecommerce.entity.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserData, Long> {

    Optional<UserData> findByUsername(String username);
}
