package com.smartcrops.marketplace.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.ArrayList;

@Document(collection = "messages")
public class ChatMessage {
    @Id
    private String id;
    private String senderPhone;
    private String senderName;
    private String senderRole;
    private String receiverPhone;
    private String receiverName;
    private String receiverRole;
    private String cropId;
    private String cropName;
    private String content;
    private Long timestamp;
    private List<String> deletedBy = new ArrayList<>();

    public ChatMessage() {}

    public ChatMessage(String senderPhone, String senderName, String senderRole, String receiverPhone, String receiverName, String receiverRole, String cropId, String cropName, String content, Long timestamp) {
        this.senderPhone = senderPhone;
        this.senderName = senderName;
        this.senderRole = senderRole;
        this.receiverPhone = receiverPhone;
        this.receiverName = receiverName;
        this.receiverRole = receiverRole;
        this.cropId = cropId;
        this.cropName = cropName;
        this.content = content;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public List<String> getDeletedBy() { return deletedBy; }
    public void setDeletedBy(List<String> deletedBy) { this.deletedBy = deletedBy; }
    public String getSenderPhone() { return senderPhone; }
    public void setSenderPhone(String senderPhone) { this.senderPhone = senderPhone; }
    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }
    public String getSenderRole() { return senderRole; }
    public void setSenderRole(String senderRole) { this.senderRole = senderRole; }
    public String getReceiverPhone() { return receiverPhone; }
    public void setReceiverPhone(String receiverPhone) { this.receiverPhone = receiverPhone; }
    public String getReceiverName() { return receiverName; }
    public void setReceiverName(String receiverName) { this.receiverName = receiverName; }
    public String getReceiverRole() { return receiverRole; }
    public void setReceiverRole(String receiverRole) { this.receiverRole = receiverRole; }
    public String getCropId() { return cropId; }
    public void setCropId(String cropId) { this.cropId = cropId; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }
}
