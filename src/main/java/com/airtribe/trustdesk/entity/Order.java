package com.airtribe.trustdesk.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @Column(name = "order_id")
    @JsonProperty("order_id")
    private String orderId;

    @Column(name = "customer_id", nullable = false)
    @JsonProperty("customer_id")
    private String customerId;

    private String status;

    @Column(name = "placed_at")
    @JsonProperty("placed_at")
    private LocalDate placedAt;

    @Column(name = "delivered_at")
    @JsonProperty("delivered_at")
    private LocalDate deliveredAt;

    @Column(name = "eligible_return_until")
    @JsonProperty("eligible_return_until")
    private LocalDate eligibleReturnUntil;

    private Double total;

    private String currency;

    @Column(name = "payment_status")
    @JsonProperty("payment_status")
    private String paymentStatus;

    @Column(name = "tracking_number")
    @JsonProperty("tracking_number")
    private String trackingNumber;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    // No-argument constructor required by JPA
    public Order() {
    }

    // Constructor with all fields
    public Order(
            String orderId,
            String customerId,
            String status,
            LocalDate placedAt,
            LocalDate deliveredAt,
            LocalDate eligibleReturnUntil,
            Double total,
            String currency,
            String paymentStatus,
            String trackingNumber,
            List<OrderItem> items) {

        this.orderId = orderId;
        this.customerId = customerId;
        this.status = status;
        this.placedAt = placedAt;
        this.deliveredAt = deliveredAt;
        this.eligibleReturnUntil = eligibleReturnUntil;
        this.total = total;
        this.currency = currency;
        this.paymentStatus = paymentStatus;
        this.trackingNumber = trackingNumber;
        this.items = items;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getPlacedAt() {
        return placedAt;
    }

    public void setPlacedAt(LocalDate placedAt) {
        this.placedAt = placedAt;
    }

    public LocalDate getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(LocalDate deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public LocalDate getEligibleReturnUntil() {
        return eligibleReturnUntil;
    }

    public void setEligibleReturnUntil(LocalDate eligibleReturnUntil) {
        this.eligibleReturnUntil = eligibleReturnUntil;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}