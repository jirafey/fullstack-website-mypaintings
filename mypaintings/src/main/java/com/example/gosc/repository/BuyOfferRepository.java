package com.example.gosc.repository;

import com.example.gosc.model.BuyOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BuyOfferRepository extends JpaRepository<BuyOffer, Long> {
    List<BuyOffer> findByImageId(Long imageId);
    Optional<BuyOffer> findByImageIdAndBuyerId(Long imageId, Long buyerId);

    List<BuyOffer> findByBuyerId(Long guestId);
}