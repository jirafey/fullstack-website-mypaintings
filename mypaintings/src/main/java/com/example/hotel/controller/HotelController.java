package com.example.hotel.controller;

import com.example.api.HotelApi;
import com.example.hotel.service.HotelService;
import com.example.hotel.service.ObrazLikeService;
import com.example.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HotelController implements HotelApi {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private ObrazLikeService obrazLikeService;

    @Override
    public ResponseEntity<ResponseHotelArtystaFollow> hotelArtystaFollowIdArtystyPost(String authorization, Integer idArtysty) {
        return hotelService.dodajFollow(authorization, idArtysty);
    }

    @Override
    public ResponseEntity<ResponseHotelArtystaUnfollow> hotelArtystaFollowIdArtystyDelete(String authorization, Integer idArtysty) {
        return hotelService.usunFollow(authorization, idArtysty);
    }
    
    @Override
    public ResponseEntity<ResponseHotelPaintingLike> hotelPaintingLikeImageIdPost(String authorization, Integer imageId) {
        boolean success = obrazLikeService.dodajLike(authorization, imageId.longValue());

        if (success) {
            ResponseHotelPaintingLike response = new ResponseHotelPaintingLike();
            response.setMessage("Polubiono obraz");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<ResponseHotelPaintingUnlike> hotelPaintingLikeImageIdDelete(String authorization, Integer imageId) {
        boolean success = obrazLikeService.usunLike(authorization, imageId.longValue());

        if (success) {
            ResponseHotelPaintingUnlike response = new ResponseHotelPaintingUnlike();
            response.setMessage("Usunięto polubienie obrazu");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


    @Override
    public ResponseEntity<ResponseHotelFollowedartists> hotelFollowedartistsGet(String authorization) {
        try {
            ResponseHotelFollowedartists response = hotelService.getFollowedArtists(authorization);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    public ResponseEntity<ResponseHotelSell> hotelSellImageIdPost(
            @RequestHeader(value="Authorization", required=true) String authorization,
            @PathVariable("image_id") Integer imageId) {

        return hotelService.oznaczJakoSprzedany(authorization, imageId);
    }



    // W HotelApi.java zaktualizuj metodę:
    @Override
    public ResponseEntity<ResponseHotelOwnedpaintings> hotelOwnedpaintingsGet(@RequestHeader(value="Authorization", required=true) String authorization) {
        return new HotelService().getOwnedPaintings(authorization);
    }


    @GetMapping("/feed")
    public ResponseEntity<ResponseHotelFeed> getHotelFeed(@RequestHeader("Authorization") String authorization) {
        return hotelService.getHotelFeed(authorization);
    }



}