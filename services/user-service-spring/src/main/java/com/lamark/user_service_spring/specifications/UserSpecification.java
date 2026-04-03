package com.lamark.user_service_spring.specifications;

import org.springframework.data.jpa.domain.Specification;

import com.lamark.user_service_spring.dto.filters.UserFilter;
import com.lamark.user_service_spring.infrastructure.entities.User;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class UserSpecification {

    public static Specification<User> filter(UserFilter filter) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (filter.username() != null) {
                predicates.add(cb.like(
                        cb.lower(root.get("username")),
                        "%" + filter.username().toLowerCase() + "%"));
            }

            if (filter.email() != null) {
                predicates.add(cb.like(
                        cb.lower(root.get("email")),
                        "%" + filter.email().toLowerCase() + "%"));
            }

            if (filter.role() != null) {
                predicates.add(cb.equal(root.get("role"), filter.role()));
            }

            if (filter.createdAfter() != null) {
                predicates.add(cb.greaterThanOrEqualTo(
                        root.get("createdAt"),
                        filter.createdAfter()));
            }

            if (filter.createdBefore() != null) {
                predicates.add(cb.lessThanOrEqualTo(
                        root.get("createdAt"),
                        filter.createdBefore()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
