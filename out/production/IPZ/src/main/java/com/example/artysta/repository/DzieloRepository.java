package com.example.artysta.repository;

import com.example.artysta.model.Dzielo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DzieloRepository extends JpaRepository<Dzielo, Long> {
    List<Dzielo> findByArtystaId(Long artystaId);
}