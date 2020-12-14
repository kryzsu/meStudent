package hu.me.mestudent.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A File.
 */
@Entity
@Table(name = "file")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "file")
public class File implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    
    @Lob
    @Column(name = "data", nullable = false)
    private byte[] data;

    @Column(name = "data_content_type", nullable = false)
    private String dataContentType;

    @ManyToOne
    @JsonIgnoreProperties(value = "files", allowSetters = true)
    private Task taskAttachedTo;

    @ManyToOne
    @JsonIgnoreProperties(value = "files", allowSetters = true)
    private Course courseAttachedTo;

    @ManyToOne
    @JsonIgnoreProperties(value = "files", allowSetters = true)
    private Comment commentAttachedTo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public File title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte[] getData() {
        return data;
    }

    public File data(byte[] data) {
        this.data = data;
        return this;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getDataContentType() {
        return dataContentType;
    }

    public File dataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
        return this;
    }

    public void setDataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
    }

    public Task getTaskAttachedTo() {
        return taskAttachedTo;
    }

    public File taskAttachedTo(Task task) {
        this.taskAttachedTo = task;
        return this;
    }

    public void setTaskAttachedTo(Task task) {
        this.taskAttachedTo = task;
    }

    public Course getCourseAttachedTo() {
        return courseAttachedTo;
    }

    public File courseAttachedTo(Course course) {
        this.courseAttachedTo = course;
        return this;
    }

    public void setCourseAttachedTo(Course course) {
        this.courseAttachedTo = course;
    }

    public Comment getCommentAttachedTo() {
        return commentAttachedTo;
    }

    public File commentAttachedTo(Comment comment) {
        this.commentAttachedTo = comment;
        return this;
    }

    public void setCommentAttachedTo(Comment comment) {
        this.commentAttachedTo = comment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof File)) {
            return false;
        }
        return id != null && id.equals(((File) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "File{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", data='" + getData() + "'" +
            ", dataContentType='" + getDataContentType() + "'" +
            "}";
    }
}
