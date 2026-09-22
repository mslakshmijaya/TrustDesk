package com.airtribe.trustdesk.repository;

import com.airtribe.trustdesk.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository <Customer, String>{
}
