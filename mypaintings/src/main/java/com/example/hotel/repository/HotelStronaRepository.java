package com.example.hotel.repository;

import com.example.hotel.model.HotelStrona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HotelStronaRepository extends JpaRepository<HotelStrona, Long> {
    Optional<HotelStrona> findByHotelId(Long hotelId);
}