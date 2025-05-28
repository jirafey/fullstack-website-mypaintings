package com.example.ogolne.repository;

import com.example.ogolne.model.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    // Tutaj możesz dodać niestandardowe metody zapytań, jeśli są potrzebne
}