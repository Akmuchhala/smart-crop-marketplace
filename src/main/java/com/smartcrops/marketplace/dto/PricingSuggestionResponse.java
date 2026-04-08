package com.smartcrops.marketplace.dto;

public class PricingSuggestionResponse {
    private String cropName;
    private Double minPrice;
    private Double maxPrice;
    private Double averagePrice;
    private Double recommendedPrice;
    private String status; // competitive | overpriced | underpriced
    private String trend; // rising | stable | falling
    private Integer trendPercentage;
    private String reasoning;
    private String lastUpdated;

    public PricingSuggestionResponse() {
    }

    public PricingSuggestionResponse(String cropName, Double minPrice, Double maxPrice, Double averagePrice,
                                     Double recommendedPrice, String status, String trend, Integer trendPercentage,
                                     String reasoning, String lastUpdated) {
        this.cropName = cropName;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.averagePrice = averagePrice;
        this.recommendedPrice = recommendedPrice;
        this.status = status;
        this.trend = trend;
        this.trendPercentage = trendPercentage;
        this.reasoning = reasoning;
        this.lastUpdated = lastUpdated;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public Double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Double minPrice) {
        this.minPrice = minPrice;
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(Double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public Double getRecommendedPrice() {
        return recommendedPrice;
    }

    public void setRecommendedPrice(Double recommendedPrice) {
        this.recommendedPrice = recommendedPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTrend() {
        return trend;
    }

    public void setTrend(String trend) {
        this.trend = trend;
    }

    public Integer getTrendPercentage() {
        return trendPercentage;
    }

    public void setTrendPercentage(Integer trendPercentage) {
        this.trendPercentage = trendPercentage;
    }

    public String getReasoning() {
        return reasoning;
    }

    public void setReasoning(String reasoning) {
        this.reasoning = reasoning;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
