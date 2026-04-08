package com.smartcrops.marketplace.model;

/**
 * Represents a single item in the shopping cart
 */
public class CartItem {
    private String cropId;          // Reference to the crop listing
    private String cropName;        // Crop name for display
    private Double price;           // Price per quintal
    private Double quantity;        // Quantity added to cart
    private String image;           // Crop image URL

    public CartItem() {}

    public CartItem(String cropId, String cropName, Double price, Double quantity, String image) {
        this.cropId = cropId;
        this.cropName = cropName;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }

    // Getters and Setters
    public String getCropId() { return cropId; }
    public void setCropId(String cropId) { this.cropId = cropId; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    /**
     * Calculate subtotal for this cart item
     */
    public Double getSubtotal() {
        return price != null && quantity != null ? price * quantity : 0.0;
    }
}
