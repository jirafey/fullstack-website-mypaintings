package com.example.ogolne.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "support_tickets")
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "imie_i_nazwisko", nullable = false)
    private String imieINazwisko;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String temat;

    @Column(nullable = false, length = 1000)
    private String wiadomosc;

    @Column(name = "data_utworzenia")
    private LocalDateTime dataUtworzenia = LocalDateTime.now();

    @Column(name = "status")
    private String status = "nowy";

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImieINazwisko() {
        return imieINazwisko;
    }

    public void setImieINazwisko(String imieINazwisko) {
        this.imieINazwisko = imieINazwisko;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTemat() {
        return temat;
    }

    public void setTemat(String temat) {
        this.temat = temat;
    }

    public String getWiadomosc() {
        return wiadomosc;
    }

    public void setWiadomosc(String wiadomosc) {
        this.wiadomosc = wiadomosc;
    }

    public LocalDateTime getDataUtworzenia() {
        return dataUtworzenia;
    }

    public void setDataUtworzenia(LocalDateTime dataUtworzenia) {
        this.dataUtworzenia = dataUtworzenia;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}