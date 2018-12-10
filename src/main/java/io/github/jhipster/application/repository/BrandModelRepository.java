package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.BrandModel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BrandModel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BrandModelRepository extends JpaRepository<BrandModel, Long> {

}
