package com.example.ogolne.service;

import com.example.model.RequestOgolneSupportTicket;
import com.example.model.ResponseOgolneSupportTicket;
import com.example.ogolne.model.SupportTicket;
import com.example.ogolne.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    public ResponseOgolneSupportTicket createSupportTicket(RequestOgolneSupportTicket request) {
        // Konwersja z obiektu żądania na encję
        SupportTicket ticket = new SupportTicket();
        ticket.setImieINazwisko(request.getImieINazwisko());
        ticket.setEmail(request.getEmail());
        ticket.setTemat(request.getTemat());
        ticket.setWiadomosc(request.getWiadomosc());
        
        // Zapisanie do bazy danych
        supportTicketRepository.save(ticket);
        
        // Przygotowanie odpowiedzi
        ResponseOgolneSupportTicket response = new ResponseOgolneSupportTicket();
        response.setStatus("success");
        response.setMessage("Ticket został przyjęty do realizacji.");
        
        return response;
    }
}