package com.example;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class    SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Wyłącz CSRF (wymagane dla H2 Console)
                .headers(headers -> headers
                        .frameOptions(frame -> frame.disable())  // Zezwól na iframe (H2 używa iframe)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll()  // Zezwól na dostęp bez logowania
                        .requestMatchers("/ogolne/rejestracja").permitAll()  // Zezwól na dostęp bez logowania
                        .requestMatchers("/ogolne/logowanie").permitAll()  // Zezwól na dostęp bez logowania
                        .requestMatchers("/artysta/**").permitAll()
                        .requestMatchers("/hotel/**").permitAll()
                        .requestMatchers("/gosc/**").permitAll()
                        .requestMatchers("/ogolne/**").permitAll()
                        .requestMatchers("/wiadomosci/**").permitAll()
                        .anyRequest().authenticated()  // Wszystkie inne endpointy wymagają logowania
                );
        return http.build();
    }


}