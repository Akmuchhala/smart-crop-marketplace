package com.smartcrops.marketplace.dto;

public class PricingSuggestionRequest {
    private String cropName;
    private String state;
    private String district;
    private Double farmerPrice;

    public PricingSuggestionRequest() {
    }

    public PricingSuggestionRequest(String cropName, String state, String district, Double farmerPrice) {
        this.cropName = cropName;
        this.state = state;
        this.district = district;
        this.farmerPrice = farmerPrice;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public Double getFarmerPrice() {
        return farmerPrice;
    }

    public void setFarmerPrice(Double farmerPrice) {
        this.farmerPrice = farmerPrice;
    }
}
