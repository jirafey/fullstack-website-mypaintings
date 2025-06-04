package com.example.hotel.repository;

import com.example.hotel.model.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Integer> {
    Optional<DeliveryInfo> findByPaintingId(int i);
}