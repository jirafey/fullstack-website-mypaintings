package com.example.hotel.repository;

import com.example.hotel.model.WlasnoscHotelu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WlasnoscHoteluRepository extends JpaRepository<WlasnoscHotelu, Long> {
    Optional<WlasnoscHotelu> findByObrazId(Long obrazId);
    List<WlasnoscHotelu> findAllByStatus(String status);

    List<WlasnoscHotelu> findAllByArtystaIdAndStatus(Long artystaId, String sold);

    List<WlasnoscHotelu> findByHotelId(Long hotelId);
}