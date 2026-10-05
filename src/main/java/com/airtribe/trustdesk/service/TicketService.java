package com.airtribe.trustdesk.service;

import com.airtribe.trustdesk.dto.TicketContextResponse;
import com.airtribe.trustdesk.entity.Customer;
import com.airtribe.trustdesk.entity.Order;
import com.airtribe.trustdesk.entity.Ticket;
import com.airtribe.trustdesk.repository.CustomerRepository;
import com.airtribe.trustdesk.repository.OrderRepository;
import com.airtribe.trustdesk.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    public TicketService(
            TicketRepository ticketRepository,
            CustomerRepository customerRepository,
            OrderRepository orderRepository) {

        this.ticketRepository = ticketRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    public Ticket createTicket(Ticket ticket) {

        if (ticket.getCustomerId() == null || ticket.getCustomerId().isBlank()) {
            throw new IllegalArgumentException("Customer ID is required");
        }

        if (ticket.getSubject() == null || ticket.getSubject().isBlank()) {
            throw new IllegalArgumentException("Subject is required");
        }

        if (ticket.getBody() == null || ticket.getBody().isBlank()) {
            throw new IllegalArgumentException("Ticket message is required");
        }

        if (!customerRepository.existsById(ticket.getCustomerId())) {
            throw new IllegalArgumentException(
                    "Customer not found: " + ticket.getCustomerId()
            );
        }

        if (ticket.getOrderId() != null && !ticket.getOrderId().isBlank()) {
            if (!orderRepository.existsById(ticket.getOrderId())) {
                throw new IllegalArgumentException(
                        "Order not found: " + ticket.getOrderId()
                );
            }
        }

        ticket.setTicketId(generateTicketId());

        ticket.setCreatedAt(java.time.OffsetDateTime.now());

        ticket.setStatus("open");

        return ticketRepository.save(ticket);
    }
    public TicketContextResponse getTicketContext(String ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found: " + ticketId));

        Customer customer = customerRepository
                .findById(ticket.getCustomerId())
                .orElse(null);

        Order order = null;

        if (ticket.getOrderId() != null) {
            order = orderRepository
                    .findById(ticket.getOrderId())
                    .orElse(null);
        }

        return new TicketContextResponse(
                ticket,
                customer,
                order
        );
    }
    private String generateTicketId() {

        String highestTicketId = ticketRepository.findHighestTicketId();

        if (highestTicketId == null) {
            return "tkt_9001";
        }

        String numberPart = highestTicketId.substring(4);

        long nextNumber = Long.parseLong(numberPart) + 1;

        return "tkt_" + nextNumber;
    }
}