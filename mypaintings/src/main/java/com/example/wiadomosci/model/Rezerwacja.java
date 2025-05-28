package com.example.wiadomosci.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.OffsetDateTime;

@Entity
@Table(name = "rezerwacje")
@Data
public class Rezerwacja {
    
    public enum Status {
        RESERVE_REQUESTED,
        ACCEPTED,
        REFUSED,
        CANCELLED,
        DELIVERY_REQUESTED,
        DELIVERY_ACCEPTED,
        FINISHED
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "obraz_id", nullable = false)
    private Integer obrazId;
    
    @Column(name = "uzytkownik_id", nullable = false)
    private Long uzytkownikId;
    
    @Column(nullable = false)
    private String status;
    
    @Column(nullable = false)
    private OffsetDateTime dataUtworzenia;
    
    @Column
    private OffsetDateTime dataModyfikacji;
    
    // Metoda pomocnicza do sprawdzania, czy obraz można zarezerwować
    public static boolean isStatusAllowingNewReservation(String status) {
        return status == null || 
               Status.RESERVE_REQUESTED.name().equals(status) || 
               Status.REFUSED.name().equals(status) || 
               Status.CANCELLED.name().equals(status);
    }
}