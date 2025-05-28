package com.example.wiadomosci.repository;

import com.example.wiadomosci.model.Rezerwacja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RezerwacjaRepository extends JpaRepository<Rezerwacja, Integer> {
    Optional<Rezerwacja> findByObrazIdAndUzytkownikId(Integer obrazId, Long uzytkownikId);
    
    // Znajdź wszystkie rezerwacje dla danego obrazu
    List<Rezerwacja> findByObrazId(Integer obrazId);
}