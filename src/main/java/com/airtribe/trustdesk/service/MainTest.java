package com.airtribe.trustdesk.service;

import com.airtribe.trustdesk.entity.Customer;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.List;

public class MainTest {

    public static void main(String[] args) throws Exception {

        // 1. Initialize Jackson's ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Register module to support Java 8 LocalDate parsing ("2024-05-14")
        //objectMapper.registerModule(new JavaTimeModule());

        // 2. Read from src/main/resources/data/customers.json using ClassLoader
        try (InputStream inputStream = MainTest.class.getClassLoader().getResourceAsStream("data/customers.json")) {

            if (inputStream == null) {
                System.err.println("File not found in classpath: data/customers.json");
                return;
            }

            // 3. Deserialize JSON array to List<Customer>
            List<Customer> customers = objectMapper.readValue(
                    inputStream,
                    new TypeReference<List<Customer>>() {}
            );

            // Print output to verify
            System.out.println("Successfully parsed " + customers.size() + " customers:");
            for (Customer customer : customers) {
                System.out.println(customer.getName() + " | Tags: " + customer.getTags());
            }
        }
    }
}