package com.example.ogolne.controller;

import com.example.api.OgolneApi;
import com.example.model.RequestOgolneLogowanie;
import com.example.model.RequestOgolneRejestracja;
import com.example.model.ResponseOgolneLogowanie;
import com.example.model.ResponseOgolneRejestracja;
import com.example.ogolne.model.User;
import com.example.ogolne.repository.UserRepository;
import com.example.ogolne.service.AuthService;
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


    @Autowired
    private AuthService authService;

    @Override
    public ResponseEntity<ResponseOgolneLogowanie> ogolneLogowaniePost(RequestOgolneLogowanie body) {
        return authService.login(body);
    }






}




