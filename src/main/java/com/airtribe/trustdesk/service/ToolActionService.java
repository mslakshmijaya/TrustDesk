package com.airtribe.trustdesk.service;

import com.airtribe.trustdesk.entity.ToolAction;
import com.airtribe.trustdesk.repository.ToolActionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolActionService {

    private final ToolActionRepository toolActionRepository;

    public ToolActionService(ToolActionRepository toolActionRepository) {
        this.toolActionRepository = toolActionRepository;
    }

    public List<ToolAction> getAllTools() {
        return toolActionRepository.findAll();
    }

    public ToolAction getTool(String toolName) {
        return toolActionRepository.findById(toolName)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Tool not found: " + toolName));
    }
}