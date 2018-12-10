package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Advert;
import io.github.jhipster.application.repository.AdvertRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Advert.
 */
@RestController
@RequestMapping("/api")
public class AdvertResource {

    private final Logger log = LoggerFactory.getLogger(AdvertResource.class);

    private static final String ENTITY_NAME = "advert";

    private final AdvertRepository advertRepository;

    public AdvertResource(AdvertRepository advertRepository) {
        this.advertRepository = advertRepository;
    }

    /**
     * POST  /adverts : Create a new advert.
     *
     * @param advert the advert to create
     * @return the ResponseEntity with status 201 (Created) and with body the new advert, or with status 400 (Bad Request) if the advert has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/adverts")
    @Timed
    public ResponseEntity<Advert> createAdvert(@RequestBody Advert advert) throws URISyntaxException {
        log.debug("REST request to save Advert : {}", advert);
        if (advert.getId() != null) {
            throw new BadRequestAlertException("A new advert cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Advert result = advertRepository.save(advert);
        return ResponseEntity.created(new URI("/api/adverts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /adverts : Updates an existing advert.
     *
     * @param advert the advert to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated advert,
     * or with status 400 (Bad Request) if the advert is not valid,
     * or with status 500 (Internal Server Error) if the advert couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/adverts")
    @Timed
    public ResponseEntity<Advert> updateAdvert(@RequestBody Advert advert) throws URISyntaxException {
        log.debug("REST request to update Advert : {}", advert);
        if (advert.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Advert result = advertRepository.save(advert);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, advert.getId().toString()))
            .body(result);
    }

    /**
     * GET  /adverts : get all the adverts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of adverts in body
     */
    @GetMapping("/adverts")
    @Timed
    public List<Advert> getAllAdverts() {
        log.debug("REST request to get all Adverts");
        return advertRepository.findAll();
    }

    /**
     * GET  /adverts/:id : get the "id" advert.
     *
     * @param id the id of the advert to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the advert, or with status 404 (Not Found)
     */
    @GetMapping("/adverts/{id}")
    @Timed
    public ResponseEntity<Advert> getAdvert(@PathVariable Long id) {
        log.debug("REST request to get Advert : {}", id);
        Optional<Advert> advert = advertRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(advert);
    }

    /**
     * DELETE  /adverts/:id : delete the "id" advert.
     *
     * @param id the id of the advert to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/adverts/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdvert(@PathVariable Long id) {
        log.debug("REST request to delete Advert : {}", id);

        advertRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
