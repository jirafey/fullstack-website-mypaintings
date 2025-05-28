package com.example.hotel.service;

import com.example.artysta.model.Dzielo;
import com.example.artysta.repository.DzieloRepository;
import com.example.hotel.model.ObrazLike;
import com.example.hotel.repository.ObrazLikeRepository;
import com.example.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObrazLikeService {
    
    @Autowired
    private ObrazLikeRepository obrazLikeRepository;
    
    @Autowired
    private DzieloRepository dzieloRepository;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Transactional
    public boolean dodajLike(String token, Long idObrazu) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        Long idHotelu = jwtTokenProvider.getUserIdFromToken(jwt);
        
        // Sprawdź czy obraz istnieje
        Dzielo dzielo = dzieloRepository.findById(idObrazu)
                .orElseThrow(() -> new RuntimeException("Obraz o ID " + idObrazu + " nie istnieje"));
        
        // Sprawdź czy hotel już polubił ten obraz
        if (obrazLikeRepository.existsByIdHoteluAndIdObrazu(idHotelu, idObrazu)) {
            return false; // Hotel już polubił ten obraz
        }
        
        // Dodaj like do tabeli polubień
        obrazLikeRepository.save(new ObrazLike(idHotelu, idObrazu));
        
        // Zwiększ licznik like'ów w dziele
        dzielo.setLikes(dzielo.getLikes() + 1);
        dzieloRepository.save(dzielo);
        
        return true;
    }
    
    @Transactional
    public boolean usunLike(String token, Long idObrazu) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        Long idHotelu = jwtTokenProvider.getUserIdFromToken(jwt);


        // Sprawdź czy obraz istnieje
        Dzielo dzielo = dzieloRepository.findById(idObrazu)
                .orElseThrow(() -> new RuntimeException("Obraz o ID " + idObrazu + " nie istnieje"));
        
        // Sprawdź czy hotel polubił ten obraz
        if (!obrazLikeRepository.existsByIdHoteluAndIdObrazu(idHotelu, idObrazu)) {
            return false; // Hotel nie polubił tego obrazu
        }
        
        // Znajdź i usuń like
        ObrazLike like = obrazLikeRepository.findByIdHoteluAndIdObrazu(idHotelu, idObrazu)
                .orElseThrow(() -> new RuntimeException("Like nie istnieje"));
        obrazLikeRepository.delete(like);
        
        // Zmniejsz licznik like'ów w dziele
        dzielo.setLikes(dzielo.getLikes() - 1);
        dzieloRepository.save(dzielo);
        
        return true;
    }
}