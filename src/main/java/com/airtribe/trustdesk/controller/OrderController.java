package com.airtribe.trustdesk.controller;

import com.airtribe.trustdesk.entity.Order;
import com.airtribe.trustdesk.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(
            @PathVariable String orderId) {

        return ResponseEntity.ok(
                orderService.getOrder(orderId)
        );
    }
}