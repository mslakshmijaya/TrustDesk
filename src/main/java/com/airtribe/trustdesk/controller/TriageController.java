package com.airtribe.trustdesk.controller;

import com.airtribe.trustdesk.dto.TriageResponse;
import com.airtribe.trustdesk.service.TriageService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TriageController {

    private final TriageService triageService;

    public TriageController(TriageService triageService) {
        this.triageService = triageService;
    }

    @PostMapping("/{ticketId}/triage")
    public TriageResponse triageTicket(
            @PathVariable String ticketId) {

        return triageService.triageTicket(ticketId);
    }
}