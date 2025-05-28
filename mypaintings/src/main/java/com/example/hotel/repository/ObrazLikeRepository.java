package com.example.hotel.repository;

import com.example.hotel.model.ObrazLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ObrazLikeRepository extends JpaRepository<ObrazLike, Long> {
    
    Optional<ObrazLike> findByIdHoteluAndIdObrazu(Long idHotelu, Long idObrazu);
    
    void deleteByIdHoteluAndIdObrazu(Long idHotelu, Long idObrazu);
    
    boolean existsByIdHoteluAndIdObrazu(Long idHotelu, Long idObrazu);
}