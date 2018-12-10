package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Advert;
import io.github.jhipster.application.repository.AdvertRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.AdvertStatus;
/**
 * Test class for the AdvertResource REST controller.
 *
 * @see AdvertResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class AdvertResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final AdvertStatus DEFAULT_STATUS = AdvertStatus.DRAW;
    private static final AdvertStatus UPDATED_STATUS = AdvertStatus.PUBLISHED;

    @Autowired
    private AdvertRepository advertRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAdvertMockMvc;

    private Advert advert;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdvertResource advertResource = new AdvertResource(advertRepository);
        this.restAdvertMockMvc = MockMvcBuilders.standaloneSetup(advertResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Advert createEntity(EntityManager em) {
        Advert advert = new Advert()
            .description(DEFAULT_DESCRIPTION)
            .status(DEFAULT_STATUS);
        return advert;
    }

    @Before
    public void initTest() {
        advert = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdvert() throws Exception {
        int databaseSizeBeforeCreate = advertRepository.findAll().size();

        // Create the Advert
        restAdvertMockMvc.perform(post("/api/adverts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advert)))
            .andExpect(status().isCreated());

        // Validate the Advert in the database
        List<Advert> advertList = advertRepository.findAll();
        assertThat(advertList).hasSize(databaseSizeBeforeCreate + 1);
        Advert testAdvert = advertList.get(advertList.size() - 1);
        assertThat(testAdvert.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAdvert.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createAdvertWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = advertRepository.findAll().size();

        // Create the Advert with an existing ID
        advert.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdvertMockMvc.perform(post("/api/adverts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advert)))
            .andExpect(status().isBadRequest());

        // Validate the Advert in the database
        List<Advert> advertList = advertRepository.findAll();
        assertThat(advertList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAdverts() throws Exception {
        // Initialize the database
        advertRepository.saveAndFlush(advert);

        // Get all the advertList
        restAdvertMockMvc.perform(get("/api/adverts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(advert.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getAdvert() throws Exception {
        // Initialize the database
        advertRepository.saveAndFlush(advert);

        // Get the advert
        restAdvertMockMvc.perform(get("/api/adverts/{id}", advert.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(advert.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAdvert() throws Exception {
        // Get the advert
        restAdvertMockMvc.perform(get("/api/adverts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdvert() throws Exception {
        // Initialize the database
        advertRepository.saveAndFlush(advert);

        int databaseSizeBeforeUpdate = advertRepository.findAll().size();

        // Update the advert
        Advert updatedAdvert = advertRepository.findById(advert.getId()).get();
        // Disconnect from session so that the updates on updatedAdvert are not directly saved in db
        em.detach(updatedAdvert);
        updatedAdvert
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS);

        restAdvertMockMvc.perform(put("/api/adverts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdvert)))
            .andExpect(status().isOk());

        // Validate the Advert in the database
        List<Advert> advertList = advertRepository.findAll();
        assertThat(advertList).hasSize(databaseSizeBeforeUpdate);
        Advert testAdvert = advertList.get(advertList.size() - 1);
        assertThat(testAdvert.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAdvert.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAdvert() throws Exception {
        int databaseSizeBeforeUpdate = advertRepository.findAll().size();

        // Create the Advert

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdvertMockMvc.perform(put("/api/adverts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advert)))
            .andExpect(status().isBadRequest());

        // Validate the Advert in the database
        List<Advert> advertList = advertRepository.findAll();
        assertThat(advertList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdvert() throws Exception {
        // Initialize the database
        advertRepository.saveAndFlush(advert);

        int databaseSizeBeforeDelete = advertRepository.findAll().size();

        // Get the advert
        restAdvertMockMvc.perform(delete("/api/adverts/{id}", advert.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Advert> advertList = advertRepository.findAll();
        assertThat(advertList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Advert.class);
        Advert advert1 = new Advert();
        advert1.setId(1L);
        Advert advert2 = new Advert();
        advert2.setId(advert1.getId());
        assertThat(advert1).isEqualTo(advert2);
        advert2.setId(2L);
        assertThat(advert1).isNotEqualTo(advert2);
        advert1.setId(null);
        assertThat(advert1).isNotEqualTo(advert2);
    }
}
