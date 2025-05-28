package com.example.artysta.service;

import com.example.artysta.model.Dzielo;
import com.example.model.RequestArtystaDzielo;
import com.example.model.ResponseArtystaDzielo;
import com.example.artysta.repository.DzieloRepository;
import com.example.model.ResponseArtystaMojedziela;
import com.example.model.ResponseArtystaMojedzielaDziela;
import com.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtystaService {

    @Autowired
    private DzieloRepository dzieloRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public ResponseArtystaDzielo dodajDzielo(String token, RequestArtystaDzielo request) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        // Pobierz ID artysty z tokena JWT
        Long artystaId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Konwersja RequestArtystaDzielo na encję Dzielo
        Dzielo dzielo = new Dzielo();
        dzielo.setTitle(request.getTitle());
        dzielo.setDimensions(request.getDimensions());
        dzielo.setPrice(request.getPrice());
        dzielo.setCategory(request.getCategory());
        dzielo.setMedium(request.getMedium());
        dzielo.setStyle(request.getStyle());
        dzielo.setDateCreated(request.getDate().atStartOfDay()); // Konwersja LocalDate na LocalDateTime
        dzielo.setDescription(request.getDescription());
        dzielo.setArtystaId(artystaId);
        dzielo.setHotel(""); // Domyślna wartość
        dzielo.setViewers(0); // Domyślna wartość
        dzielo.setLikes(0); // Domyślna wartość

        // Zapisz do bazy danych
        Dzielo savedDzielo = dzieloRepository.save(dzielo);

        // Konwersja na ResponseArtystaDzielo
        ResponseArtystaDzielo response = new ResponseArtystaDzielo();
        response.setId(savedDzielo.getId());
        response.setTitle(savedDzielo.getTitle());
        response.setDimensions(savedDzielo.getDimensions());
        response.setPrice(savedDzielo.getPrice());
        response.setCategory(savedDzielo.getCategory());
        response.setMedium(savedDzielo.getMedium());
        response.setStyle(savedDzielo.getStyle());
        response.setDate(savedDzielo.getDateCreated().toLocalDate()); // Konwersja LocalDateTime na LocalDate
        response.setDescription(savedDzielo.getDescription());

        return response;
    }

    public ResponseArtystaMojedziela getMojeDziela(String token) {
        String jwt = token.substring(7);
        Long artystaId = jwtTokenProvider.getUserIdFromToken(jwt);

        List<Dzielo> dziela = dzieloRepository.findByArtystaId(artystaId);

        ResponseArtystaMojedziela response = new ResponseArtystaMojedziela();
        response.setDziela(dziela.stream()
                .map(this::mapToResponseDzielo)
                .collect(Collectors.toList()));

        return response;
    }

    private ResponseArtystaMojedzielaDziela mapToResponseDzielo(Dzielo dzielo) {
        ResponseArtystaMojedzielaDziela responseDzielo = new ResponseArtystaMojedzielaDziela();
        responseDzielo.setId(dzielo.getId());
        responseDzielo.setDateOfPost(dzielo.getDateCreated().toLocalDate());
        responseDzielo.setPrice("$" + dzielo.getPrice());
        responseDzielo.setHotel(dzielo.getHotel() != null ? dzielo.getHotel() : "");
        responseDzielo.setViewers(dzielo.getViewers() != null ? dzielo.getViewers() : 0);
        responseDzielo.setLikes(dzielo.getLikes() != null ? dzielo.getLikes() : 0);
        responseDzielo.setImageUrl("");

        return responseDzielo;
    }
}