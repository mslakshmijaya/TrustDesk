package com.airtribe.trustdesk.repository;

import com.airtribe.trustdesk.entity.ActionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActionRequestRepository
        extends JpaRepository<ActionRequest, Long> {

    List<ActionRequest> findByStatus(String status);

    Optional<ActionRequest>
    findByIdempotencyKey(String idempotencyKey);

    boolean existsByIdempotencyKey(String idempotencyKey);
}