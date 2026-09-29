package com.airtribe.trustdesk.dto;

import java.util.List;

public class TriageResponse {

    private String ticketId;
    private String category;
    private String priority;
    private String reasoning;
    private String draftReply;
    private List<String> citations;
    private List<String> recommendedActions;
    private boolean escalationRequired;

    public TriageResponse() {
    }

    public TriageResponse(
            String ticketId,
            String category,
            String priority,
            String reasoning,
            String draftReply,
            List<String> citations,
            List<String> recommendedActions,
            boolean escalationRequired) {

        this.ticketId = ticketId;
        this.category = category;
        this.priority = priority;
        this.reasoning = reasoning;
        this.draftReply = draftReply;
        this.citations = citations;
        this.recommendedActions = recommendedActions;
        this.escalationRequired = escalationRequired;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getReasoning() {
        return reasoning;
    }

    public void setReasoning(String reasoning) {
        this.reasoning = reasoning;
    }

    public String getDraftReply() {
        return draftReply;
    }

    public void setDraftReply(String draftReply) {
        this.draftReply = draftReply;
    }

    public List<String> getCitations() {
        return citations;
    }

    public void setCitations(List<String> citations) {
        this.citations = citations;
    }

    public List<String> getRecommendedActions() {
        return recommendedActions;
    }

    public void setRecommendedActions(List<String> recommendedActions) {
        this.recommendedActions = recommendedActions;
    }

    public boolean isEscalationRequired() {
        return escalationRequired;
    }

    public void setEscalationRequired(boolean escalationRequired) {
        this.escalationRequired = escalationRequired;
    }
}