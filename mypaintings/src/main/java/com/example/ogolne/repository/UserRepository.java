package com.example.ogolne.repository;

import com.example.ogolne.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByLogin(String login);
    Optional<User> findByLogin(String login);  // Zwraca Optional<User>, a nie User
    Optional<User> findById(Long userId);
}