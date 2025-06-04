package com.example.ogolne.repository;

import com.example.ogolne.model.UserAvatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAvatarRepository extends JpaRepository<UserAvatar, Long> {
    UserAvatar findByUserId(Long userId);
}