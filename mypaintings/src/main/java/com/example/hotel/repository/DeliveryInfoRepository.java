package com.example.hotel.repository;

import com.example.hotel.model.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Integer> {
}