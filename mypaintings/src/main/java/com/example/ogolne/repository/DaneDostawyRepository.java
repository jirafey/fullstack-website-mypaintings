package com.example.ogolne.repository;

import com.example.ogolne.model.DaneDostawy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DaneDostawyRepository extends JpaRepository<DaneDostawy, Long> {
    Optional<DaneDostawy> findByUserId(Long userId);
}