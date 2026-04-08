package com.smartcrops.marketplace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.smartcrops.marketplace.model.CropListing;
import com.smartcrops.marketplace.dto.PricingSuggestionResponse;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Logger;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;

@Service
public class AIAssistantService {

    private static final Logger logger = Logger.getLogger(AIAssistantService.class.getName());

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private AIProviderService aiProviderService;

    /**
     * Get pricing suggestions for a crop in a specific region
     */
    public PricingSuggestionResponse getPricingSuggestions(String cropName, String state, String district, Double farmerPrice) {
        try {
            // Query similar crops in the same region from MongoDB
            List<Double> prices = getSimilarCropPrices(cropName, state, district);

            if (prices.isEmpty()) {
                // No similar crops found, return default response
                return createDefaultPricingResponse(cropName, farmerPrice);
            }

            // Calculate statistics
            Collections.sort(prices);
            Double minPrice = prices.get(0);
            Double maxPrice = prices.get(prices.size() - 1);
            Double avgPrice = prices.stream().mapToDouble(Double::doubleValue).average().orElse(minPrice);

            // Determine recommended price (slightly below average)
            Double recommendedPrice = avgPrice * 0.95;

            // Determine status
            String status = determineStatus(farmerPrice, minPrice, maxPrice, avgPrice);

            // Get trend analysis
            String[] trendData = analyzeTrend(cropName, state, district);
            String trend = trendData[0];
            Integer trendPercentage = Integer.parseInt(trendData[1]);

            // Get AI-powered reasoning
            String reasoning = aiProviderService.generatePricingAnalysis(
                    cropName, state, district, farmerPrice, minPrice, maxPrice, avgPrice
            );

            // Get similar listings count
            int similarCount = prices.size();
            String reasoningWithCount = reasoning + " (Based on " + similarCount + " similar listings)";

            return new PricingSuggestionResponse(
                    cropName,
                    minPrice,
                    maxPrice,
                    avgPrice,
                    recommendedPrice,
                    status,
                    trend,
                    trendPercentage,
                    reasoningWithCount,
                    getCurrentTimestamp()
            );

        } catch (Exception e) {
            logger.severe("Error getting pricing suggestions: " + e.getMessage());
            return createDefaultPricingResponse(cropName, farmerPrice);
        }
    }

    /**
     * Get prices of similar crops from MongoDB
     */
    private List<Double> getSimilarCropPrices(String cropName, String state, String district) {
        try {
            Aggregation aggregation = newAggregation(
                    match(Criteria.where("name").regex(cropName, "i")
                            .and("location.state").is(state)
                            .and("location.district").is(district)),
                    project("price"),
                    sort(Sort.Direction.ASC, "price")
            );

            List<Map> results = mongoTemplate.aggregate(aggregation, "cropListing", Map.class).getMappedResults();
            List<Double> prices = new ArrayList<>();

            for (Map result : results) {
                Object priceObj = result.get("price");
                if (priceObj instanceof Double) {
                    prices.add((Double) priceObj);
                } else if (priceObj instanceof Integer) {
                    prices.add(((Integer) priceObj).doubleValue());
                } else if (priceObj instanceof String) {
                    try {
                        prices.add(Double.parseDouble((String) priceObj));
                    } catch (NumberFormatException e) {
                        // Skip invalid prices
                    }
                }
            }

            return prices;
        } catch (Exception e) {
            logger.warning("Error querying similar crop prices: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Determine pricing status based on comparison with market
     */
    private String determineStatus(Double farmerPrice, Double minPrice, Double maxPrice, Double avgPrice) {
        if (farmerPrice >= avgPrice * 0.9 && farmerPrice <= avgPrice * 1.1) {
            return "competitive";
        } else if (farmerPrice > maxPrice) {
            return "overpriced";
        } else if (farmerPrice < minPrice) {
            return "underpriced";
        } else {
            return "competitive";
        }
    }

    /**
     * Analyze price trends over time
     */
    private String[] analyzeTrend(String cropName, String state, String district) {
        try {
            // Get prices from last 30 days (simplified - would need timestamp in real scenario)
            List<Double> prices = getSimilarCropPrices(cropName, state, district);

            if (prices.size() < 2) {
                return new String[]{"stable", "0"};
            }

            Double firstSegment = prices.subList(0, prices.size() / 2)
                    .stream()
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0);

            Double secondSegment = prices.subList(prices.size() / 2, prices.size())
                    .stream()
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0);

            if (firstSegment == 0 || secondSegment == 0) {
                return new String[]{"stable", "0"};
            }

            Integer percentageChange = (int) ((secondSegment - firstSegment) / firstSegment * 100);
            String trend = percentageChange > 2 ? "rising" : percentageChange < -2 ? "falling" : "stable";

            return new String[]{trend, String.valueOf(Math.abs(percentageChange))};

        } catch (Exception e) {
            logger.warning("Error analyzing trend: " + e.getMessage());
            return new String[]{"stable", "0"};
        }
    }

    /**
     * Create default response when no similar crops found
     */
    private PricingSuggestionResponse createDefaultPricingResponse(String cropName, Double farmerPrice) {
        // If no market data, suggest price based on general agriculture knowledge
        Double suggestedPrice = farmerPrice > 0 ? farmerPrice : 1000;
        Double minPrice = suggestedPrice * 0.7;
        Double maxPrice = suggestedPrice * 1.3;

        return new PricingSuggestionResponse(
                cropName,
                minPrice,
                maxPrice,
                suggestedPrice,
                suggestedPrice,
                "competitive",
                "stable",
                0,
                "No similar listings found in this region. Consider researching local market rates.",
                getCurrentTimestamp()
        );
    }

    /**
     * Get current timestamp in ISO format
     */
    private String getCurrentTimestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }

    /**
     * Get trending crops in a region for recommendations
     */
    public List<Map<String, Object>> getTrendingCrops(String state, String district, int limit) {
        try {
            Aggregation aggregation = newAggregation(
                    match(Criteria.where("location.state").is(state)
                            .and("location.district").is(district)),
                    group("name")
                            .count().as("count")
                            .first("price").as("price"),
                    sort(Sort.Direction.DESC, "count"),
                    limit(limit)
            );

            return (List<Map<String,Object>>)(List<?>) mongoTemplate.aggregate(aggregation, "cropListing", Map.class).getMappedResults();

        } catch (Exception e) {
            logger.warning("Error getting trending crops: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Get price history for a crop
     */
    public List<Map<String, Object>> getPriceHistory(String cropName, String state, String district) {
        try {
            Aggregation aggregation = newAggregation(
                    match(Criteria.where("name").regex(cropName, "i")
                            .and("location.state").is(state)
                            .and("location.district").is(district)),
                    group().min("price").as("minPrice")
                            .max("price").as("maxPrice")
                            .avg("price").as("avgPrice"),
                    project()
                            .and("minPrice").as("min")
                            .and("maxPrice").as("max")
                            .and("avgPrice").as("average")
            );

            return (List<Map<String,Object>>)(List<?>) mongoTemplate.aggregate(aggregation, "cropListing", Map.class).getMappedResults();

        } catch (Exception e) {
            logger.warning("Error getting price history: " + e.getMessage());
            return new ArrayList<>();
        }
    }
}
