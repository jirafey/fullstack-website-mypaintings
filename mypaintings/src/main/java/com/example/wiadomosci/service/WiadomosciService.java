package com.example.wiadomosci.service;

import com.example.artysta.model.Dzielo;
import com.example.artysta.repository.DzieloRepository;
import com.example.hotel.model.WlasnoscHotelu;
import com.example.hotel.repository.WlasnoscHoteluRepository;
import com.example.model.*;
import com.example.ogolne.repository.UserRepository;
import com.example.security.JwtTokenProvider;
import com.example.wiadomosci.model.Rezerwacja;
import com.example.wiadomosci.model.Wiadomosc;
import com.example.wiadomosci.repository.RezerwacjaRepository;
import com.example.wiadomosci.repository.WiadomoscRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class WiadomosciService {

    @Autowired
    private WiadomoscRepository wiadomoscRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @Autowired
    private DzieloRepository dzieloRepository;

    @Autowired
    private RezerwacjaRepository rezerwacjaRepository;



    public ResponseEntity<ResponseWiadomosciSendmessage> wyslijWiadomosc(String token, RequestWiadomosciSendmessage request) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        // Pobierz ID nadawcy z tokena JWT
        Long senderId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Sprawdź czy odbiorca istnieje
        if (!userRepository.findById(request.getRecipientId().longValue()).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Utwórz i zapisz wiadomość
        Wiadomosc wiadomosc = new Wiadomosc();
        wiadomosc.setSenderId(senderId);
        wiadomosc.setRecipientId(request.getRecipientId());
        wiadomosc.setContent(request.getContent());
        wiadomosc.setTimestamp(OffsetDateTime.now());
        wiadomosc.setStatus("SENT");

        Wiadomosc zapisanaWiadomosc = wiadomoscRepository.save(wiadomosc);

        // Przygotuj odpowiedź
        ResponseWiadomosciSendmessage response = new ResponseWiadomosciSendmessage();
        response.setMessageId(zapisanaWiadomosc.getId());
        response.setTimestamp(zapisanaWiadomosc.getTimestamp());
        response.setStatus(zapisanaWiadomosc.getStatus());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public ResponseEntity<ResponseWiadomosciLatestTimestamps> getLatestTimestamps(String token) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Pobierz najnowsze wiadomości dla każdego użytkownika
            List<Wiadomosc> latestMessages = wiadomoscRepository.findLatestMessagesByUser(userId);

            // Przygotuj listę timestampów
            List<ResponseWiadomosciLatestTimestampsTimestamps> timestampsList = new ArrayList<>();

            // Przetwarzanie wiadomości i grupowanie po ID użytkownika
            Map<Integer, OffsetDateTime> userTimestamps = new HashMap<>();

            for (Wiadomosc wiadomosc : latestMessages) {
                Integer otherUserId;
                if (wiadomosc.getSenderId().equals(userId)) {
                    // Jestem nadawcą, więc druga strona to odbiorca
                    otherUserId = wiadomosc.getRecipientId();
                } else {
                    // Jestem odbiorcą, więc druga strona to nadawca
                    otherUserId = wiadomosc.getSenderId().intValue();
                }

                // Zapisz najnowszy timestamp dla tego użytkownika
                OffsetDateTime currentTimestamp = userTimestamps.get(otherUserId);
                if (currentTimestamp == null || wiadomosc.getTimestamp().isAfter(currentTimestamp)) {
                    userTimestamps.put(otherUserId, wiadomosc.getTimestamp());
                }
            }

            // Konwertuj mapę na listę obiektów odpowiedzi
            for (Map.Entry<Integer, OffsetDateTime> entry : userTimestamps.entrySet()) {
                ResponseWiadomosciLatestTimestampsTimestamps timestamp = new ResponseWiadomosciLatestTimestampsTimestamps();
                timestamp.setUserId(entry.getKey());
                timestamp.setLatestTimestamp(entry.getValue());
                timestampsList.add(timestamp);
            }

            // Utwórz i zwróć odpowiedź
            ResponseWiadomosciLatestTimestamps response = new ResponseWiadomosciLatestTimestamps();
            response.setTimestamps(timestampsList);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    public ResponseEntity<ResponseWiadomosciReservepainting> reservePainting(String token, Integer obrazId) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Sprawdź czy obraz istnieje
            Optional<Dzielo> optionalDzielo = dzieloRepository.findById(obrazId);
            if (optionalDzielo.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        
            Dzielo dzielo = optionalDzielo.get();
        
            // Sprawdź czy użytkownik nie rezerwuje własnego obrazu
            if (dzielo.getArtystaId().equals(userId)) {
                ResponseWiadomosciReservepainting response = new ResponseWiadomosciReservepainting();
                response.setMessage("Nie możesz zarezerwować własnego obrazu.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        
            // Sprawdź czy obraz ma już aktywną rezerwację, która nie pozwala na nową
            List<Rezerwacja> istniejaceRezerwacje = rezerwacjaRepository.findByObrazId(obrazId);
            boolean czyMoznaZarezerwowac = true;
        
            for (Rezerwacja rez : istniejaceRezerwacje) {
                if (!Rezerwacja.isStatusAllowingNewReservation(rez.getStatus())) {
                    czyMoznaZarezerwowac = false;
                    break;
                }
            }
        
            if (!czyMoznaZarezerwowac) {
                ResponseWiadomosciReservepainting response = new ResponseWiadomosciReservepainting();
                response.setMessage("Ten obraz jest już zarezerwowany i nie może być ponownie zarezerwowany.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
        
            // Sprawdź czy obraz nie jest już zarezerwowany przez tego użytkownika
            Optional<Rezerwacja> istniejacaRezerwacja = rezerwacjaRepository.findByObrazIdAndUzytkownikId(obrazId, userId);
            if (istniejacaRezerwacja.isPresent()) {
                Rezerwacja rezerwacja = istniejacaRezerwacja.get();
            
                // Jeśli rezerwacja jest anulowana lub odrzucona, możemy ją reaktywować
                if (Rezerwacja.Status.CANCELLED.name().equals(rezerwacja.getStatus()) || 
                    Rezerwacja.Status.REFUSED.name().equals(rezerwacja.getStatus())) {
                
                    rezerwacja.setStatus(Rezerwacja.Status.RESERVE_REQUESTED.name());
                    rezerwacja.setDataModyfikacji(OffsetDateTime.now());
                    rezerwacjaRepository.save(rezerwacja);
                
                    ResponseWiadomosciReservepainting response = new ResponseWiadomosciReservepainting();
                    response.setMessage("Prośba o rezerwację została ponownie wysłana.");
                    return ResponseEntity.status(HttpStatus.OK).body(response);
                } else {
                    ResponseWiadomosciReservepainting response = new ResponseWiadomosciReservepainting();
                    response.setMessage("Ten obraz jest już przez Ciebie zarezerwowany.");
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
                }
            }
        
            // Utwórz nową rezerwację
            Rezerwacja rezerwacja = new Rezerwacja();
            rezerwacja.setObrazId(obrazId);
            rezerwacja.setUzytkownikId(userId);
            rezerwacja.setStatus(Rezerwacja.Status.RESERVE_REQUESTED.name()); // Początkowy status oczekujący na akceptację
            rezerwacja.setDataUtworzenia(OffsetDateTime.now());
        
            // Zapisz rezerwację
            rezerwacjaRepository.save(rezerwacja);
        
            // Przygotuj odpowiedź
            ResponseWiadomosciReservepainting response = new ResponseWiadomosciReservepainting();
            response.setMessage("Prośba o rezerwację została wysłana.");
        
            return ResponseEntity.status(HttpStatus.OK).body(response);
        
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }






    public ResponseEntity<ResponseWiadomosciAcceptreservation> acceptReservation(String token, Integer idRezerwacji) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź rezerwację po ID
            Optional<Rezerwacja> optionalRezerwacja = rezerwacjaRepository.findById(idRezerwacji);
            if (optionalRezerwacja.isEmpty()) {
                ResponseWiadomosciAcceptreservation response = new ResponseWiadomosciAcceptreservation();
                response.setMessage("Rezerwacja o podanym ID nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Rezerwacja rezerwacja = optionalRezerwacja.get();

            // Znajdź obraz przypisany do rezerwacji
            Optional<Dzielo> optionalDzielo = dzieloRepository.findById(rezerwacja.getObrazId());
            if (optionalDzielo.isEmpty()) {
                ResponseWiadomosciAcceptreservation response = new ResponseWiadomosciAcceptreservation();
                response.setMessage("Obraz przypisany do rezerwacji nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Dzielo dzielo = optionalDzielo.get();

            // Sprawdź czy użytkownik jest właścicielem obrazu
            if (!dzielo.getArtystaId().equals(userId)) {
                ResponseWiadomosciAcceptreservation response = new ResponseWiadomosciAcceptreservation();
                response.setMessage("Nie masz uprawnień do akceptacji tej rezerwacji, ponieważ nie jesteś właścicielem obrazu.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Sprawdź czy rezerwacja ma status RESERVE_REQUESTED
            if (!Rezerwacja.Status.RESERVE_REQUESTED.name().equals(rezerwacja.getStatus())) {
                ResponseWiadomosciAcceptreservation response = new ResponseWiadomosciAcceptreservation();
                response.setMessage("Rezerwacja nie może zostać zaakceptowana, ponieważ nie ma statusu oczekującego na akceptację.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Sprawdź czy ten obraz nie jest już zarezerwowany przez kogoś innego
            boolean jestJuzZarezerwowany = rezerwacjaRepository.findByObrazId(rezerwacja.getObrazId()).stream()
                    .anyMatch(r -> !r.getId().equals(rezerwacja.getId()) &&
                            (Rezerwacja.Status.ACCEPTED.name().equals(r.getStatus()) ||
                                    Rezerwacja.Status.DELIVERY_REQUESTED.name().equals(r.getStatus()) ||
                                    Rezerwacja.Status.DELIVERY_ACCEPTED.name().equals(r.getStatus())));

            if (jestJuzZarezerwowany) {
                ResponseWiadomosciAcceptreservation response = new ResponseWiadomosciAcceptreservation();
                response.setMessage("Ten obraz jest już zarezerwowany przez innego użytkownika.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Aktualizuj status rezerwacji
            rezerwacja.setStatus(Rezerwacja.Status.ACCEPTED.name());
            rezerwacja.setDataModyfikacji(OffsetDateTime.now());
            rezerwacjaRepository.save(rezerwacja);

            // Przygotuj odpowiedź
            ResponseWiadomosciAcceptreservation response = new ResponseWiadomosciAcceptreservation();
            response.setMessage("Rezerwacja została zaakceptowana.");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            ResponseWiadomosciAcceptreservation response = new ResponseWiadomosciAcceptreservation();
            response.setMessage("Wystąpił błąd podczas akceptowania rezerwacji.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    public ResponseEntity<ResponseWiadomosciCancelreservation> cancelReservation(String token, Integer idRezerwacji) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź rezerwację po ID
            Optional<Rezerwacja> optionalRezerwacja = rezerwacjaRepository.findById(idRezerwacji);
            if (optionalRezerwacja.isEmpty()) {
                ResponseWiadomosciCancelreservation response = new ResponseWiadomosciCancelreservation();
                response.setMessage("Rezerwacja o podanym ID nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Rezerwacja rezerwacja = optionalRezerwacja.get();

            // Sprawdź czy użytkownik jest właścicielem rezerwacji
            if (!rezerwacja.getUzytkownikId().equals(userId)) {
                ResponseWiadomosciCancelreservation response = new ResponseWiadomosciCancelreservation();
                response.setMessage("Nie masz uprawnień do anulowania tej rezerwacji.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Sprawdź, czy rezerwacja może zostać anulowana
            if (Rezerwacja.Status.FINISHED.name().equals(rezerwacja.getStatus())) {
                ResponseWiadomosciCancelreservation response = new ResponseWiadomosciCancelreservation();
                response.setMessage("Nie można anulować zakończonej rezerwacji.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Aktualizuj status rezerwacji
            rezerwacja.setStatus(Rezerwacja.Status.CANCELLED.name());
            rezerwacja.setDataModyfikacji(OffsetDateTime.now());
            rezerwacjaRepository.save(rezerwacja);

            // Przygotuj odpowiedź
            ResponseWiadomosciCancelreservation response = new ResponseWiadomosciCancelreservation();
            response.setMessage("Rezerwacja została anulowana.");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            ResponseWiadomosciCancelreservation response = new ResponseWiadomosciCancelreservation();
            response.setMessage("Wystąpił błąd podczas anulowania rezerwacji.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    public ResponseEntity<ResponseWiadomosciRequestdelivery> requestDelivery(String token, Integer idRezerwacji) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź rezerwację po ID
            Optional<Rezerwacja> optionalRezerwacja = rezerwacjaRepository.findById(idRezerwacji);
            if (optionalRezerwacja.isEmpty()) {
                ResponseWiadomosciRequestdelivery response = new ResponseWiadomosciRequestdelivery();
                response.setMessage("Rezerwacja o podanym ID nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Rezerwacja rezerwacja = optionalRezerwacja.get();

            // Sprawdź czy użytkownik jest właścicielem rezerwacji
            if (!rezerwacja.getUzytkownikId().equals(userId)) {
                ResponseWiadomosciRequestdelivery response = new ResponseWiadomosciRequestdelivery();
                response.setMessage("Nie masz uprawnień do żądania dostawy dla tej rezerwacji.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Sprawdź, czy rezerwacja jest w odpowiednim statusie
            if (!Rezerwacja.Status.ACCEPTED.name().equals(rezerwacja.getStatus())) {
                ResponseWiadomosciRequestdelivery response = new ResponseWiadomosciRequestdelivery();
                response.setMessage("Można żądać dostawy tylko dla zaakceptowanych rezerwacji.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Aktualizuj status rezerwacji
            rezerwacja.setStatus(Rezerwacja.Status.DELIVERY_REQUESTED.name());
            rezerwacja.setDataModyfikacji(OffsetDateTime.now());
            rezerwacjaRepository.save(rezerwacja);

            // Przygotuj odpowiedź
            ResponseWiadomosciRequestdelivery response = new ResponseWiadomosciRequestdelivery();
            response.setMessage("Żądanie dostawy zostało wysłane.");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            ResponseWiadomosciRequestdelivery response = new ResponseWiadomosciRequestdelivery();
            response.setMessage("Wystąpił błąd podczas żądania dostawy.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }





    @Autowired
    private WlasnoscHoteluRepository wlasnoscHoteluRepository;

    public ResponseEntity<ResponseWiadomosciAcceptdelivery> acceptDelivery(String token, Integer idRezerwacji) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź rezerwację po ID
            Optional<Rezerwacja> optionalRezerwacja = rezerwacjaRepository.findById(idRezerwacji);
            if (optionalRezerwacja.isEmpty()) {
                ResponseWiadomosciAcceptdelivery response = new ResponseWiadomosciAcceptdelivery();
                response.setMessage("Rezerwacja o podanym ID nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Rezerwacja rezerwacja = optionalRezerwacja.get();

            // Znajdź obraz przypisany do rezerwacji
            Optional<Dzielo> optionalDzielo = dzieloRepository.findById(rezerwacja.getObrazId());
            if (optionalDzielo.isEmpty()) {
                ResponseWiadomosciAcceptdelivery response = new ResponseWiadomosciAcceptdelivery();
                response.setMessage("Obraz przypisany do rezerwacji nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Dzielo dzielo = optionalDzielo.get();

            // Sprawdź czy użytkownik jest właścicielem obrazu
            if (!dzielo.getArtystaId().equals(userId)) {
                ResponseWiadomosciAcceptdelivery response = new ResponseWiadomosciAcceptdelivery();
                response.setMessage("Nie masz uprawnień do akceptacji dostawy dla tej rezerwacji.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Sprawdź, czy rezerwacja jest w odpowiednim statusie
            if (!Rezerwacja.Status.DELIVERY_REQUESTED.name().equals(rezerwacja.getStatus())) {
                ResponseWiadomosciAcceptdelivery response = new ResponseWiadomosciAcceptdelivery();
                response.setMessage("Można akceptować dostawę tylko dla rezerwacji ze statusem żądania dostawy.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Aktualizuj status rezerwacji
            rezerwacja.setStatus(Rezerwacja.Status.DELIVERY_ACCEPTED.name());
            rezerwacja.setDataModyfikacji(OffsetDateTime.now());
            rezerwacjaRepository.save(rezerwacja);

            // Tworzenie lub aktualizacja wpisu w WlasnoscHotelu
            Optional<WlasnoscHotelu> optionalWlasnosc = wlasnoscHoteluRepository.findByObrazId(Long.valueOf(rezerwacja.getObrazId()));
            WlasnoscHotelu wlasnoscHotelu;

            if (optionalWlasnosc.isPresent()) {
                wlasnoscHotelu = optionalWlasnosc.get();
            } else {
                wlasnoscHotelu = WlasnoscHotelu.builder()
                        .obrazId(Long.valueOf(rezerwacja.getObrazId()))
                        .artystaId(dzielo.getArtystaId())
                        .hotelId(rezerwacja.getUzytkownikId())
                        .build();
            }

            // Aktualizacja danych własności
            wlasnoscHotelu.setTakenOn(LocalDate.now());
            wlasnoscHotelu.setSoldOn(null);
            wlasnoscHotelu.setStatus("IN DELIVERY TO YOU");

            // Zapisz wpis
            wlasnoscHoteluRepository.save(wlasnoscHotelu);

            // Przygotuj odpowiedź
            ResponseWiadomosciAcceptdelivery response = new ResponseWiadomosciAcceptdelivery();
            response.setMessage("Dostawa została zaakceptowana.");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            ResponseWiadomosciAcceptdelivery response = new ResponseWiadomosciAcceptdelivery();
            response.setMessage("Wystąpił błąd podczas akceptacji dostawy.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    public ResponseEntity<ResponseWiadomosciConfirmdelivery> confirmDelivery(String token, Integer idRezerwacji) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź rezerwację po ID
            Optional<Rezerwacja> optionalRezerwacja = rezerwacjaRepository.findById(idRezerwacji);
            if (optionalRezerwacja.isEmpty()) {
                ResponseWiadomosciConfirmdelivery response = new ResponseWiadomosciConfirmdelivery();
                response.setMessage("Rezerwacja o podanym ID nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Rezerwacja rezerwacja = optionalRezerwacja.get();

            // Sprawdź czy użytkownik jest właścicielem rezerwacji
            if (!rezerwacja.getUzytkownikId().equals(userId)) {
                ResponseWiadomosciConfirmdelivery response = new ResponseWiadomosciConfirmdelivery();
                response.setMessage("Nie masz uprawnień do potwierdzenia dostawy dla tej rezerwacji.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Sprawdź, czy rezerwacja jest w odpowiednim statusie
            if (!Rezerwacja.Status.DELIVERY_ACCEPTED.name().equals(rezerwacja.getStatus())) {
                ResponseWiadomosciConfirmdelivery response = new ResponseWiadomosciConfirmdelivery();
                response.setMessage("Można potwierdzić dostawę tylko dla rezerwacji ze statusem zaakceptowanej dostawy.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Ten endpoint nie zmienia statusu, to będzie robić finalize
            // Tutaj można dodać jakąś dodatkową logikę potwierdzenia

            // Przygotuj odpowiedź
            ResponseWiadomosciConfirmdelivery response = new ResponseWiadomosciConfirmdelivery();
            response.setMessage("Dostawa została potwierdzona.");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            ResponseWiadomosciConfirmdelivery response = new ResponseWiadomosciConfirmdelivery();
            response.setMessage("Wystąpił błąd podczas potwierdzania dostawy.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    /**
     * Finalizacja procesu rezerwacji
     */
    public ResponseEntity<ResponseWiadomosciFinalizeprocess> finalizeProcess(String token, Integer idRezerwacji) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź rezerwację po ID
            Optional<Rezerwacja> optionalRezerwacja = rezerwacjaRepository.findById(idRezerwacji);
            if (optionalRezerwacja.isEmpty()) {
                ResponseWiadomosciFinalizeprocess response = new ResponseWiadomosciFinalizeprocess();
                response.setMessage("Rezerwacja o podanym ID nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Rezerwacja rezerwacja = optionalRezerwacja.get();

            // Znajdź obraz przypisany do rezerwacji
            Optional<Dzielo> optionalDzielo = dzieloRepository.findById(rezerwacja.getObrazId());
            if (optionalDzielo.isEmpty()) {
                ResponseWiadomosciFinalizeprocess response = new ResponseWiadomosciFinalizeprocess();
                response.setMessage("Obraz przypisany do rezerwacji nie istnieje.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Dzielo dzielo = optionalDzielo.get();

            // Sprawdź czy użytkownik jest właścicielem obrazu
            if (!dzielo.getArtystaId().equals(userId)) {
                ResponseWiadomosciFinalizeprocess response = new ResponseWiadomosciFinalizeprocess();
                response.setMessage("Nie masz uprawnień do finalizacji procesu dla tej rezerwacji.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            // Sprawdź, czy rezerwacja jest w odpowiednim statusie
            if (!Rezerwacja.Status.DELIVERY_ACCEPTED.name().equals(rezerwacja.getStatus())) {
                ResponseWiadomosciFinalizeprocess response = new ResponseWiadomosciFinalizeprocess();
                response.setMessage("Można finalizować proces tylko dla rezerwacji ze statusem zaakceptowanej dostawy.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Aktualizuj status rezerwacji
            rezerwacja.setStatus(Rezerwacja.Status.FINISHED.name());
            rezerwacja.setDataModyfikacji(OffsetDateTime.now());
            rezerwacjaRepository.save(rezerwacja);

            // Aktualizacja lub utworzenie wpisu w WlasnoscHotelu
            Optional<WlasnoscHotelu> optionalWlasnosc = wlasnoscHoteluRepository.findByObrazId(Long.valueOf(rezerwacja.getObrazId()));
            WlasnoscHotelu wlasnoscHotelu;

            if (optionalWlasnosc.isPresent()) {
                wlasnoscHotelu = optionalWlasnosc.get();
            } else {
                wlasnoscHotelu = WlasnoscHotelu.builder()
                        .obrazId(Long.valueOf(rezerwacja.getObrazId()))
                        .artystaId(dzielo.getArtystaId())
                        .hotelId(rezerwacja.getUzytkownikId())
                        .build();
            }

            // Aktualizacja danych własności
            wlasnoscHotelu.setTakenOn(LocalDate.now());
            wlasnoscHotelu.setSoldOn(null);
            wlasnoscHotelu.setStatus("AT YOUR PLACE");

            // Zapisz wpis
            wlasnoscHoteluRepository.save(wlasnoscHotelu);

            // Przygotuj odpowiedź
            ResponseWiadomosciFinalizeprocess response = new ResponseWiadomosciFinalizeprocess();
            response.setMessage("Proces rezerwacji został zakończony.");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            ResponseWiadomosciFinalizeprocess response = new ResponseWiadomosciFinalizeprocess();
            response.setMessage("Wystąpił błąd podczas finalizacji procesu.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    public ResponseEntity<ResponseWiadomosciGetmessages> getMessages(String token, Integer userId) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID zalogowanego użytkownika z tokena JWT
            Long currentUserId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Sprawdź, czy użytkownik, z którym prowadzona jest konwersacja, istnieje
            if (!userRepository.existsById(userId.longValue())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Pobierz wszystkie wiadomości między tymi dwoma użytkownikami
            List<Wiadomosc> sentMessages = wiadomoscRepository.findBySenderIdAndRecipientId(currentUserId, userId);
            List<Wiadomosc> receivedMessages = wiadomoscRepository.findBySenderIdAndRecipientId(userId.longValue(), currentUserId.intValue());

            // Połącz obie listy
            List<Wiadomosc> allMessages = new ArrayList<>();
            allMessages.addAll(sentMessages);
            allMessages.addAll(receivedMessages);

            // Posortuj wiadomości według timestampu (od najstarszej do najnowszej)
            allMessages.sort(Comparator.comparing(Wiadomosc::getTimestamp));

            // Konwertuj listę wiadomości na format odpowiedzi
            List<ResponseWiadomosciGetmessagesMessages> messagesList = allMessages.stream()
                    .map(wiadomosc -> {
                        ResponseWiadomosciGetmessagesMessages message = new ResponseWiadomosciGetmessagesMessages();
                        message.setContent(wiadomosc.getContent());
                        message.setTimestamp(wiadomosc.getTimestamp());
                        return message;
                    })
                    .collect(Collectors.toList());

            // Utwórz i zwróć odpowiedź
            ResponseWiadomosciGetmessages response = new ResponseWiadomosciGetmessages();
            response.setMessages(messagesList);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }




    public ResponseEntity<ResponseWiadomosciTransactionstatus> getTransactionStatus(String token, Integer transactionId) {
        try {
            // Usuń "Bearer " z tokena
            String jwt = token.substring(7);

            // Pobierz ID użytkownika z tokena JWT
            Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

            // Znajdź rezerwację po ID transakcji
            Optional<Rezerwacja> optionalRezerwacja = rezerwacjaRepository.findById(transactionId);
            if (optionalRezerwacja.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Rezerwacja rezerwacja = optionalRezerwacja.get();

            // Przygotuj odpowiedź
            ResponseWiadomosciTransactionstatus response = new ResponseWiadomosciTransactionstatus();
            response.setTransactionId(transactionId);

            // Mapowanie statusu z Rezerwacja.Status na ResponseWiadomosciTransactionstatus.StatusEnum
            ResponseWiadomosciTransactionstatus.StatusEnum statusEnum =
                    ResponseWiadomosciTransactionstatus.StatusEnum.fromValue(rezerwacja.getStatus());
            response.setStatus(statusEnum);

            // Ustaw datę ostatniej aktualizacji (jeśli istnieje, w przeciwnym razie użyj daty utworzenia)
            OffsetDateTime lastUpdated = rezerwacja.getDataModyfikacji() != null ?
                    rezerwacja.getDataModyfikacji() : rezerwacja.getDataUtworzenia();
            response.setLastUpdated(lastUpdated);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }










}



