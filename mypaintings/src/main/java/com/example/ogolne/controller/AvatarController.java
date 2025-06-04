package com.example.ogolne.controller;

import com.example.api.OgolneApi;
import com.example.model.*;
import com.example.ogolne.service.AvatarService;
import com.example.ogolne.service.FileStorageService;
import com.example.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class AvatarController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private AvatarService AvatarService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Value("${file.base-url}")
    private String fileBaseUrl;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = fileStorageService.storeFile(file);
            return ResponseEntity.ok(fileBaseUrl + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not upload the file: " + file.getOriginalFilename());
        }
    }

    public ResponseEntity<ResponseOgolneAvatarUpdate> ogolneAvatarPut(
            @RequestHeader(value="Authorization", required=true) String authorization,
            @Valid @RequestBody RequestOgolneAvatarUpdate body) {

        String jwt = authorization.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(jwt);

        try {
            String avatarUrl = AvatarService.updateUserAvatar(userId, body.getAvatarUrl());

            ResponseOgolneAvatarUpdate response = new ResponseOgolneAvatarUpdate();
            response.setMessage("Link do awatara został zaktualizowany.");
            response.setAvatarUrl(avatarUrl);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<ResponseOgolneAvatarGet> ogolneAvatarIdGet(@PathVariable("id") Integer id) {
        String avatarUrl = AvatarService.getUserAvatarUrl(id.longValue());

        if (avatarUrl == null) {
            return ResponseEntity.notFound().build();
        }

        ResponseOgolneAvatarGet response = new ResponseOgolneAvatarGet();
        response.setAvatarUrl(avatarUrl);
        return ResponseEntity.ok(response);
    }
}