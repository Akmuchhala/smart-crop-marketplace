package com.smartcrops.marketplace.controller;

import com.smartcrops.marketplace.model.User;
import com.smartcrops.marketplace.repository.UserRepository;
import com.smartcrops.marketplace.security.JwtUtils;
import com.smartcrops.marketplace.security.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    /**
     * Change password with old password verification
     * POST /api/auth/change-password
     * Body: { "oldPassword": "...", "newPassword": "..." }
     */
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            // Get authenticated user from security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("User not authenticated");
            }

            String phone = authentication.getName();

            // Find user by phone
            Optional<User> optionalUser = userRepository.findByPhone(phone);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.status(404).body("User not found");
            }

            User user = optionalUser.get();

            // Verify old password
            if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                return ResponseEntity.status(401).body("Old password is incorrect");
            }

            // Validate new password
            if (request.getNewPassword() == null || request.getNewPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("New password cannot be empty");
            }

            if (request.getNewPassword().length() < 6) {
                return ResponseEntity.badRequest().body("New password must be at least 6 characters");
            }

            // Update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("message", "Password changed successfully");
            }});

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error changing password: " + e.getMessage());
        }
    }

    /**
     * Request body for changing password
     */
    public static class ChangePasswordRequest {
        private String oldPassword;
        private String newPassword;

        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }

        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}
