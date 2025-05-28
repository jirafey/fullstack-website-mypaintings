package com.example.hotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "obraz_like")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ObrazLike {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "id_hotelu")
    private Long idHotelu;
    
    @Column(name = "id_obrazu")
    private Long idObrazu;
    
    public ObrazLike(Long idHotelu, Long idObrazu) {
        this.idHotelu = idHotelu;
        this.idObrazu = idObrazu;
    }
}