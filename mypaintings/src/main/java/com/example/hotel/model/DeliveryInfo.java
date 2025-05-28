package com.example.hotel.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "delivery_info")
public class DeliveryInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "painting_id")
    private Integer paintingId;

    @Column(name = "paid_on")
    private LocalDate paidOn;

    private String buyer;
    private String dimensions;

    @Embedded
    private ShippingAdress shipTo;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getPaintingId() { return paintingId; }
    public void setPaintingId(Integer paintingId) { this.paintingId = paintingId; }
    public LocalDate getPaidOn() { return paidOn; }
    public void setPaidOn(LocalDate paidOn) { this.paidOn = paidOn; }
    public String getBuyer() { return buyer; }
    public void setBuyer(String buyer) { this.buyer = buyer; }
    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }
    public ShippingAdress getShipTo() { return shipTo; }
    public void setShipTo(ShippingAdress shipTo) { this.shipTo = shipTo; }
}

