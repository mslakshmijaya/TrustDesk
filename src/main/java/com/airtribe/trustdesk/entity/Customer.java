package com.airtribe.trustdesk.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @Column(name = "customer_id")
    @JsonProperty("customer_id") // Fixes the null primary key error
    private String customerId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String tier;

    private String country;

    @Column(name = "created_at")
    private LocalDate createdAt;

    private Boolean verified;

    @ElementCollection
    @CollectionTable(
            name = "customer_tags",
            joinColumns = @JoinColumn(name = "customer_id")
    )
    @Column(name = "tag")
    private List<String> tags;

    // No-argument constructor required by JPA
    public Customer() {
    }

    // Constructor with all fields
    public Customer(
            String customerId,
            String name,
            String email,
            String tier,
            String country,
            LocalDate createdAt,
            Boolean verified,
            List<String> tags) {

        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.tier = tier;
        this.country = country;
        this.createdAt = createdAt;
        this.verified = verified;
        this.tags = tags;
    }

    // Getters and Setters

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTier() {
        return tier;
    }

    public void setTier(String tier) {
        this.tier = tier;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

}