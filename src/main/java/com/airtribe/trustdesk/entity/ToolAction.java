package com.airtribe.trustdesk.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tool_actions")
public class ToolAction {

    @Id
    @Column(name = "tool_name")
    @JsonProperty("tool_name")
    private String toolName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "risk_level")
    @JsonProperty("risk_level")
    private String riskLevel;

    @Column(name = "requires_human_approval")
    @JsonProperty("requires_human_approval")
    private Boolean requiresHumanApproval;

    @ElementCollection
    @CollectionTable(
            name = "tool_allowed_categories",
            joinColumns = @JoinColumn(name = "tool_name")
    )
    @Column(name = "category")
    @JsonProperty("allowed_categories")
    private List<String> allowedCategories;

    @ElementCollection
    @CollectionTable(
            name = "tool_required_fields",
            joinColumns = @JoinColumn(name = "tool_name")
    )
    @Column(name = "field_name")
    @JsonProperty("required_fields")
    private List<String> requiredFields;

    @Column(name = "max_amount_inr")
    @JsonProperty("max_amount_inr")
    private Double maxAmountInr;

    // No-argument constructor required by JPA
    public ToolAction() {
    }

    // Constructor with all fields
    public ToolAction(
            String toolName,
            String description,
            String riskLevel,
            Boolean requiresHumanApproval,
            List<String> allowedCategories,
            List<String> requiredFields,
            Double maxAmountInr) {

        this.toolName = toolName;
        this.description = description;
        this.riskLevel = riskLevel;
        this.requiresHumanApproval = requiresHumanApproval;
        this.allowedCategories = allowedCategories;
        this.requiredFields = requiredFields;
        this.maxAmountInr = maxAmountInr;
    }

    public String getToolName() {
        return toolName;
    }

    public void setToolName(String toolName) {
        this.toolName = toolName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public Boolean getRequiresHumanApproval() {
        return requiresHumanApproval;
    }

    public void setRequiresHumanApproval(Boolean requiresHumanApproval) {
        this.requiresHumanApproval = requiresHumanApproval;
    }

    public List<String> getAllowedCategories() {
        return allowedCategories;
    }

    public void setAllowedCategories(List<String> allowedCategories) {
        this.allowedCategories = allowedCategories;
    }

    public List<String> getRequiredFields() {
        return requiredFields;
    }

    public void setRequiredFields(List<String> requiredFields) {
        this.requiredFields = requiredFields;
    }

    public Double getMaxAmountInr() {
        return maxAmountInr;
    }

    public void setMaxAmountInr(Double maxAmountInr) {
        this.maxAmountInr = maxAmountInr;
    }
}