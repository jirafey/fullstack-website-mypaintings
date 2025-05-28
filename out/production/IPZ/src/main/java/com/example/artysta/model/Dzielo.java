package com.example.artysta.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "dziela")
public class Dzielo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "artysta_id")
    private Long artystaId;

    private String title;
    private String dimensions;
    private BigDecimal price;
    private String category;
    private String medium;
    private String style;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    private String description;
    private String hotel;
    private Integer viewers;
    private Integer likes;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Long getArtystaId() { return artystaId; }
    public void setArtystaId(Long artystaId) { this.artystaId = artystaId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getMedium() { return medium; }
    public void setMedium(String medium) { this.medium = medium; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    public LocalDateTime getDateCreated() { return dateCreated; }
    public void setDateCreated(LocalDateTime dateCreated) { this.dateCreated = dateCreated; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getHotel() { return hotel; }
    public void setHotel(String hotel) { this.hotel = hotel; }
    public Integer getViewers() { return viewers; }
    public void setViewers(Integer viewers) { this.viewers = viewers; }
    public Integer getLikes() { return likes; }
    public void setLikes(Integer likes) { this.likes = likes; }


}