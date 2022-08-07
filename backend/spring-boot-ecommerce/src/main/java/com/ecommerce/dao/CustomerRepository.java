package com.ecommerce.dao;

import com.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;



public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);
}
