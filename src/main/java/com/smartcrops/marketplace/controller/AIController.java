package com.smartcrops.marketplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smartcrops.marketplace.dto.PricingSuggestionRequest;
import com.smartcrops.marketplace.dto.PricingSuggestionResponse;
import com.smartcrops.marketplace.service.AIAssistantService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private static final Logger logger = Logger.getLogger(AIController.class.getName());

    @Autowired
    private AIAssistantService aiAssistantService;

    /**
     * Get pricing suggestions for a crop
     * POST /api/ai/crop-pricing
     */
    @PostMapping("/crop-pricing")
    public ResponseEntity<?> getPricingSuggestions(@RequestBody PricingSuggestionRequest request) {
        try {
            if (request.getCropName() == null || request.getCropName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
                    put("error", "Crop name is required");
                }});
            }

            PricingSuggestionResponse response = aiAssistantService.getPricingSuggestions(
                    request.getCropName(),
                    request.getState(),
                    request.getDistrict(),
                    request.getFarmerPrice()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.severe("Error getting pricing suggestions: " + e.getMessage());
            return ResponseEntity.status(500).body(new HashMap<String, String>() {{
                put("error", "Error generating pricing suggestions: " + e.getMessage());
            }});
        }
    }

    /**
     * Get price history and trends for a crop
     * GET /api/ai/price-history?cropName=X&state=Y&district=Z
     */
    @GetMapping("/price-history")
    public ResponseEntity<?> getPriceHistory(
            @RequestParam String cropName,
            @RequestParam String state,
            @RequestParam String district) {
        try {
            List<Map<String, Object>> history = aiAssistantService.getPriceHistory(cropName, state, district);

            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("cropName", cropName);
                put("region", district + ", " + state);
                put("priceData", history);
            }});

        } catch (Exception e) {
            logger.severe("Error getting price history: " + e.getMessage());
            return ResponseEntity.status(500).body(new HashMap<String, String>() {{
                put("error", "Error fetching price history: " + e.getMessage());
            }});
        }
    }

    /**
     * Get trending crops in a region
     * GET /api/ai/trending-crops?state=X&district=Y&limit=5
     */
    @GetMapping("/trending-crops")
    public ResponseEntity<?> getTrendingCrops(
            @RequestParam String state,
            @RequestParam String district,
            @RequestParam(defaultValue = "5") int limit) {
        try {
            List<Map<String, Object>> trending = aiAssistantService.getTrendingCrops(state, district, limit);

            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("region", district + ", " + state);
                put("trendingCrops", trending);
            }});

        } catch (Exception e) {
            logger.severe("Error getting trending crops: " + e.getMessage());
            return ResponseEntity.status(500).body(new HashMap<String, String>() {{
                put("error", "Error fetching trending crops: " + e.getMessage());
            }});
        }
    }

    /**
     * Health check for AI service
     * GET /api/ai/health
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("status", "AI service is running");
            put("timestamp", java.time.LocalDateTime.now().toString());
        }});
    }
}
