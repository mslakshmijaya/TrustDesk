package com.airtribe.trustdesk.controller;

import com.airtribe.trustdesk.entity.Customer;
import com.airtribe.trustdesk.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(
                customerService.getAllCustomers()
        );
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> getCustomer(
            @PathVariable String customerId) {

        return ResponseEntity.ok(
                customerService.getCustomer(customerId)
        );
    }
}