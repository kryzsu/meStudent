package hu.me.mestudent.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Invitation.
 */
@Entity
@Table(name = "invitation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "invitation")
public class Invitation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "invitations", allowSetters = true)
    private User invitedBy;

    @ManyToOne
    @JsonIgnoreProperties(value = "invitations", allowSetters = true)
    private Course belongsTo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getInvitedBy() {
        return invitedBy;
    }

    public Invitation invitedBy(User user) {
        this.invitedBy = user;
        return this;
    }

    public void setInvitedBy(User user) {
        this.invitedBy = user;
    }

    public Course getBelongsTo() {
        return belongsTo;
    }

    public Invitation belongsTo(Course course) {
        this.belongsTo = course;
        return this;
    }

    public void setBelongsTo(Course course) {
        this.belongsTo = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invitation)) {
            return false;
        }
        return id != null && id.equals(((Invitation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invitation{" +
            "id=" + getId() +
            "}";
    }
}
