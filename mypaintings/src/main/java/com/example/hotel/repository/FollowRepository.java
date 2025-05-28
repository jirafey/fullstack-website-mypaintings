package com.example.hotel.repository;

import com.example.hotel.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    
    Optional<Follow> findByHotelIdAndArtystaId(Long hotelId, Long artystaId);
    
    List<Follow> findByHotelId(Long hotelId);
}