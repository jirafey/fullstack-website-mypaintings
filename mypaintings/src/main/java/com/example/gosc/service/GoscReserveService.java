package com.example.gosc.service;

import com.example.artysta.model.Dzielo;
import com.example.artysta.repository.DzieloRepository;
import com.example.gosc.model.BuyOffer;
import com.example.hotel.model.WlasnoscHotelu;
import com.example.hotel.repository.WlasnoscHoteluRepository;
import com.example.model.RequestGoscReserve;
import com.example.model.ResponseGoscReserve;
import com.example.gosc.repository.BuyOfferRepository;
import com.example.model.ResponseGoscZamowienia;
import com.example.model.ResponseGoscZamowieniaZamowienia;
import com.example.ogolne.service.UserService;
import com.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GoscReserveService {

    @Autowired
    private BuyOfferRepository buyOfferRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ResponseEntity<ResponseGoscReserve> createReservation(RequestGoscReserve request, String authorization) {
        try {
            Long buyerId = null;

            // Jeśli podano token JWT, wyciągamy ID użytkownika
            if (authorization != null && authorization.startsWith("Bearer ")) {
                String jwt = authorization.substring(7);
                buyerId = jwtTokenProvider.getUserIdFromToken(jwt);
            }

            // Sprawdź czy już istnieje rezerwacja dla tego obrazu i użytkownika
            if (buyerId != null) {
                Optional<BuyOffer> existingOffer = buyOfferRepository.findByImageIdAndBuyerId(
                        request.getImageId().longValue(),
                        buyerId
                );

                if (existingOffer.isPresent()) {
                    ResponseGoscReserve response = new ResponseGoscReserve();
                    response.setMessage("Już istnieje rezerwacja dla tego obrazu.");
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
                }
            }

            // Utwórz nową rezerwację
            BuyOffer offer = new BuyOffer();
            offer.setImageId(request.getImageId().longValue());
            offer.setBuyerId(buyerId);
            offer.setStatus("PENDING");

            buyOfferRepository.save(offer);

            ResponseGoscReserve response = new ResponseGoscReserve();
            response.setMessage("Obraz został zarezerwowany.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            ResponseGoscReserve response = new ResponseGoscReserve();
            response.setMessage("Wystąpił błąd podczas rezerwacji obrazu.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @Autowired
    DzieloRepository dzieloRepository;

    @Autowired
    WlasnoscHoteluRepository wlasnoscHoteluRepository;

    @Autowired
    UserService userService;

    public ResponseEntity<ResponseGoscZamowienia> goscZamowieniaGet(String authorization) {
        try {
            // Pobierz ID gościa z tokena JWT
            String jwt = authorization.substring(7);
            Long guestId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź wszystkie oferty kupna dla danego gościa
            List<BuyOffer> buyOffers = buyOfferRepository.findByBuyerId(guestId);

            List<ResponseGoscZamowieniaZamowienia> zamowienia = new ArrayList<>();

            for (BuyOffer offer : buyOffers) {
                Optional<Dzielo> dzieloOpt = dzieloRepository.findById(offer.getImageId().intValue());
                if (dzieloOpt.isEmpty()) continue;

                Dzielo dzielo = dzieloOpt.get();

                // Znajdź właściciela (hotel) dla danego obrazu

                Optional<WlasnoscHotelu> wlasnoscOpt = wlasnoscHoteluRepository.findByObrazId(offer.getImageId());
                if (wlasnoscOpt.isEmpty()) continue;

                WlasnoscHotelu wlasnosc = wlasnoscOpt.get();

                // Utwórz obiekt zamówienia
                ResponseGoscZamowieniaZamowienia zamowienie = new ResponseGoscZamowieniaZamowienia();

                // Ustaw datę zakupu (created_at z BuyOffer)
                if (offer.getCreatedAt() != null) {
                    zamowienie.setBoughtOn(offer.getCreatedAt().toLocalDate());
                }

                // Ustaw cenę z dzieła (formatujemy jako string z $)
                if (dzielo.getPrice() != null) {
                    zamowienie.setPrice("$" + dzielo.getPrice().intValue());
                } else {
                    zamowienie.setPrice("$0");
                }

                // Ustaw nazwę hotelu
                String hotelNick = userService.getUserNicknameById(wlasnosc.getHotelId());
                zamowienie.setHotel(hotelNick != null ? hotelNick : "@unknown_hotel");

                // Ustaw status z oferty
                zamowienie.setStatus(offer.getStatus());

                // Ustaw dummy URL obrazu
                zamowienie.setImageUrl("https://example.com/images/" + dzielo.getId() + ".jpg");

                zamowienia.add(zamowienie);
            }

            // Przygotuj odpowiedź
            ResponseGoscZamowienia response = new ResponseGoscZamowienia();
            response.setZamowienia(zamowienia);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }





}