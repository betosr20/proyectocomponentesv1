package com.cenfotec.proyectov1.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "tittle")
    private String tittle;

    @Column(name = "text")
    private String text;

    @Column(name = "status")
    private String status;

    @Column(name = "timestamp")
    private String timestamp;

    @ManyToOne
    @JsonIgnoreProperties("posts")
    private UserExtra userExtra;

    @OneToMany(mappedBy = "post")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "post_tag",
               joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTittle() {
        return tittle;
    }

    public Post tittle(String tittle) {
        this.tittle = tittle;
        return this;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public String getText() {
        return text;
    }

    public Post text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getStatus() {
        return status;
    }

    public Post status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public Post timestamp(String timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public UserExtra getUserExtra() {
        return userExtra;
    }

    public Post userExtra(UserExtra userExtra) {
        this.userExtra = userExtra;
        return this;
    }

    public void setUserExtra(UserExtra userExtra) {
        this.userExtra = userExtra;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Post comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Post addComment(Comment comment) {
        this.comments.add(comment);
        comment.setPost(this);
        return this;
    }

    public Post removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setPost(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Post tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    // public Post addTag(Tag tag) {
    //    this.tags.add(tag);
    //    tag.getPosts().add(this);
    //    return this;
    // }

    // public Post removeTag(Tag tag) {
    //     this.tags.remove(tag);
    //     tag.getPosts().remove(this);
    //     return this;
    // }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Post)) {
            return false;
        }
        return id != null && id.equals(((Post) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", tittle='" + getTittle() + "'" +
            ", text='" + getText() + "'" +
            ", status='" + getStatus() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
            "}";
    }
}
