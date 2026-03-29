package com.realestate.backend.dto;

import com.realestate.backend.model.ListingType;
import lombok.Data;

@Data
public class ListingFilter {
    private String neighborhood;
    private Long minPrice;
    private Long maxPrice;
    private Integer bedrooms;
    private ListingType listingType;
    private Boolean hasParking;
    private Boolean hasBalcony;
    private Boolean hasMamad;
}