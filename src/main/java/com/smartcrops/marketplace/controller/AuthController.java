package com.smartcrops.marketplace.controller;

import com.smartcrops.marketplace.model.User;
import com.smartcrops.marketplace.repository.UserRepository;
import com.smartcrops.marketplace.security.JwtUtils;
import com.smartcrops.marketplace.security.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByPhone(user.getPhone()).isPresent()) {
            return ResponseEntity.badRequest().body("Phone number already registered");
        }
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // Generate token for immediate login after registration
        final UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getPhone());
        final String jwt = jwtUtils.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("jwt", jwt);
        response.put("user", savedUser);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getPhone(), loginRequest.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getPhone());
        final String jwt = jwtUtils.generateToken(userDetails);
        
        Optional<User> user = userRepository.findByPhone(loginRequest.getPhone());
        
        Map<String, Object> response = new HashMap<>();
        response.put("jwt", jwt);
        response.put("user", user.get());
        
        return ResponseEntity.ok(response);
    }
}
