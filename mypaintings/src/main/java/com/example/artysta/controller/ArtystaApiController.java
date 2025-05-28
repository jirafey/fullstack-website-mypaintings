package com.example.artysta.controller;

import com.example.api.ArtystaApi;
import com.example.artysta.service.ArtystaService;
import com.example.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ArtystaApiController implements ArtystaApi {

    @Autowired
    private ArtystaService artystaService;

    @Override
    public ResponseEntity<ResponseArtystaDzielo> artystaDzieloPost(
            @RequestHeader(value="Authorization", required=true) String authorization,
            @RequestBody RequestArtystaDzielo body) {

        ResponseArtystaDzielo response = artystaService.dodajDzielo(authorization, body);
        return ResponseEntity.status(201).body(response);
    }

    @Override
    public ResponseEntity<ResponseArtystaMojedziela> artystaMojedzielaGet(
            @RequestHeader(value="Authorization", required=true) String authorization) {

        ResponseArtystaMojedziela response = artystaService.getMojeDziela(authorization);
        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<ResponseArtystaDzieloDelete> artystaDzieloImageIdDelete(
            @RequestHeader(value = "Authorization") String authorization,
            @PathVariable("image_id") Integer imageId) {
        return artystaService.usunDzielo(authorization, imageId);
    }

    @Override
    public ResponseEntity<ResponseArtystaStronahotelu> artystaStronahoteluIdHoteluGet(Integer idHotelu) {
        return artystaService.getStronaHotelu(idHotelu);
    }



}