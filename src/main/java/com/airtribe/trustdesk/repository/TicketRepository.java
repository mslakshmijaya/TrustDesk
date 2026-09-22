package com.airtribe.trustdesk.repository;

import com.airtribe.trustdesk.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, String> {
}
