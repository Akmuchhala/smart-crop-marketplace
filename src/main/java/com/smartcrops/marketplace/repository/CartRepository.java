package com.smartcrops.marketplace.repository;

import com.smartcrops.marketplace.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for Cart database operations
 */
@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    /**
     * Find cart by user ID (phone number)
     */
    Optional<Cart> findByUserId(String userId);
}
