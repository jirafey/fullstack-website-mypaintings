package com.example.hotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "wlasnosc_hotelu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WlasnoscHotelu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "obraz_id", nullable = false)
    private Long obrazId;
    
    @Column(name = "taken_on")
    private LocalDate takenOn;

    @Column(nullable = false)
    private Long artystaId;

    @Column(nullable = false)
    private Long hotelId;

    @Column(nullable = false)
    private String status;

    @Column(name = "sold_on")
    private LocalDate soldOn;


}