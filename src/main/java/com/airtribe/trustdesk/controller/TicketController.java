package com.airtribe.trustdesk.controller;

import com.airtribe.trustdesk.dto.TicketContextResponse;
import com.airtribe.trustdesk.entity.Ticket;
import com.airtribe.trustdesk.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // GET /api/tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }
    @PostMapping
    public ResponseEntity<Ticket> createTicket(
            @RequestBody Ticket ticket) {

        Ticket savedTicket = ticketService.createTicket(ticket);

        return ResponseEntity.ok(savedTicket);
    }
    // GET /api/tickets/{ticketId}
    @GetMapping("/{ticketId}")
    public ResponseEntity<TicketContextResponse> getTicket(
            @PathVariable String ticketId) {

        try {

            TicketContextResponse response =
                    ticketService.getTicketContext(ticketId);

            return ResponseEntity.ok(response);

        } catch (RuntimeException exception) {

            return ResponseEntity.notFound().build();
        }
    }
}