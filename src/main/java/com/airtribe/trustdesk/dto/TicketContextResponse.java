package com.airtribe.trustdesk.dto;

import com.airtribe.trustdesk.entity.Customer;
import com.airtribe.trustdesk.entity.Order;
import com.airtribe.trustdesk.entity.Ticket;

public class TicketContextResponse {

    private Ticket ticket;

    private Customer customer;

    private Order order;

    public TicketContextResponse() {
    }

    public TicketContextResponse(
            Ticket ticket,
            Customer customer,
            Order order) {

        this.ticket = ticket;
        this.customer = customer;
        this.order = order;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}