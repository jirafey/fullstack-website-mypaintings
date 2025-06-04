package com.example.ogolne.service;

import com.example.ogolne.model.User;
import com.example.ogolne.model.UserAvatar;
import com.example.ogolne.repository.UserAvatarRepository;
import com.example.ogolne.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AvatarService {

    @Autowired
    private UserAvatarRepository userAvatarRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public String updateUserAvatar(Long userId, String avatarUrl) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        UserAvatar userAvatar = userAvatarRepository.findByUserId(userId);
        if (userAvatar == null) {
            userAvatar = new UserAvatar();
            userAvatar.setUser(user);
        }

        userAvatar.setAvatarUrl(avatarUrl);
        userAvatarRepository.save(userAvatar);

        return avatarUrl;
    }

    public String getUserAvatarUrl(Long userId) {
        UserAvatar userAvatar = userAvatarRepository.findByUserId(userId);
        return userAvatar != null ? userAvatar.getAvatarUrl() : null;
    }
}