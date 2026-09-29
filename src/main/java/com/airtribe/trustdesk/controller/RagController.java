package com.airtribe.trustdesk.controller;

import com.airtribe.trustdesk.service.RagService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rag")
public class RagController {

    private final RagService ragService;

    public RagController(RagService ragService) {
        this.ragService = ragService;
    }

    @PostMapping("/ask")
    public RagService.RagResponse ask(
            @RequestBody RagRequest request) {

        return ragService.ask(request.question());
    }

    public record RagRequest(String question) {
    }
}