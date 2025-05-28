package com.example.ogolne.service;

import com.example.model.RequestOgolneLogowanie;
import com.example.model.ResponseOgolneLogowanie;
import com.example.ogolne.model.User;
import com.example.ogolne.repository.UserRepository;
import com.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<ResponseOgolneLogowanie> login(RequestOgolneLogowanie request) {
        User user = userRepository.findByLogin(request.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        String token = jwtTokenProvider.generateToken(user);

        ResponseOgolneLogowanie response = new ResponseOgolneLogowanie();
        response.setToken(token);

        return ResponseEntity.ok(response);
    }



}