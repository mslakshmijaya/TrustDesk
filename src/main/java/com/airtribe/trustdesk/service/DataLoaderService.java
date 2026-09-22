package com.airtribe.trustdesk.service;

import com.airtribe.trustdesk.entity.Customer;
import com.airtribe.trustdesk.entity.Order;
import com.airtribe.trustdesk.entity.Ticket;
import com.airtribe.trustdesk.entity.ToolAction;
import com.airtribe.trustdesk.repository.CustomerRepository;
import com.airtribe.trustdesk.repository.OrderRepository;
import com.airtribe.trustdesk.repository.TicketRepository;
import com.airtribe.trustdesk.repository.ToolActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.File;
import java.util.List;

@Component
public class DataLoaderService implements CommandLineRunner {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;
    private final ToolActionRepository toolActionRepository;
    private final ObjectMapper objectMapper;

    public DataLoaderService(
            CustomerRepository customerRepository,
            OrderRepository orderRepository,
            TicketRepository ticketRepository,
            ToolActionRepository toolActionRepository,
            ObjectMapper objectMapper) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
        this.toolActionRepository = toolActionRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        loadCustomers();
        loadOrders();
        loadToolActions();
        loadTickets();

    }
    private void loadCustomers() throws Exception {
        if (customerRepository.count() > 0) {
            System.out.println("Customers already exist. Skipping seeding.");
            return;
        }

        List<Customer> customers = readJson(
                "data/customers.json",
                new TypeReference<List<Customer>>() {}
        );
        customerRepository.saveAll(customers);

        System.out.println(
                "Customers loaded: " + customers.size()
        );
    }
    private void loadOrders() throws Exception {
        if (orderRepository.count() > 0) {
            System.out.println("orders already exist. Skipping seeding.");
            return;
        }

        List<Order> orders = readJson(
                "data/orders.json",
                new TypeReference<List<Order>>() {}
        );
        orderRepository.saveAll(orders);

        System.out.println(
                "orders loaded: " + orders.size()
        );
    }
    private void loadTickets() throws Exception {
        if (ticketRepository.count() > 0) {
            System.out.println("tickets already exist. Skipping seeding.");
            return;
        }

        List<Ticket> tickets = readJson(
                "data/tickets.json",
                new TypeReference<List<Ticket>>() {}
        );
        ticketRepository.saveAll(tickets);

        System.out.println(
                "tickets loaded: " + tickets.size()
        );
    }
    private void loadToolActions() throws Exception {
        if (toolActionRepository.count() > 0) {
            System.out.println("toolActions already exist. Skipping seeding.");
            return;
        }

        List<ToolAction> toolActions = readJson(
                "data/tool_actions.json",
                new TypeReference<List<ToolAction>>() {}
        );
        toolActionRepository.saveAll(toolActions);

        System.out.println(
                "toolActions loaded: " + toolActions.size()
        );
    }
    private <T> List<T> readJson(
            String filePath,
            TypeReference<List<T>> typeReference
    ) throws Exception {

        File file = new File(filePath);

        if (!file.exists()) {
            throw new IllegalArgumentException(
                    "JSON file not found: " + file.getAbsolutePath()
            );
        }

        System.out.println(
                "Reading JSON file: " + file.getAbsolutePath()
        );

        return objectMapper.readValue(file, typeReference);
    }

}

