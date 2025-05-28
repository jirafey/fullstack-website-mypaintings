package com.example.artysta.service;

import com.example.artysta.model.Dzielo;
import com.example.artysta.repository.DzieloRepository;
import com.example.hotel.model.HotelStrona;
import com.example.hotel.model.WlasnoscHotelu;
import com.example.hotel.repository.HotelStronaRepository;
import com.example.hotel.repository.WlasnoscHoteluRepository;
import com.example.model.*;
import com.example.security.JwtTokenProvider;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArtystaService {

    @Autowired
    private DzieloRepository dzieloRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // Pobierz dane o stronie hotelu
    @Autowired
    HotelStronaRepository hotelStronaRepository;

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

    public ResponseEntity<ResponseArtystaDzieloDelete> usunDzielo(String token, Integer dzieloId) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        // Pobierz ID artysty z tokena JWT
        Long artystaId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Sprawdź czy dzieło istnieje
        Optional<Dzielo> optionalDzielo = dzieloRepository.findById(dzieloId);
        if (optionalDzielo.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Dzielo dzielo = optionalDzielo.get();

        // Sprawdź czy artysta jest właścicielem dzieła
        if (!dzielo.getArtystaId().equals(artystaId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Usuń dzieło
        dzieloRepository.delete(dzielo);

        // Przygotuj odpowiedź
        ResponseArtystaDzieloDelete response = new ResponseArtystaDzieloDelete();
        response.setMessage("Dzieło zostało pomyślnie usunięte.");
        response.setDeletedImageId(dzieloId);

        return ResponseEntity.ok(response);
    }




    public ResponseEntity<ResponseArtystaStronahotelu> getStronaHotelu(Integer idHotelu) {
        try {

            Optional<HotelStrona> optionalHotelStrona = hotelStronaRepository.findByHotelId(idHotelu.longValue());

            if (optionalHotelStrona.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            HotelStrona hotelStrona = optionalHotelStrona.get();

            // Przygotuj odpowiedź
            ResponseArtystaStronahotelu response = new ResponseArtystaStronahotelu();
            response.setWebsiteUrl(hotelStrona.getWebsiteUrl());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Autowired
    WlasnoscHoteluRepository wlasnoscHoteluRepository;

    public ResponseArtystaSales getSales(String token) {
        // Extract artist ID from JWT token
        String jwt = token.substring(7);
        Long artystaId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Get all sold artworks for this artist
        List<WlasnoscHotelu> soldArtworks = wlasnoscHoteluRepository.findAllByArtystaIdAndStatus(artystaId, "SOLD");

        // Convert to response format
        ResponseArtystaSales response = new ResponseArtystaSales();

        if (soldArtworks != null) {
            List<ResponseArtystaSalesSales> salesList = soldArtworks.stream()
                    .map(wlasnosc -> {
                        // Pobierz pełne dane dzieła z repozytorium
                        Optional<Dzielo> dzieloOpt = dzieloRepository.findById(wlasnosc.getObrazId().intValue());
                        if (dzieloOpt.isEmpty()) {
                            return null;
                        }

                        Dzielo dzielo = dzieloOpt.get();
                        ResponseArtystaSalesSales sale = new ResponseArtystaSalesSales();

                        // Ustaw datę sprzedaży z WlasnoscHotelu
                        sale.setSoldOn(wlasnosc.getSoldOn());

                        // Ustaw cenę z Dzielo (formatując jako string z $)
                        sale.setPrice("$" + dzielo.getPrice());

                        // Ustaw nazwę hotelu (możesz dodać prefiks @ jeśli potrzebne)
                        sale.setHotel(dzielo.getHotel() != null ? dzielo.getHotel() : "@UnknownHotel");

                        // Ustaw liczbę polubień z Dzielo
                        sale.setLikes(dzielo.getLikes() != null ? dzielo.getLikes() : 0);

                        // Ustaw URL obrazu (tutaj przykład - dostosuj do swojej implementacji)
                        sale.setImageUrl("/images/" + dzielo.getId());

                        return sale;
                    })
                    .filter(Objects::nonNull) // Filtruj null'e (gdy dzieło nie istnieje)
                    .collect(Collectors.toList());

            response.setSales(salesList);
        }

        return response;
    }



}