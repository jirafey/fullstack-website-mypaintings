package com.example.wiadomosci.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "wiadomosci")
public class Wiadomosc {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private Long senderId;
    
    @Column(nullable = false)
    private Integer recipientId;
    
    @Column(nullable = false, length = 1000)
    private String content;
    
    @Column(nullable = false)
    private OffsetDateTime timestamp;
    
    @Column(nullable = false)
    private String status;
    
    // Gettery i settery
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Long getSenderId() {
        return senderId;
    }
    
    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }
    
    public Integer getRecipientId() {
        return recipientId;
    }
    
    public void setRecipientId(Integer recipientId) {
        this.recipientId = recipientId;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public OffsetDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}