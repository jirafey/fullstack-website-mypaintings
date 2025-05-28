package com.example.hotel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "follows")
public class Follow {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long hotelId;
    private Long artystaId;
    
    public Follow() {
    }
    
    public Follow(Long hotelId, Long artystaId) {
        this.hotelId = hotelId;
        this.artystaId = artystaId;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getHotelId() {
        return hotelId;
    }
    
    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }
    
    public Long getArtystaId() {
        return artystaId;
    }
    
    public void setArtystaId(Long artystaId) {
        this.artystaId = artystaId;
    }
}