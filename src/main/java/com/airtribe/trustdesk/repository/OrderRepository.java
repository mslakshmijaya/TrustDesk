package com.airtribe.trustdesk.repository;

import com.airtribe.trustdesk.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
}
