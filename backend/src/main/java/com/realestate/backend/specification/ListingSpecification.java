package com.realestate.backend.specification;

import com.realestate.backend.dto.ListingFilter;
import com.realestate.backend.model.Listing;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ListingSpecification {

    public static Specification<Listing> withFilters(ListingFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getNeighborhood() != null) {
                predicates.add(cb.equal(root.get("neighborhood"), filter.getNeighborhood()));
            }
            if (filter.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
            }
            if (filter.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
            }
            if (filter.getBedrooms() != null) {
                predicates.add(cb.equal(root.get("bedrooms"), filter.getBedrooms()));
            }
            if (filter.getListingType() != null) {
                predicates.add(cb.equal(root.get("listingType"), filter.getListingType()));
            }
            if (filter.getHasParking() != null) {
                predicates.add(cb.equal(root.get("hasParking"), filter.getHasParking()));
            }
            if (filter.getHasBalcony() != null) {
                predicates.add(cb.equal(root.get("hasBalcony"), filter.getHasBalcony()));
            }
            if (filter.getHasMamad() != null) {
                predicates.add(cb.equal(root.get("hasMamad"), filter.getHasMamad()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}