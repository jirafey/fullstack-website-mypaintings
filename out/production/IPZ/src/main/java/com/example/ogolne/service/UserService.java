package com.example.ogolne.service;

import com.example.ogolne.model.User;
import com.example.ogolne.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Dodane

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) { // Zmodyfikowany konstruktor
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email już istnieje!");
        }
        if (userRepository.existsByLogin(user.getLogin())) {
            throw new RuntimeException("Login już istnieje!");
        }

        // Kluczowa zmiana - hashowanie hasła przed zapisem
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }
}