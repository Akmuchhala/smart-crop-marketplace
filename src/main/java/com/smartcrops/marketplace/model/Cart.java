package com.smartcrops.marketplace.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

/**
 * Represents a shopping cart for a user
 * Each user has one cart associated with their account
 */
@Document(collection = "carts")
public class Cart {
    @Id
    private String id;
    private String userId;              // Reference to user (phone number)
    private List<CartItem> items;       // Items in the cart
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Cart() {
        this.items = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Cart(String userId) {
        this.userId = userId;
        this.items = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    /**
     * Add or update item in cart
     */
    public void addItem(CartItem newItem) {
        CartItem existing = items.stream()
            .filter(item -> item.getCropId().equals(newItem.getCropId()))
            .findFirst()
            .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + newItem.getQuantity());
        } else {
            items.add(newItem);
        }
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Remove item from cart by crop ID
     */
    public void removeItem(String cropId) {
        items.removeIf(item -> item.getCropId().equals(cropId));
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Calculate total cart value
     */
    public Double getTotal() {
        return items.stream()
            .mapToDouble(CartItem::getSubtotal)
            .sum();
    }

    /**
     * Get total number of items in cart
     */
    public Integer getTotalItems() {
        return items.stream()
            .mapToInt(item -> item.getQuantity().intValue())
            .sum();
    }

    /**
     * Clear all items from cart
     */
    public void clear() {
        items.clear();
        this.updatedAt = LocalDateTime.now();
    }
}
