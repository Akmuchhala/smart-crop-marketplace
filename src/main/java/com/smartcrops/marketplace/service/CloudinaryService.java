package com.smartcrops.marketplace.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) {
        try {
            // Determine resource type (auto detects images vs videos)
            String contentType = file.getContentType();
            String resourceType = "auto";
            if (contentType != null && contentType.startsWith("video/")) {
                resourceType = "video";
            }

            Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("resource_type", resourceType)
            );

            String secureUrl = uploadResult.get("secure_url").toString();
            if ("video".equals(resourceType)) {
                int lastDot = secureUrl.lastIndexOf('.');
                if (lastDot != -1) {
                    secureUrl = secureUrl.substring(0, lastDot) + ".mp4";
                } else {
                    secureUrl = secureUrl + ".mp4";
                }
            }
            return secureUrl;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("File upload failed");
        }
    }
}
