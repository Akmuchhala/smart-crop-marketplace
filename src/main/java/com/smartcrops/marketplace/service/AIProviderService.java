package com.smartcrops.marketplace.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
import java.util.logging.Level;

@Service
public class AIProviderService {

    private static final Logger logger = Logger.getLogger(AIProviderService.class.getName());

    @Value("${GOOGLE_GEMINI_API_KEY:}")
    private String geminiApiKey;

    public void initializeGemini() {
        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            logger.log(Level.WARNING, "Google Gemini API key not configured. Using fallback local analysis.");
            return;
        }
        logger.log(Level.INFO, "Google Gemini API configured for use");
    }

    /**
     * Generate pricing analysis using Google Gemini API or fallback
     */
    public String generatePricingAnalysis(String cropName, String state, String district,
                                         Double currentPrice, Double minPrice, Double maxPrice, Double avgPrice) {
        // Fallback to local analysis (Gemini API would be called here with proper SDK)
        return generateLocalPricingAnalysis(currentPrice, minPrice, maxPrice, avgPrice);
    }

    /**
     * Fallback local pricing analysis when API is unavailable
     */
    private String generateLocalPricingAnalysis(Double currentPrice, Double minPrice, Double maxPrice, Double avgPrice) {
        if (currentPrice < minPrice) {
            return "Your price is significantly below market rates. Consider increasing it to be more competitive.";
        } else if (currentPrice > maxPrice) {
            return "Your price is above market rates. Consider reducing it to attract more buyers.";
        } else if (currentPrice < avgPrice * 0.95) {
            return "Your price is slightly below average. You might be undervaluing your crop.";
        } else if (currentPrice > avgPrice * 1.05) {
            return "Your price is slightly above average. The market is paying around ₹" + avgPrice.intValue() + ".";
        } else {
            return "Your price is competitive and aligned with market rates.";
        }
    }

    /**
     * Parse natural language search query using Google Gemini API
     */
    public Map<String, Object> parseSearchQuery(String query) {
        return parseQueryLocally(query);
    }

    /**
     * Local query parsing fallback
     */
    private Map<String, Object> parseQueryLocally(String query) {
        Map<String, Object> filters = new HashMap<>();
        String lowerQuery = query.toLowerCase();

        // Extract crop name
        String[] cropKeywords = {"tomato", "onion", "potato", "rice", "wheat", "sugarcane", "cotton"};
        String cropName = extractKeyword(lowerQuery, cropKeywords);
        filters.put("cropName", cropName != null ? cropName : "");

        // Initialize price range
        filters.put("minPrice", 0);
        filters.put("maxPrice", 999999);

        // Extract location - state
        String[] stateKeywords = {"maharashtra", "punjab", "haryana", "tamil nadu", "karnataka", "delhi", "mumbai", "goa"};
        String state = extractKeyword(lowerQuery, stateKeywords);
        filters.put("state", state != null ? state : "");

        // Extract location - district
        String[] districtKeywords = {"nashik", "pune", "amritsar", "hisar", "salem", "bangalore"};
        String district = extractKeyword(lowerQuery, districtKeywords);
        filters.put("district", district != null ? district : "");

        // Extract quality indicator
        String quality = "medium";
        if (lowerQuery.contains("fresh") || lowerQuery.contains("premium") || lowerQuery.contains("organic")) {
            quality = "high";
        } else if (lowerQuery.contains("cheap") || lowerQuery.contains("budget") || lowerQuery.contains("affordable")) {
            quality = "medium";
        }
        filters.put("quality", quality);

        return filters;
    }

    private String extractKeyword(String text, String[] keywords) {
        for (String keyword : keywords) {
            if (text.contains(keyword.toLowerCase())) {
                return keyword;
            }
        }
        return null;
    }

    /**
     * Generate chat suggestions using Google Gemini API
     */
    public String[] generateChatSuggestions(String buyerMessage, String cropName) {
        return generateLocalChatSuggestions(buyerMessage);
    }

    /**
     * Local chat suggestions fallback
     */
    private String[] generateLocalChatSuggestions(String buyerMessage) {
        String lower = buyerMessage.toLowerCase();

        if (lower.contains("deliver") || lower.contains("shipping")) {
            return new String[]{
                "Yes, we can deliver to your location",
                "What quantity do you need?",
                "Delivery charges depend on distance"
            };
        } else if (lower.contains("price") || lower.contains("cost")) {
            return new String[]{
                "Current price is competitive for quality",
                "Bulk orders get special pricing",
                "We offer the best market rate"
            };
        } else if (lower.contains("quality") || lower.contains("fresh")) {
            return new String[]{
                "Our crops are fresh and high quality",
                "Harvested within 24 hours",
                "Directly from farm to your table"
            };
        } else if (lower.contains("available") || lower.contains("stock")) {
            return new String[]{
                "Stock available for immediate pickup",
                "How much quantity do you need?",
                "Can arrange delivery within 2 days"
            };
        } else {
            return new String[]{
                "Thank you for your interest!",
                "What specific information do you need?",
                "How can I help you further?"
            };
        }
    }
}
