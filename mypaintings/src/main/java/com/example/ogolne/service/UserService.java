package com.example.ogolne.service;

import com.example.ogolne.model.User;
import com.example.ogolne.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    public boolean changePassword(Long userId, String oldPassword, String newPassword) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return false;
        }
        User user = optionalUser.get();
        // Verify old password
        if (!user.checkPassword(oldPassword, passwordEncoder)) {
            return false;
        }

        // Encode and set new password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
    }

    public Long resolveUserIdByUsername(String username) {
        // Usuwamy znak @ z początku nazwy użytkownika, jeśli istnieje
        String cleanUsername = username.startsWith("@") ? username.substring(1) : username;

        Optional<User> userOpt = userRepository.findByLogin(cleanUsername);
        return userOpt.map(User::getId).orElse(null);
    }


    public String getUserNicknameById(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        return userOpt.map(user -> "@" + user.getLogin()).orElse(null);
    }



}