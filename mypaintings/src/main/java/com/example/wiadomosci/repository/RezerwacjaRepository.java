package com.example.wiadomosci.repository;

import com.example.wiadomosci.model.Rezerwacja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RezerwacjaRepository extends JpaRepository<Rezerwacja, Integer> {
    Optional<Rezerwacja> findByObrazIdAndUzytkownikId(Integer obrazId, Long uzytkownikId);
    
    // Znajdź wszystkie rezerwacje dla danego obrazu
    List<Rezerwacja> findByObrazId(Integer obrazId);
    List<Rezerwacja> findByUzytkownikId(Long uzytkownikId);


    @Query("SELECT r FROM Rezerwacja r " +
            "JOIN Dzielo d ON r.obrazId = d.id " +
            "WHERE r.uzytkownikId = :userId AND d.artystaId = :artystaId")
    List<Rezerwacja> findByUzytkownikIdAndArtystaId(@Param("userId") Long userId,
                                                    @Param("artystaId") Long artystaId);

}