package com.smartcrops.marketplace.repository;

import com.smartcrops.marketplace.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    // Find history between two users for a specific crop
    List<ChatMessage> findByCropIdAndSenderPhoneAndReceiverPhoneOrderByTimestampAsc(String cropId, String senderPhone, String receiverPhone);
    
    // Find all messages involving a specific phone number (for conversation list)
    List<ChatMessage> findBySenderPhoneOrReceiverPhoneOrderByTimestampDesc(String senderPhone, String receiverPhone);

    // Delete messages for a specific conversation
    void deleteByCropIdAndSenderPhoneAndReceiverPhone(String cropId, String senderPhone, String receiverPhone);
}
