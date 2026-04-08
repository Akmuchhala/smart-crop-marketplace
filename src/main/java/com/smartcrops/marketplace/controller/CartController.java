package com.smartcrops.marketplace.controller;

import com.smartcrops.marketplace.model.Cart;
import com.smartcrops.marketplace.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for cart operations
 * All endpoints require authentication (JWT token)
 */
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * Get current authenticated user's ID (phone number)
     */
    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        throw new RuntimeException("User not authenticated");
    }

    /**
     * Get current user's cart
     * GET /api/cart
     */
    @GetMapping
    public ResponseEntity<?> getCart() {
        try {
            String userId = getCurrentUserId();
            Cart cart = cartService.getUserCart(userId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unauthorized: " + e.getMessage());
        }
    }

    /**
     * Add item to cart
     * POST /api/cart/add
     * Body: { "cropId": "...", "quantity": 1.5 }
     */
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request) {
        try {
            String userId = getCurrentUserId();
            Cart updatedCart = cartService.addItemToCart(userId, request.getCropId(), request.getQuantity());
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * Remove item from cart
     * DELETE /api/cart/remove/{cropId}
     */
    @DeleteMapping("/remove/{cropId}")
    public ResponseEntity<?> removeFromCart(@PathVariable String cropId) {
        try {
            String userId = getCurrentUserId();
            Cart updatedCart = cartService.removeItemFromCart(userId, cropId);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * Update item quantity in cart
     * PUT /api/cart/update/{cropId}
     * Body: { "quantity": 2.5 }
     */
    @PutMapping("/update/{cropId}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable String cropId,
            @RequestBody UpdateQuantityRequest request) {
        try {
            String userId = getCurrentUserId();
            Cart updatedCart = cartService.updateItemQuantity(userId, cropId, request.getQuantity());
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * Clear entire cart
     * DELETE /api/cart/clear
     */
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart() {
        try {
            String userId = getCurrentUserId();
            Cart clearedCart = cartService.clearCart(userId);
            return ResponseEntity.ok(clearedCart);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * Request body for adding item to cart
     */
    public static class AddToCartRequest {
        private String cropId;
        private Double quantity;

        public String getCropId() { return cropId; }
        public void setCropId(String cropId) { this.cropId = cropId; }
        public Double getQuantity() { return quantity; }
        public void setQuantity(Double quantity) { this.quantity = quantity; }
    }

    /**
     * Request body for updating quantity
     */
    public static class UpdateQuantityRequest {
        private Double quantity;

        public Double getQuantity() { return quantity; }
        public void setQuantity(Double quantity) { this.quantity = quantity; }
    }
}
