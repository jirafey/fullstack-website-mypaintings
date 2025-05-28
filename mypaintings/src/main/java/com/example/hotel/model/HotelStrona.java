package com.example.hotel.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "hotel_strony")
public class HotelStrona {
    
    @Id
    private Long hotelId;
    
    @Column(nullable = false)
    private String websiteUrl;
    
    @Column(nullable = false)
    private OffsetDateTime dataAktualizacji;
    
    // Gettery i settery
    public Long getHotelId() {
        return hotelId;
    }
    
    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }
    
    public String getWebsiteUrl() {
        return websiteUrl;
    }
    
    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
    
    public OffsetDateTime getDataAktualizacji() {
        return dataAktualizacji;
    }
    
    public void setDataAktualizacji(OffsetDateTime dataAktualizacji) {
        this.dataAktualizacji = dataAktualizacji;
    }
}