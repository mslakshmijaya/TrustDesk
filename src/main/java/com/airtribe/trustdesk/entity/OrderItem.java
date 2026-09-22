package com.airtribe.trustdesk.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;

    private String name;

    private Integer quantity;

    private String category;

    @Column(name = "final_sale")
    @JsonProperty("final_sale")
    private Boolean finalSale;

    // No-argument constructor required by JPA
    public OrderItem() {
    }

    // Constructor with all fields
    public OrderItem(
            String sku,
            String name,
            Integer quantity,
            String category,
            Boolean finalSale) {

        this.sku = sku;
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.finalSale = finalSale;
    }

    public Long getId() {
        return id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getFinalSale() {
        return finalSale;
    }

    public void setFinalSale(Boolean finalSale) {
        this.finalSale = finalSale;
    }
}