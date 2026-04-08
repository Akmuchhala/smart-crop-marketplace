package com.smartcrops.marketplace.repository;

import com.smartcrops.marketplace.model.CropListing;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CropRepository extends MongoRepository<CropListing, String> {
    List<CropListing> findByFarmerPhone(String farmerPhone);
}
