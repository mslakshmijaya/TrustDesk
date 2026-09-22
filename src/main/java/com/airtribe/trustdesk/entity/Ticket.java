package com.airtribe.trustdesk.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @Column(name = "ticket_id")
    @JsonProperty("ticket_id")
    private String ticketId;

    @Column(name = "customer_id", nullable = false)
    @JsonProperty("customer_id")
    private String customerId;

    @Column(name = "order_id")
    @JsonProperty("order_id")
    private String orderId;

    private String channel;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String body;

    @Column(name = "created_at")
    @JsonProperty("created_at")
    private OffsetDateTime createdAt;

    private String status;

    // No-argument constructor required by JPA
    public Ticket() {
    }

    // Constructor with all fields
    public Ticket(
            String ticketId,
            String customerId,
            String orderId,
            String channel,
            String subject,
            String body,
            OffsetDateTime createdAt,
            String status) {

        this.ticketId = ticketId;
        this.customerId = customerId;
        this.orderId = orderId;
        this.channel = channel;
        this.subject = subject;
        this.body = body;
        this.createdAt = createdAt;
        this.status = status;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}