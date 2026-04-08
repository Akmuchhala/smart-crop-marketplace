package com.smartcrops.marketplace.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "crops")
public class CropListing {
    @Id
    private String id;
    private String name;
    private Double price;
    private Double quantity;
    private String location;
    private String description;
    private String farmerName;
    private String farmerPhone;
    private String image;
    private List<String> images;

    public CropListing() {}

    public CropListing(String id, String name, Double price, Double quantity, String location, String description, String farmerName, String farmerPhone, String image, List<String> images) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.location = location;
        this.description = description;
        this.farmerName = farmerName;
        this.farmerPhone = farmerPhone;
        this.image = image;
        this.images = images;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }
    public String getFarmerPhone() { return farmerPhone; }
    public void setFarmerPhone(String farmerPhone) { this.farmerPhone = farmerPhone; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
}
