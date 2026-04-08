package com.smartcrops.marketplace.controller;

import com.smartcrops.marketplace.model.ChatMessage;
import com.smartcrops.marketplace.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
public class ChatMessageController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private com.smartcrops.marketplace.repository.UserRepository userRepository;

    @PostMapping
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        if (message.getTimestamp() == null) {
            message.setTimestamp(System.currentTimeMillis());
        }
        return chatMessageRepository.save(message);
    }

    @GetMapping("/history")
    public List<ChatMessage> getChatHistory(
            @RequestParam String cropId,
            @RequestParam String user1,
            @RequestParam String user2) {
        
        // Fetch messages where user1 is sender and user2 is receiver, or vice-versa
        List<ChatMessage> sent = chatMessageRepository.findByCropIdAndSenderPhoneAndReceiverPhoneOrderByTimestampAsc(cropId, user1, user2);
        List<ChatMessage> received = chatMessageRepository.findByCropIdAndSenderPhoneAndReceiverPhoneOrderByTimestampAsc(cropId, user2, user1);
        
        List<ChatMessage> all = new ArrayList<>();
        all.addAll(sent);
        all.addAll(received);
        
        List<ChatMessage> filteredMessages = all.stream()
                .filter(msg -> msg.getDeletedBy() == null || !msg.getDeletedBy().contains(user1))
                .collect(Collectors.toList());

        // Sort by timestamp
        filteredMessages.sort(Comparator.comparing(ChatMessage::getTimestamp));
        return filteredMessages;
    }

    @GetMapping("/conversations")
    public List<Map<String, Object>> getConversations(@RequestParam String phone) {
        List<ChatMessage> allMessages = chatMessageRepository.findBySenderPhoneOrReceiverPhoneOrderByTimestampDesc(phone, phone);
        
        List<ChatMessage> activeMessages = allMessages.stream()
                .filter(msg -> msg.getDeletedBy() == null || !msg.getDeletedBy().contains(phone))
                .collect(Collectors.toList());

        // Group by conversation key (partner phone + crop ID)
        Map<String, ChatMessage> uniqueConversations = new LinkedHashMap<>();
        
        for (ChatMessage msg : activeMessages) {
            String partnerPhone = msg.getSenderPhone().equals(phone) ? msg.getReceiverPhone() : msg.getSenderPhone();
            String key = partnerPhone + "_" + msg.getCropId();
            
            if (!uniqueConversations.containsKey(key)) {
                uniqueConversations.put(key, msg);
            }
        }
        
        return uniqueConversations.values().stream().map(msg -> {
            Map<String, Object> map = new HashMap<>();
            boolean isSender = msg.getSenderPhone().equals(phone);
            String partnerPhone = isSender ? msg.getReceiverPhone() : msg.getSenderPhone();
            String partnerName = isSender ? msg.getReceiverName() : msg.getSenderName();
            String partnerRole = isSender ? msg.getReceiverRole() : msg.getSenderRole();
            
            // Fallback for older messages
            if (partnerName == null || partnerRole == null) {
                userRepository.findByPhone(partnerPhone).ifPresent(p -> {
                    map.put("partnerName", p.getName());
                    map.put("partnerRole", p.getRole());
                });
            } else {
                map.put("partnerName", partnerName);
                map.put("partnerRole", partnerRole);
            }

            // Ensure fallback if user lookup fails (e.g. deleted user)
            if (!map.containsKey("partnerName")) map.put("partnerName", partnerPhone);
            if (!map.containsKey("partnerRole")) map.put("partnerRole", "User");
            
            map.put("partnerPhone", partnerPhone);
            map.put("cropId", msg.getCropId());
            map.put("cropName", msg.getCropName());
            map.put("lastMessage", msg.getContent());
            map.put("timestamp", msg.getTimestamp());
            return map;
        }).collect(Collectors.toList());
    }

    @DeleteMapping("/conversation")
    public void deleteConversation(
            @RequestParam String phone,
            @RequestParam String partnerPhone,
            @RequestParam String cropId) {
        
        List<ChatMessage> sent = chatMessageRepository.findByCropIdAndSenderPhoneAndReceiverPhoneOrderByTimestampAsc(cropId, phone, partnerPhone);
        List<ChatMessage> received = chatMessageRepository.findByCropIdAndSenderPhoneAndReceiverPhoneOrderByTimestampAsc(cropId, partnerPhone, phone);
        
        List<ChatMessage> messagesToUpdate = new ArrayList<>();
        messagesToUpdate.addAll(sent);
        messagesToUpdate.addAll(received);

        for (ChatMessage msg : messagesToUpdate) {
            if (msg.getDeletedBy() == null) {
                msg.setDeletedBy(new ArrayList<>());
            }
            if (!msg.getDeletedBy().contains(phone)) {
                msg.getDeletedBy().add(phone);
            }
        }
        chatMessageRepository.saveAll(messagesToUpdate);
    }
}
