package com.smartcrops.marketplace.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Determine resource type (image or video)
            String contentType = file.getContentType();
            String resourceType = "auto";
            if (contentType != null && contentType.startsWith("video/")) {
                resourceType = "video";
            }

            // Upload directly to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", resourceType
            ));

            // Extract the secure HTTPS URL
            String secureUrl = (String) uploadResult.get("secure_url");

            return ResponseEntity.ok(secureUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload file to Cloudinary");
        }
    }
}
