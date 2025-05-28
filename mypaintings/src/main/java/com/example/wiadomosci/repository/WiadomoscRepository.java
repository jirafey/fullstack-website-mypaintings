package com.example.wiadomosci.repository;

import com.example.wiadomosci.model.Wiadomosc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WiadomoscRepository extends JpaRepository<Wiadomosc, Integer> {
    List<Wiadomosc> findBySenderId(Long senderId);
    List<Wiadomosc> findByRecipientId(Integer recipientId);
    List<Wiadomosc> findBySenderIdAndRecipientId(Long senderId, Integer recipientId);

    // Nowa metoda z zapytaniem JPQL, które zwraca najnowsze wiadomości z każdym użytkownikiem
    @Query("SELECT w FROM Wiadomosc w WHERE w.timestamp = " +
            "(SELECT MAX(w2.timestamp) FROM Wiadomosc w2 WHERE " +
            "(w2.senderId = :userId AND w2.recipientId = w.recipientId) OR " +
            "(w2.recipientId = :userId AND w2.senderId = w.senderId)) " +
            "AND ((w.senderId = :userId) OR (w.recipientId = :userId))")
    List<Wiadomosc> findLatestMessagesByUser(@Param("userId") Long userId);
}