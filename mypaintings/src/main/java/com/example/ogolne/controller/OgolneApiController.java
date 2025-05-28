package com.example.ogolne.controller;

import com.example.api.OgolneApi;
import com.example.model.*;
import com.example.ogolne.model.SupportTicket;
import com.example.ogolne.model.User;
import com.example.ogolne.repository.UserRepository;
import com.example.ogolne.service.AuthService;
import com.example.ogolne.service.DaneDostawyService;
import com.example.ogolne.service.SupportTicketService;
import com.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.example.ogolne.service.UserService;

@RestController
public class OgolneApiController implements OgolneApi {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    SupportTicketService supportTicketService;

    @Override
    public ResponseEntity<ResponseOgolneRejestracja> ogolneRejestracjaPost(RequestOgolneRejestracja body) {
        // Walidacja czy użytkownik już istnieje
        if (userRepository.existsByEmail(body.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        if (userRepository.existsByLogin(body.getLogin())) {
            return ResponseEntity.badRequest().build();
        }

        User user = User.fromRequest(body);
        User savedUser = userService.registerUser(user);

        userRepository.save(savedUser);

        // Przygotowanie odpowiedzi
        ResponseOgolneRejestracja response = new ResponseOgolneRejestracja();
        response.setId(user.getId().intValue());
        response.setLogin(user.getLogin());
        response.setEmail(user.getEmail());
        response.setTypUzytkownika(body.getTypUzytkownika().toString());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    public ResponseEntity<ResponseOgolneLogowanie> ogolneLogowaniePost(RequestOgolneLogowanie body) {
        return authService.login(body);
    }

    @Override
    public ResponseEntity<ResponseOgolneZmianaHasla> ogolneZmianaHaslaPut(String authorization, RequestOgolneZmianaHasla body) {
        // Usuń "Bearer " z tokena
        String jwt = authorization.substring(7);

        // Pobierz ID użytkownika z tokena JWT
        Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Zmień hasło
        boolean success = userService.changePassword(userId, body.getStareHaslo(), body.getNoweHaslo());

        if (success) {
            ResponseOgolneZmianaHasla response = new ResponseOgolneZmianaHasla();
            response.setMessage("Hasło zostało pomyślnie zmienione.");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @Override
    public ResponseEntity<ResponseOgolneSupportTicket> ogolneSupportTicketPost(RequestOgolneSupportTicket body) {
        // Walidacja danych wejściowych
        if (body.getImieINazwisko() == null || body.getEmail() == null ||
                body.getTemat() == null || body.getWiadomosc() == null) {
            return ResponseEntity.badRequest().build();
        }

        // Przekazanie żądania do serwisu i uzyskanie odpowiedzi
        ResponseOgolneSupportTicket response = supportTicketService.createSupportTicket(body);

        // Zwrócenie odpowiedzi
        return ResponseEntity.ok(response);
    }



    @Override
    public ResponseEntity<ResponseOgolneResolver> ogolneResolverUsernameGet(String username) {

        // Tutaj należałoby dodać logikę wyszukiwania ID na podstawie nazwy użytkownika
        // Poniżej jest tylko przykładowa implementacja
        Long userId = userService.resolveUserIdByUsername(username);

        if (userId == null) {
            return ResponseEntity.notFound().build();
        }

        ResponseOgolneResolver response = new ResponseOgolneResolver();
        response.setUserId(userId.intValue());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<ResponseOgolneUserNickname> ogolneUserNicknameIdGet(Integer id) {
        // Tutaj należałoby dodać logikę pobierania nazwy użytkownika na podstawie ID
        // Poniżej jest tylko przykładowa implementacja
        String username = userService.getUserNicknameById(id.longValue());

        if (username == null) {
            return ResponseEntity.notFound().build();
        }

        // Dodanie znaku @ na początku nazwy użytkownika, jeśli nie ma
        String nickname = username.startsWith("@") ? username : "@" + username;

        ResponseOgolneUserNickname response = new ResponseOgolneUserNickname();
        response.setNickname(nickname);
        return ResponseEntity.ok(response);
    }



    @Autowired
    private DaneDostawyService daneDostawyService;

    @Override
    public ResponseEntity<ResponseOgolneDaneDostawy> ogolneDaneDostawyPut(String authorization, RequestOgolneDaneDostawy body) {
        return daneDostawyService.updateDaneDostawy(authorization, body);
    }

    @Override
    public ResponseEntity<ResponseOgolneDaneDostawy> ogolneDaneDostawyGet(String authorization) {
        return daneDostawyService.getDaneDostawy(authorization);
    }




}