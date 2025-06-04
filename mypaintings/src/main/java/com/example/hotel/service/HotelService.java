package com.example.hotel.service;

import com.example.api.HotelApi;
import com.example.artysta.model.Dzielo;
import com.example.artysta.repository.DzieloRepository;
import com.example.gosc.model.BuyOffer;
import com.example.gosc.repository.BuyOfferRepository;
import com.example.hotel.model.*;
import com.example.hotel.repository.*;
import com.example.model.*;
import com.example.ogolne.model.DaneDostawy;
import com.example.ogolne.repository.DaneDostawyRepository;
import com.example.ogolne.service.UserService;
import com.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
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


    @Autowired
    UserService userService;

    @Autowired
    ObrazLikeRepository obrazLikeRepository;

    public ResponseEntity<ResponseHotelStronaartysty> getStronaArtysty(String authorizationHeader, Integer artistId) {
        try {
            // Pobierz ID hotelu z tokena JWT
            String jwt = authorizationHeader.substring(7);
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Pobierz informacje o artyście
            ResponseHotelStronaartystyArtistInfo artistInfo = new ResponseHotelStronaartystyArtistInfo();
            artistInfo.setArtistId(artistId);
            artistInfo.setNickname(userService.getUserNicknameById(artistId.longValue()));
            artistInfo.setAvatarUrl("https://example.com/avatars/default.png"); // Dummy URL

            // Sprawdź czy hotel followuje artystę
            boolean isFollowed = followRepository.findByHotelIdAndArtystaId(hotelId, artistId.longValue()).isPresent();
            artistInfo.setIsFollowed(isFollowed);

            // Pobierz dzieła artysty
            List<Dzielo> dziela = dzieloRepository.findByArtystaId(artistId.longValue());

            List<ResponseHotelStronaartystyArtworks> artworks = dziela.stream()
                    .map(dzielo -> {
                        ResponseHotelStronaartystyArtworks artwork = new ResponseHotelStronaartystyArtworks();
                        artwork.setArtworkId(dzielo.getId());
                        artwork.setImageUrl("https://example.com/images/" + dzielo.getId()); // Dummy URL

                        // Sprawdź czy hotel polubił dzieło
                        boolean isLiked = obrazLikeRepository.existsByIdHoteluAndIdObrazu(hotelId, dzielo.getId().longValue());
                        artwork.setIsLiked(isLiked);

                        return artwork;
                    })
                    .collect(Collectors.toList());

            // Zbuduj odpowiedź
            ResponseHotelStronaartysty response = new ResponseHotelStronaartysty();
            response.setArtistInfo(artistInfo);
            response.setArtworks(artworks);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }





    public ResponseEntity<ResponseHotelFeed> getHotelFeed(String authorization) {
        try {
            // Pobierz wszystkie dzieła z bazy danych
            List<Dzielo> wszystkieDziela = dzieloRepository.findAll();

            // Przygotuj odpowiedź
            ResponseHotelFeed response = new ResponseHotelFeed();
            List<ResponseHotelFeedFeed> feedItems = new ArrayList<>();

            for (Dzielo dzielo : wszystkieDziela) {
                ResponseHotelFeedFeed feedItem = new ResponseHotelFeedFeed();

                // Ustaw dummy URL obrazu
                feedItem.setImageUrl("https://example.com/images/" + dzielo.getId() + ".jpg");

                // Ustaw dummy URL strony obrazu
                feedItem.setPaintingSite("https://example.com/paintings/" + dzielo.getId());

                // Pobierz nick artysty
                if (dzielo.getArtystaId() != null) {
                    String artistNick = userService.getUserNicknameById(dzielo.getArtystaId());
                    feedItem.setArtistNick(artistNick != null ? artistNick : "unknown_artist");
                } else {
                    feedItem.setArtistNick("unknown_artist");
                }

                // Ustaw dummy URL awatara artysty
                feedItem.setArtistAvatarUrl("https://example.com/avatars/default.png");

                feedItems.add(feedItem);
            }

            response.setFeed(feedItems);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }







    @Autowired
    BuyOfferRepository buyOfferRepository;

    public ResponseEntity<ResponseHotelReservations> getHotelReservations(String authorization) {
        try {
            // Pobierz ID hotelu z tokena
            String jwt = authorization.substring(7);
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź wszystkie własności hotelu
            List<WlasnoscHotelu> wlasnosci = wlasnoscHoteluRepository.findByHotelId(hotelId);

            List<ResponseHotelReservationsReservations> reservations = new ArrayList<>();

            for (WlasnoscHotelu wlasnosc : wlasnosci) {
                // Znajdź wszystkie oferty kupna dla danego obrazu

                List<BuyOffer> buyOffers = buyOfferRepository.findByImageId(wlasnosc.getObrazId());

                for (BuyOffer offer : buyOffers) {
                    // Pomiń oferty, które nie są w statusie rezerwacji
                    if (!"Waiting for payment (reception)".equals(offer.getStatus())) {
                        continue;
                    }

                    // Pobierz informacje o dziele
                    Optional<Dzielo> dzieloOpt = dzieloRepository.findById(wlasnosc.getObrazId().intValue());
                    if (dzieloOpt.isEmpty()) continue;

                    Dzielo dzielo = dzieloOpt.get();

                    // Utwórz obiekt rezerwacji
                    ResponseHotelReservationsReservations reservation = new ResponseHotelReservationsReservations();

                    // Ustaw datę rezerwacji (created_at z BuyOffer)
                    if (offer.getCreatedAt() != null) {
                        reservation.setReservedOn(offer.getCreatedAt().toLocalDate());
                    }

                    // Ustaw nick kupującego
                    if (offer.getBuyerId() != null) {
                        String buyerNick = userService.getUserNicknameById(offer.getBuyerId());
                        reservation.setBuyer(buyerNick != null ? buyerNick : "unknown_buyer");
                    } else {
                        reservation.setBuyer("unknown_buyer");
                    }

                    // Ustaw wymiary z dzieła
                    reservation.setDimensions(dzielo.getDimensions());

                    // Ustaw dummy URL obrazu
                    reservation.setImageUrl("https://example.com/images/" + dzielo.getId() + ".jpg");

                    reservations.add(reservation);
                }
            }

            // Przygotuj odpowiedź
            ResponseHotelReservations response = new ResponseHotelReservations();
            response.setReservations(reservations);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }









    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Override
    public ResponseEntity<ResponseHotelGenerateQr> hotelGenerateQrImageIdPost(
            String authorization,
            Integer imageId) {
        try {
            // Sprawdź czy QR już istnieje
            Optional<QrCode> existingQr = qrCodeRepository.findByImageId(imageId.longValue());

            if (existingQr.isPresent()) {
                // Jeśli QR już istnieje, zwróć istniejący URL
                ResponseHotelGenerateQr response = new ResponseHotelGenerateQr();
                response.setQrCodeUrl(existingQr.get().getQrCodeUrl());
                return ResponseEntity.ok(response);
            }

            // Generuj unikalny link dla obrazu
            String imageLink = "https://example.com/paintings/" + imageId;

            // Generuj unikalny identyfikator dla pliku QR
            String qrImageId = "qr_" + imageId + "_" + System.currentTimeMillis();

            // Wygeneruj kod QR
            QRgenerator.generateQR(imageLink, qrImageId);

            // URL do wygenerowanego kodu QR
            String qrCodeUrl = "https://example.com/qr-codes/" + qrImageId + ".png";

            // Zapisz informacje o wygenerowanym kodzie QR
            QrCode qrCode = new QrCode();
            qrCode.setImageId(imageId.longValue());
            qrCode.setQrCodeUrl(qrCodeUrl);
            qrCode.setCreatedAt(LocalDateTime.now());
            qrCodeRepository.save(qrCode);

            // Przygotuj odpowiedź
            ResponseHotelGenerateQr response = new ResponseHotelGenerateQr();
            response.setQrCodeUrl(qrCodeUrl);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error generating QR code", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

















    @Autowired
    private DaneDostawyRepository daneDostawyRepository;

    @Autowired
    private DeliveryInfoRepository deliveryInfoRepository;

    @Override
    public ResponseEntity<ResponseHotelDeliveries> hotelDeliveriesGet(String authorization) {
        try {
            // Pobierz ID hotelu z tokena
            String jwt = authorization.substring(7);
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź wszystkie własności hotelu z odpowiednim statusem (np. "DELIVERED")
            List<WlasnoscHotelu> wlasnosci = wlasnoscHoteluRepository.findByHotelIdAndStatus(hotelId, "DELIVERED");

            List<ResponseHotelDeliveriesDeliveries> deliveries = new ArrayList<>();

            for (WlasnoscHotelu wlasnosc : wlasnosci) {
                ResponseHotelDeliveriesDeliveries delivery = new ResponseHotelDeliveriesDeliveries();

                // Ustaw datę zapłaty (paid_on) z WlasnoscHotelu
                delivery.setPaidOn(wlasnosc.getTakenOn());

                // Pobierz informacje o dziele
                Optional<Dzielo> dzieloOpt = dzieloRepository.findById(wlasnosc.getObrazId().intValue());
                if (dzieloOpt.isPresent()) {
                    Dzielo dzielo = dzieloOpt.get();
                    // Ustaw wymiary z dzieła
                    delivery.setDimensions(dzielo.getDimensions());
                }

                // Znajdź ofertę kupna dla tego obrazu
                Optional<BuyOffer> buyOfferOpt = buyOfferRepository.findByImageId(wlasnosc.getObrazId())
                        .stream()
                        .filter(offer -> "PAID".equals(offer.getStatus()) || "DELIVERED".equals(offer.getStatus()))
                        .findFirst();

                if (buyOfferOpt.isPresent()) {
                    BuyOffer offer = buyOfferOpt.get();
                    // Ustaw nick kupującego
                    if (offer.getBuyerId() != null) {
                        String buyerNick = userService.getUserNicknameById(offer.getBuyerId());
                        delivery.setBuyer(buyerNick != null ? buyerNick : "unknown_buyer");
                    }

                    // Pobierz dane dostawy - najpierw sprawdź DaneDostawy, potem DeliveryInfo
                    ResponseHotelDeliveriesShipTo shipTo = new ResponseHotelDeliveriesShipTo();

                    if (offer.getBuyerId() != null) {
                        // Spróbuj pobrać z DaneDostawy
                        Optional<DaneDostawy> daneDostawyOpt = daneDostawyRepository.findByUserId(offer.getBuyerId());
                        if (daneDostawyOpt.isPresent()) {
                            DaneDostawy dane = daneDostawyOpt.get();
                            shipTo.setFirstName(""); // DaneDostawy nie ma firstName, ustawiamy puste
                            shipTo.setLastName("");  // DaneDostawy nie ma lastName, ustawiamy puste
                            shipTo.setStreetAddress(dane.getStreetAddress());
                            shipTo.setCity(dane.getCity());
                            shipTo.setStateProvinceRegion(dane.getStateProvinceRegion());
                            shipTo.setZipCode(dane.getZipCode());
                            shipTo.setEmailAddress(dane.getEmailAddress());
                            shipTo.setPhoneNumber(dane.getPhoneNumber());
                        }
                    } else {
                        // Spróbuj pobrać z DeliveryInfo
                        Optional<DeliveryInfo> deliveryInfoOpt = deliveryInfoRepository.findByPaintingId(wlasnosc.getObrazId().intValue());
                        if (deliveryInfoOpt.isPresent()) {
                            DeliveryInfo info = deliveryInfoOpt.get();
                            ShippingAdress address = info.getShipTo();
                            if (address != null) {
                                shipTo.setFirstName(address.getFirstName());
                                shipTo.setLastName(address.getLastName());
                                shipTo.setStreetAddress(address.getStreetAddress());
                                shipTo.setCity(address.getCity());
                                shipTo.setStateProvinceRegion(address.getStateProvinceRegion());
                                shipTo.setZipCode(address.getZipCode());
                                shipTo.setEmailAddress(address.getEmailAddress());
                                shipTo.setPhoneNumber(address.getPhoneNumber());
                            }
                        }
                    }

                    delivery.setShipTo(shipTo);
                }

                // Ustaw dummy URL obrazu
                delivery.setImageUrl("https://example.com/images/" + wlasnosc.getObrazId() + ".jpg");

                deliveries.add(delivery);
            }

            // Przygotuj odpowiedź
            ResponseHotelDeliveries response = new ResponseHotelDeliveries();
            response.setDeliveries(deliveries);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error getting hotel deliveries", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }






    @Transactional
    public ResponseEntity<ResponseHotelConfirmDelivery> hotelConfirmDeliveryImageIdPost(
            String authorization,
            Integer imageId) {
        try {
            // Pobierz ID hotelu z tokena
            String jwt = authorization.substring(7);
            Long hotelId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Sprawdź czy obraz należy do hotelu
            Optional<WlasnoscHotelu> wlasnoscOpt = wlasnoscHoteluRepository.findByObrazId(imageId.longValue());
            if (wlasnoscOpt.isEmpty() || !wlasnoscOpt.get().getHotelId().equals(hotelId)) {
                ResponseHotelConfirmDelivery response = new ResponseHotelConfirmDelivery();
                response.setMessage("Obraz nie należy do tego hotelu lub nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Znajdź ofertę kupna dla tego obrazu
            List<BuyOffer> buyOffers = buyOfferRepository.findByImageId(imageId.longValue());
            if (buyOffers.isEmpty()) {
                ResponseHotelConfirmDelivery response = new ResponseHotelConfirmDelivery();
                response.setMessage("Nie znaleziono oferty kupna dla tego obrazu.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Znajdź pierwszą ofertę w stanie "PAID" lub inny odpowiedni status
            Optional<BuyOffer> paidOffer = buyOffers.stream()
                    .filter(offer -> "PAID".equals(offer.getStatus()) ||
                            "Waiting for payment (reception)".equals(offer.getStatus()))
                    .findFirst();

            if (paidOffer.isEmpty()) {
                ResponseHotelConfirmDelivery response = new ResponseHotelConfirmDelivery();
                response.setMessage("Nie znaleziono oferty w stanie oczekującym na dostawę.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Zaktualizuj status oferty
            BuyOffer offer = paidOffer.get();
            offer.setStatus("DELIVERED TO YOU");
            buyOfferRepository.save(offer);

            // Możesz również zaktualizować status w WlasnoscHotelu jeśli potrzebne
            WlasnoscHotelu wlasnosc = wlasnoscOpt.get();
            wlasnosc.setStatus("DELIVERED");
            wlasnoscHoteluRepository.save(wlasnosc);

            // Przygotuj odpowiedź
            ResponseHotelConfirmDelivery response = new ResponseHotelConfirmDelivery();
            response.setMessage("Dostarczenie obrazu zostało potwierdzone. Status zmieniony na DELIVERED TO YOU.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error confirming delivery", e);
            ResponseHotelConfirmDelivery response = new ResponseHotelConfirmDelivery();
            response.setMessage("Wystąpił błąd podczas potwierdzania dostawy.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }





}