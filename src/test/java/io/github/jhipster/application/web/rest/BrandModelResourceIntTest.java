package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.BrandModel;
import io.github.jhipster.application.repository.BrandModelRepository;
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

/**
 * Test class for the BrandModelResource REST controller.
 *
 * @see BrandModelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class BrandModelResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    @Autowired
    private BrandModelRepository brandModelRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBrandModelMockMvc;

    private BrandModel brandModel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BrandModelResource brandModelResource = new BrandModelResource(brandModelRepository);
        this.restBrandModelMockMvc = MockMvcBuilders.standaloneSetup(brandModelResource)
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
    public static BrandModel createEntity(EntityManager em) {
        BrandModel brandModel = new BrandModel()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .year(DEFAULT_YEAR);
        return brandModel;
    }

    @Before
    public void initTest() {
        brandModel = createEntity(em);
    }

    @Test
    @Transactional
    public void createBrandModel() throws Exception {
        int databaseSizeBeforeCreate = brandModelRepository.findAll().size();

        // Create the BrandModel
        restBrandModelMockMvc.perform(post("/api/brand-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brandModel)))
            .andExpect(status().isCreated());

        // Validate the BrandModel in the database
        List<BrandModel> brandModelList = brandModelRepository.findAll();
        assertThat(brandModelList).hasSize(databaseSizeBeforeCreate + 1);
        BrandModel testBrandModel = brandModelList.get(brandModelList.size() - 1);
        assertThat(testBrandModel.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testBrandModel.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBrandModel.getYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    @Transactional
    public void createBrandModelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = brandModelRepository.findAll().size();

        // Create the BrandModel with an existing ID
        brandModel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBrandModelMockMvc.perform(post("/api/brand-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brandModel)))
            .andExpect(status().isBadRequest());

        // Validate the BrandModel in the database
        List<BrandModel> brandModelList = brandModelRepository.findAll();
        assertThat(brandModelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = brandModelRepository.findAll().size();
        // set the field null
        brandModel.setCode(null);

        // Create the BrandModel, which fails.

        restBrandModelMockMvc.perform(post("/api/brand-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brandModel)))
            .andExpect(status().isBadRequest());

        List<BrandModel> brandModelList = brandModelRepository.findAll();
        assertThat(brandModelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBrandModels() throws Exception {
        // Initialize the database
        brandModelRepository.saveAndFlush(brandModel);

        // Get all the brandModelList
        restBrandModelMockMvc.perform(get("/api/brand-models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(brandModel.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)));
    }
    
    @Test
    @Transactional
    public void getBrandModel() throws Exception {
        // Initialize the database
        brandModelRepository.saveAndFlush(brandModel);

        // Get the brandModel
        restBrandModelMockMvc.perform(get("/api/brand-models/{id}", brandModel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(brandModel.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR));
    }

    @Test
    @Transactional
    public void getNonExistingBrandModel() throws Exception {
        // Get the brandModel
        restBrandModelMockMvc.perform(get("/api/brand-models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBrandModel() throws Exception {
        // Initialize the database
        brandModelRepository.saveAndFlush(brandModel);

        int databaseSizeBeforeUpdate = brandModelRepository.findAll().size();

        // Update the brandModel
        BrandModel updatedBrandModel = brandModelRepository.findById(brandModel.getId()).get();
        // Disconnect from session so that the updates on updatedBrandModel are not directly saved in db
        em.detach(updatedBrandModel);
        updatedBrandModel
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .year(UPDATED_YEAR);

        restBrandModelMockMvc.perform(put("/api/brand-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBrandModel)))
            .andExpect(status().isOk());

        // Validate the BrandModel in the database
        List<BrandModel> brandModelList = brandModelRepository.findAll();
        assertThat(brandModelList).hasSize(databaseSizeBeforeUpdate);
        BrandModel testBrandModel = brandModelList.get(brandModelList.size() - 1);
        assertThat(testBrandModel.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testBrandModel.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBrandModel.getYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    @Transactional
    public void updateNonExistingBrandModel() throws Exception {
        int databaseSizeBeforeUpdate = brandModelRepository.findAll().size();

        // Create the BrandModel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBrandModelMockMvc.perform(put("/api/brand-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brandModel)))
            .andExpect(status().isBadRequest());

        // Validate the BrandModel in the database
        List<BrandModel> brandModelList = brandModelRepository.findAll();
        assertThat(brandModelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBrandModel() throws Exception {
        // Initialize the database
        brandModelRepository.saveAndFlush(brandModel);

        int databaseSizeBeforeDelete = brandModelRepository.findAll().size();

        // Get the brandModel
        restBrandModelMockMvc.perform(delete("/api/brand-models/{id}", brandModel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BrandModel> brandModelList = brandModelRepository.findAll();
        assertThat(brandModelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BrandModel.class);
        BrandModel brandModel1 = new BrandModel();
        brandModel1.setId(1L);
        BrandModel brandModel2 = new BrandModel();
        brandModel2.setId(brandModel1.getId());
        assertThat(brandModel1).isEqualTo(brandModel2);
        brandModel2.setId(2L);
        assertThat(brandModel1).isNotEqualTo(brandModel2);
        brandModel1.setId(null);
        assertThat(brandModel1).isNotEqualTo(brandModel2);
    }
}
