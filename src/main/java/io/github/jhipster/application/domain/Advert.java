package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.AdvertStatus;

/**
 * A Advert.
 */
@Entity
@Table(name = "advert")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Advert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AdvertStatus status;

    @OneToOne    @JoinColumn(unique = true)
    private BrandModel model;

    @ManyToOne
    @JsonIgnoreProperties("owners")
    private Owner owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Advert description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AdvertStatus getStatus() {
        return status;
    }

    public Advert status(AdvertStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(AdvertStatus status) {
        this.status = status;
    }

    public BrandModel getModel() {
        return model;
    }

    public Advert model(BrandModel brandModel) {
        this.model = brandModel;
        return this;
    }

    public void setModel(BrandModel brandModel) {
        this.model = brandModel;
    }

    public Owner getOwner() {
        return owner;
    }

    public Advert owner(Owner owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Advert advert = (Advert) o;
        if (advert.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), advert.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Advert{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
