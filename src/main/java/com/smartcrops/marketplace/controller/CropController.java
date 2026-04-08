package com.smartcrops.marketplace.controller;

import com.smartcrops.marketplace.model.CropListing;
import com.smartcrops.marketplace.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    @Autowired
    private CropRepository cropRepository;

    @GetMapping
    public List<CropListing> getAllCrops() {
        return cropRepository.findAll();
    }

    @GetMapping("/farmer/{phone}")
    public List<CropListing> getFarmerCrops(@PathVariable String phone) {
        return cropRepository.findByFarmerPhone(phone);
    }

    @PostMapping
    public CropListing createCrop(@RequestBody CropListing crop) {
        return cropRepository.save(crop);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable String id) {
        cropRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CropListing> updateCrop(@PathVariable String id, @RequestBody CropListing cropDetails) {
        return cropRepository.findById(id)
                .map(crop -> {
                    crop.setName(cropDetails.getName());
                    crop.setPrice(cropDetails.getPrice());
                    crop.setQuantity(cropDetails.getQuantity());
                    crop.setLocation(cropDetails.getLocation());
                    crop.setDescription(cropDetails.getDescription());
                    if (cropDetails.getImage() != null) crop.setImage(cropDetails.getImage());
                    if (cropDetails.getImages() != null) crop.setImages(cropDetails.getImages());
                    return ResponseEntity.ok(cropRepository.save(crop));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
