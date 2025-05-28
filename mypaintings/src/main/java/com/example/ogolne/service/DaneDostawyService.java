package com.example.ogolne.service;

import com.example.model.RequestOgolneDaneDostawy;
import com.example.model.ResponseOgolneDaneDostawy;
import com.example.model.ResponseOgolneDaneDostawyDaneDostawy;
import com.example.ogolne.model.DaneDostawy;
import com.example.ogolne.repository.DaneDostawyRepository;
import com.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DaneDostawyService {

    @Autowired
    private DaneDostawyRepository daneDostawyRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public ResponseEntity<ResponseOgolneDaneDostawy> updateDaneDostawy(String token, RequestOgolneDaneDostawy request) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        // Pobierz ID użytkownika z tokena JWT
        Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Sprawdź czy dane dostawy już istnieją dla tego użytkownika
        Optional<DaneDostawy> existingDaneDostawy = daneDostawyRepository.findByUserId(userId);

        // Tworzenie lub aktualizacja danych dostawy
        DaneDostawy daneDostawy;
        if (existingDaneDostawy.isPresent()) {
            daneDostawy = existingDaneDostawy.get();
        } else {
            daneDostawy = new DaneDostawy();
            daneDostawy.setUserId(userId);
        }

        // Aktualizacja danych
        daneDostawy.setStreetAddress(request.getStreetAddress());
        daneDostawy.setCity(request.getCity());
        daneDostawy.setStateProvinceRegion(request.getStateProvinceRegion());
        daneDostawy.setZipCode(request.getZipCode());
        daneDostawy.setEmailAddress(request.getEmailAddress());
        daneDostawy.setPhoneNumber(request.getPhoneNumber());

        // Zapisz do bazy danych
        daneDostawy = daneDostawyRepository.save(daneDostawy);

        // Tworzenie odpowiedzi
        ResponseOgolneDaneDostawy response = new ResponseOgolneDaneDostawy();
        response.setMessage("Dane dostawy zostały zaktualizowane.");
        
        ResponseOgolneDaneDostawyDaneDostawy responseDaneDostawy = new ResponseOgolneDaneDostawyDaneDostawy();
        responseDaneDostawy.setStreetAddress(daneDostawy.getStreetAddress());
        responseDaneDostawy.setCity(daneDostawy.getCity());
        responseDaneDostawy.setStateProvinceRegion(daneDostawy.getStateProvinceRegion());
        responseDaneDostawy.setZipCode(daneDostawy.getZipCode());
        responseDaneDostawy.setEmailAddress(daneDostawy.getEmailAddress());
        responseDaneDostawy.setPhoneNumber(daneDostawy.getPhoneNumber());
        
        response.setDaneDostawy(responseDaneDostawy);

        return ResponseEntity.ok(response);
    }
    
    public ResponseEntity<ResponseOgolneDaneDostawy> getDaneDostawy(String token) {
        // Usuń "Bearer " z tokena
        String jwt = token.substring(7);

        // Pobierz ID użytkownika z tokena JWT
        Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

        // Sprawdź czy dane dostawy istnieją dla tego użytkownika
        Optional<DaneDostawy> daneDostawyOpt = daneDostawyRepository.findByUserId(userId);
        
        if (daneDostawyOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        DaneDostawy daneDostawy = daneDostawyOpt.get();
        
        // Tworzenie odpowiedzi
        ResponseOgolneDaneDostawy response = new ResponseOgolneDaneDostawy();
        response.setMessage("Dane dostawy pobrane pomyślnie.");
        
        ResponseOgolneDaneDostawyDaneDostawy responseDaneDostawy = new ResponseOgolneDaneDostawyDaneDostawy();
        responseDaneDostawy.setStreetAddress(daneDostawy.getStreetAddress());
        responseDaneDostawy.setCity(daneDostawy.getCity());
        responseDaneDostawy.setStateProvinceRegion(daneDostawy.getStateProvinceRegion());
        responseDaneDostawy.setZipCode(daneDostawy.getZipCode());
        responseDaneDostawy.setEmailAddress(daneDostawy.getEmailAddress());
        responseDaneDostawy.setPhoneNumber(daneDostawy.getPhoneNumber());
        
        response.setDaneDostawy(responseDaneDostawy);

        return ResponseEntity.ok(response);
    }
}