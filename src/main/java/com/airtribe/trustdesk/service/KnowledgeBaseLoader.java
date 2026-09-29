package com.airtribe.trustdesk.service;

import com.airtribe.trustdesk.dto.KnowledgeBaseDocumentDTO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.List;

@Service
public class KnowledgeBaseLoader implements CommandLineRunner {

    private final RagService ragService;
    private final ObjectMapper objectMapper;

    public KnowledgeBaseLoader(
            RagService ragService,
            ObjectMapper objectMapper) {

        this.ragService = ragService;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {

        ClassPathResource resource =
                new ClassPathResource(
                        "knowledge_base.json"
                );

        if (!resource.exists()) {
            System.out.println(
                    "Knowledge base file not found."
            );
            return;
        }

        try (InputStream inputStream =
                     resource.getInputStream()) {

            List<KnowledgeBaseDocumentDTO> documents =
                    objectMapper.readValue(
                            inputStream,
                            new TypeReference<
                                    List<KnowledgeBaseDocumentDTO>>() {}
                    );

            for (KnowledgeBaseDocumentDTO document : documents) {

                ragService.addKnowledgeDocument(document);

                System.out.println(
                        "Indexed KB document: "
                                + document.getId()
                );
            }

            System.out.println(
                    "Knowledge base indexing completed. Total: "
                            + documents.size()
            );
        }
    }
}