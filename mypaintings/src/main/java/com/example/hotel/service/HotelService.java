package com.example.hotel.service;

import com.example.api.HotelApi;
import com.example.artysta.model.Dzielo;
import com.example.artysta.repository.DzieloRepository;
import com.example.hotel.model.Follow;
import com.example.hotel.model.HotelStrona;
import com.example.hotel.model.WlasnoscHotelu;
import com.example.hotel.repository.FollowRepository;
import com.example.hotel.repository.HotelStronaRepository;
import com.example.hotel.repository.WlasnoscHoteluRepository;
import com.example.model.*;
import com.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelService implements HotelApi {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private HotelStronaRepository hotelStronaRepository;


    /**
     * Dodaje follow dla artysty
     * @param token JWT token w formacie "Bearer {token}"
     * @param artystaId ID artysty, któremu ma być dodany follow
     * @return Odpowiedź z informacją o dodaniu follow
     */
    @Transactional
    public ResponseEntity<ResponseHotelArtystaFollow> dodajFollow(String token, Integer artystaId) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID hotelu z tokena JWT
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);
            
            // Sprawdź czy follow już istnieje
            Optional<Follow> existingFollow = followRepository.findByHotelIdAndArtystaId(hotelId, artystaId.longValue());
            
            if (existingFollow.isPresent()) {
                // Follow już istnieje, zwróć odpowiednią odpowiedź
                ResponseHotelArtystaFollow response = new ResponseHotelArtystaFollow();
                response.setMessage("Follow już istnieje dla tego artysty.");
                return ResponseEntity.ok(response);
            }
            
            // Utwórz nowy follow
            Follow follow = new Follow(hotelId, artystaId.longValue());
            followRepository.save(follow);
            
            // Przygotuj odpowiedź
            ResponseHotelArtystaFollow response = new ResponseHotelArtystaFollow();
            response.setMessage("Follow został dodany.");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Usuwa follow dla artysty
     * @param token JWT token w formacie "Bearer {token}"
     * @param artystaId ID artysty, któremu ma być usunięty follow
     * @return Odpowiedź z informacją o usunięciu follow
     */
    @Transactional
    public ResponseEntity<ResponseHotelArtystaUnfollow> usunFollow(String token, Integer artystaId) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID hotelu z tokena JWT
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);
            
            // Sprawdź czy follow istnieje
            Optional<Follow> existingFollow = followRepository.findByHotelIdAndArtystaId(hotelId, artystaId.longValue());
            
            if (existingFollow.isEmpty()) {
                // Follow nie istnieje, zwróć odpowiednią odpowiedź
                ResponseHotelArtystaUnfollow response = new ResponseHotelArtystaUnfollow();
                response.setMessage("Follow nie istnieje dla tego artysty.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            // Usuń follow
            followRepository.delete(existingFollow.get());
            
            // Przygotuj odpowiedź
            ResponseHotelArtystaUnfollow response = new ResponseHotelArtystaUnfollow();
            response.setMessage("Follow został usunięty.");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseHotelFollowedartists getFollowedArtists(String token) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        // Pobierz ID hotelu z tokena JWT
        Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Pobierz listę obserwowanych artystów
        List<Follow> follows = followRepository.findByHotelId(hotelId);

        // Przygotuj odpowiedź
        ResponseHotelFollowedartists response = new ResponseHotelFollowedartists();

        // Mapuj obiekty Follow na ResponseHotelFollowedartistsArtists
        List<ResponseHotelFollowedartistsArtists> artists = follows.stream()
                .map(follow -> {
                    ResponseHotelFollowedartistsArtists artist = new ResponseHotelFollowedartistsArtists();
                    artist.setIdArtysty(follow.getArtystaId().intValue());
                    return artist;
                })
                .collect(Collectors.toList());

        response.setArtists(artists);

        return response;
    }




    public ResponseEntity<ResponseHotelStronahotelu> updateHotelWebsite(String token, RequestHotelStronahotelu request) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Walidacja URL - prosty przykład
            if (request.getWebsiteUrl() == null || !request.getWebsiteUrl().startsWith("http")) {
                ResponseHotelStronahotelu response = new ResponseHotelStronahotelu();
                response.setMessage("Nieprawidłowy URL strony");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Sprawdź czy hotel już ma zapisany URL
            Optional<HotelStrona> optionalHotelStrona = hotelStronaRepository.findByHotelId(userId);

            HotelStrona hotelStrona;
            if (optionalHotelStrona.isPresent()) {
                // Aktualizacja istniejącego rekordu
                hotelStrona = optionalHotelStrona.get();
                hotelStrona.setWebsiteUrl(request.getWebsiteUrl());
                hotelStrona.setDataAktualizacji(OffsetDateTime.now());
            } else {
                // Utworzenie nowego rekordu
                hotelStrona = new HotelStrona();
                hotelStrona.setHotelId(userId);
                hotelStrona.setWebsiteUrl(request.getWebsiteUrl());
                hotelStrona.setDataAktualizacji(OffsetDateTime.now());
            }

            // Zapisz rekord
            hotelStronaRepository.save(hotelStrona);

            // Przygotuj odpowiedź
            ResponseHotelStronahotelu response = new ResponseHotelStronahotelu();
            response.setMessage("Link do strony hotelu został zapisany.");
            response.setWebsiteUrl(hotelStrona.getWebsiteUrl());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            ResponseHotelStronahotelu response = new ResponseHotelStronahotelu();
            response.setMessage("Wystąpił błąd podczas zapisywania linku do strony hotelu.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @Autowired
    WlasnoscHoteluRepository wlasnoscHoteluRepository;

    @Transactional
    public ResponseEntity<ResponseHotelSell> oznaczJakoSprzedany(String token, Integer imageId) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID hotelu z tokena JWT
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź własność hotelu dla danego obrazu

            Optional<WlasnoscHotelu> optionalWlasnosc = wlasnoscHoteluRepository.findByObrazId(imageId.longValue());

            if (optionalWlasnosc.isEmpty()) {
                ResponseHotelSell response = new ResponseHotelSell();
                response.setMessage("Obraz o podanym ID nie został znaleziony w zasobach hotelu.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            WlasnoscHotelu wlasnosc = optionalWlasnosc.get();

            // Sprawdź czy obraz należy do hotelu
            if (!wlasnosc.getHotelId().equals(hotelId)) {
                ResponseHotelSell response = new ResponseHotelSell();
                response.setMessage("Obraz nie należy do tego hotelu.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Zaktualizuj status na "SOLD"
            wlasnosc.setStatus("SOLD");
            wlasnosc.setSoldOn(LocalDate.now());
            wlasnoscHoteluRepository.save(wlasnosc);

            // Przygotuj odpowiedź
            ResponseHotelSell response = new ResponseHotelSell();
            response.setMessage("Obraz został oznaczony jako sprzedany.");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ResponseHotelSell response = new ResponseHotelSell();
            response.setMessage("Wystąpił błąd podczas oznaczania obrazu jako sprzedany.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Autowired
    DzieloRepository dzieloRepository;

    public ResponseEntity<ResponseHotelStronaobrazu> getObrazDetails(Integer obrazId) {
        try {
            Optional<Dzielo> optionalDzielo = dzieloRepository.findById(obrazId);

            if (optionalDzielo.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Dzielo dzielo = optionalDzielo.get();

            // Przygotuj odpowiedź
            ResponseHotelStronaobrazu response = new ResponseHotelStronaobrazu();

            // Ustaw podstawowe informacje o dziele
            response.setTitle(dzielo.getTitle());
            response.setDimensions(dzielo.getDimensions());

            // Fix for price - either keep as BigDecimal or change response class
            response.setPrice(dzielo.getPrice() != null ? dzielo.getPrice() : BigDecimal.ZERO);

            response.setCategory(dzielo.getCategory());
            response.setMedium(dzielo.getMedium());
            response.setStyle(dzielo.getStyle());

            if (dzielo.getDateCreated() != null) {
                // Fix for date - convert LocalDateTime to LocalDate
                response.setDate(dzielo.getDateCreated().toLocalDate());
            }

            response.setDescription(dzielo.getDescription());
            response.setArtistId(dzielo.getArtystaId() != null ? dzielo.getArtystaId().intValue() : 0);

            // TODO: Pobierz dane artysty (nick i avatar) - wymagałoby dodatkowego repository
            response.setArtistNick("@artist_" + dzielo.getArtystaId());
            response.setArtistAvatarUrl("https://example.com/avatars/default.png");

            // TODO: Pobierz obrazy dla dzieła - wymagałoby dodatkowej encji i repository
            ResponseHotelStronaobrazuImages image = new ResponseHotelStronaobrazuImages();
            image.setUrl("https://example.com/images/" + dzielo.getId() + ".jpg");
            response.setImages(Collections.singletonList(image));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseEntity<ResponseHotelOwnedpaintings> getOwnedPaintings(String token) {
        try {
            // Pobierz ID hotelu z tokena
            String jwt = token.substring(7);
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź wszystkie własności hotelu
            List<WlasnoscHotelu> wlasnosci = wlasnoscHoteluRepository.findByHotelId(hotelId);

            List<ResponseHotelOwnedpaintingsPaintings> paintings = new ArrayList<>();

            for (WlasnoscHotelu wlasnosc : wlasnosci) {
                Optional<Dzielo> dzieloOpt = dzieloRepository.findById(wlasnosc.getObrazId().intValue());
                if (dzieloOpt.isEmpty()) continue;

                Dzielo dzielo = dzieloOpt.get();
                ResponseHotelOwnedpaintingsPaintings painting = new ResponseHotelOwnedpaintingsPaintings();

                // Mapowanie danych z WlasnoscHotelu
                painting.setTakenOn(wlasnosc.getTakenOn());
                painting.setStatus(wlasnosc.getStatus());

                // Mapowanie danych z Dzielo
                painting.setDimensions(dzielo.getDimensions());
                painting.setTitle(dzielo.getTitle());

                // Tymczasowe rozwiązanie dla artysty
                painting.setArtist("@artist" + dzielo.getArtystaId());

                // Tymczasowy URL obrazu
                painting.setImageUrl("https://example.com/images/" + dzielo.getId() + ".jpg");

                paintings.add(painting);
            }

            ResponseHotelOwnedpaintings response = new ResponseHotelOwnedpaintings();
            response.setPaintings(paintings);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Autowired
    DeliveryService deliveryService;

    @Override
    public ResponseEntity<ResponseHotelAddDeliveryInfo> hotelAddDeliveryInfoIdobrazuPost(
            String authorization,
            Integer idobrazu,
            RequestHotelAddDeliveryInfo body) {

        // Tutaj można dodać weryfikację tokenu JWT jeśli potrzebna
        ResponseHotelAddDeliveryInfo response = deliveryService.addDeliveryInfo(idobrazu, body);
        return ResponseEntity.status(201).body(response);
    }


}