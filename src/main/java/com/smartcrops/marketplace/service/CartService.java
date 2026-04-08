package com.smartcrops.marketplace.service;

import com.smartcrops.marketplace.model.Cart;
import com.smartcrops.marketplace.model.CartItem;
import com.smartcrops.marketplace.model.CropListing;
import com.smartcrops.marketplace.repository.CartRepository;
import com.smartcrops.marketplace.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service for cart operations
 */
@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CropRepository cropRepository;

    /**
     * Check if a file is a video based on extension
     */
    private boolean isVideoFile(String fileName) {
        if (fileName == null || fileName.isEmpty()) return false;
        String lowerCase = fileName.toLowerCase();
        return lowerCase.endsWith(".mp4") || lowerCase.endsWith(".webm") ||
               lowerCase.endsWith(".avi") || lowerCase.endsWith(".mkv") ||
               lowerCase.endsWith(".mov") || lowerCase.endsWith(".flv") ||
               lowerCase.endsWith(".wmv") || lowerCase.endsWith(".m4v");
    }

    /**
     * Get a proper image from crop (picks image instead of video)
     */
    private String getCartImageFromCrop(CropListing crop) {
        // First, check if the main image is a video
        String mainImage = crop.getImage();
        if (mainImage != null && !isVideoFile(mainImage)) {
            return mainImage; // Main image is not a video, use it
        }

        // Main image is a video or null, try to find an image from images array
        List<String> images = crop.getImages();
        if (images != null && !images.isEmpty()) {
            for (String image : images) {
                if (image != null && !isVideoFile(image)) {
                    return image; // Found a non-video image
                }
            }
        }

        // No suitable image found, use placeholder
        return "/images/placeholder.jpg";
    }

    /**
     * Get or create cart for user
     */
    public Cart getOrCreateCart(String userId) {
        return cartRepository.findByUserId(userId)
            .orElseGet(() -> {
                Cart newCart = new Cart(userId);
                return cartRepository.save(newCart);
            });
    }

    /**
     * Add item to cart
     */
    public Cart addItemToCart(String userId, String cropId, Double quantity) {
        // Get crop details
        CropListing crop = cropRepository.findById(cropId)
            .orElseThrow(() -> new RuntimeException("Crop not found"));

        // Get or create cart
        Cart cart = getOrCreateCart(userId);

        // Get proper image (not video) for cart display
        String cartImage = getCartImageFromCrop(crop);

        // Create cart item from crop
        CartItem cartItem = new CartItem(
            crop.getId(),
            crop.getName(),
            crop.getPrice(),
            quantity,
            cartImage
        );

        // Add item to cart
        cart.addItem(cartItem);

        // Save cart
        return cartRepository.save(cart);
    }

    /**
     * Remove item from cart
     */
    public Cart removeItemFromCart(String userId, String cropId) {
        Cart cart = getOrCreateCart(userId);
        cart.removeItem(cropId);
        return cartRepository.save(cart);
    }

    /**
     * Update item quantity in cart
     */
    public Cart updateItemQuantity(String userId, String cropId, Double quantity) {
        Cart cart = getOrCreateCart(userId);

        CartItem item = cart.getItems().stream()
            .filter(i -> i.getCropId().equals(cropId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        if (quantity <= 0) {
            cart.removeItem(cropId);
        } else {
            item.setQuantity(quantity);
            cart.setUpdatedAt(java.time.LocalDateTime.now());
        }

        return cartRepository.save(cart);
    }

    /**
     * Clear cart
     */
    public Cart clearCart(String userId) {
        Cart cart = getOrCreateCart(userId);
        cart.clear();
        return cartRepository.save(cart);
    }

    /**
     * Get user's cart
     */
    public Cart getUserCart(String userId) {
        return getOrCreateCart(userId);
    }
}
