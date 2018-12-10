package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.BrandModel;
import io.github.jhipster.application.repository.BrandModelRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing BrandModel.
 */
@RestController
@RequestMapping("/api")
public class BrandModelResource {

    private final Logger log = LoggerFactory.getLogger(BrandModelResource.class);

    private static final String ENTITY_NAME = "brandModel";

    private final BrandModelRepository brandModelRepository;

    public BrandModelResource(BrandModelRepository brandModelRepository) {
        this.brandModelRepository = brandModelRepository;
    }

    /**
     * POST  /brand-models : Create a new brandModel.
     *
     * @param brandModel the brandModel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new brandModel, or with status 400 (Bad Request) if the brandModel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/brand-models")
    @Timed
    public ResponseEntity<BrandModel> createBrandModel(@Valid @RequestBody BrandModel brandModel) throws URISyntaxException {
        log.debug("REST request to save BrandModel : {}", brandModel);
        if (brandModel.getId() != null) {
            throw new BadRequestAlertException("A new brandModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BrandModel result = brandModelRepository.save(brandModel);
        return ResponseEntity.created(new URI("/api/brand-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /brand-models : Updates an existing brandModel.
     *
     * @param brandModel the brandModel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated brandModel,
     * or with status 400 (Bad Request) if the brandModel is not valid,
     * or with status 500 (Internal Server Error) if the brandModel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/brand-models")
    @Timed
    public ResponseEntity<BrandModel> updateBrandModel(@Valid @RequestBody BrandModel brandModel) throws URISyntaxException {
        log.debug("REST request to update BrandModel : {}", brandModel);
        if (brandModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BrandModel result = brandModelRepository.save(brandModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, brandModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /brand-models : get all the brandModels.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of brandModels in body
     */
    @GetMapping("/brand-models")
    @Timed
    public List<BrandModel> getAllBrandModels(@RequestParam(required = false) String filter) {
        if ("brand-is-null".equals(filter)) {
            log.debug("REST request to get all BrandModels where brand is null");
            return StreamSupport
                .stream(brandModelRepository.findAll().spliterator(), false)
                .filter(brandModel -> brandModel.getBrand() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all BrandModels");
        return brandModelRepository.findAll();
    }

    /**
     * GET  /brand-models/:id : get the "id" brandModel.
     *
     * @param id the id of the brandModel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the brandModel, or with status 404 (Not Found)
     */
    @GetMapping("/brand-models/{id}")
    @Timed
    public ResponseEntity<BrandModel> getBrandModel(@PathVariable Long id) {
        log.debug("REST request to get BrandModel : {}", id);
        Optional<BrandModel> brandModel = brandModelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(brandModel);
    }

    /**
     * DELETE  /brand-models/:id : delete the "id" brandModel.
     *
     * @param id the id of the brandModel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/brand-models/{id}")
    @Timed
    public ResponseEntity<Void> deleteBrandModel(@PathVariable Long id) {
        log.debug("REST request to delete BrandModel : {}", id);

        brandModelRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
