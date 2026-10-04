package com.airtribe.trustdesk.controller;

import com.airtribe.trustdesk.entity.ToolAction;
import com.airtribe.trustdesk.service.ToolActionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
public class ToolActionController {

    private final ToolActionService toolActionService;

    public ToolActionController(ToolActionService toolActionService) {
        this.toolActionService = toolActionService;
    }

    @GetMapping
    public ResponseEntity<List<ToolAction>> getAllTools() {
        return ResponseEntity.ok(
                toolActionService.getAllTools()
        );
    }

    @GetMapping("/{toolName}")
    public ResponseEntity<ToolAction> getTool(
            @PathVariable String toolName) {

        return ResponseEntity.ok(
                toolActionService.getTool(toolName)
        );
    }
}