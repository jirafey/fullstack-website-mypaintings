package com.example.hotel.repository;

import com.example.hotel.model.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QrCodeRepository extends JpaRepository<QrCode, Long> {
    Optional<QrCode> findByImageId(Long imageId);
}