package com.airtribe.trustdesk.repository;

import com.airtribe.trustdesk.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {

    @Query("""
        SELECT MAX(t.ticketId)
        FROM Ticket t
        WHERE t.ticketId LIKE 'tkt_%'
    """)
    String findHighestTicketId();
}