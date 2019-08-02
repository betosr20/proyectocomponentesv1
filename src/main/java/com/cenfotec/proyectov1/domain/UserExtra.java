package com.cenfotec.proyectov1.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserExtra.
 */
@Entity
@Table(name = "user_extra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "status")
    private Integer status;

    @Column(name = "user_id")
    private Long userId;

    @OneToMany(mappedBy = "userExtra")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Post> posts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public UserExtra nickname(String nickname) {
        this.nickname = nickname;
        return this;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Integer getStatus() {
        return status;
    }

    public UserExtra status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public UserExtra userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public UserExtra posts(Set<Post> posts) {
        this.posts = posts;
        return this;
    }

    public UserExtra addPost(Post post) {
        this.posts.add(post);
        post.setUserExtra(this);
        return this;
    }

    public UserExtra removePost(Post post) {
        this.posts.remove(post);
        post.setUserExtra(null);
        return this;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtra)) {
            return false;
        }
        return id != null && id.equals(((UserExtra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            ", nickname='" + getNickname() + "'" +
            ", status=" + getStatus() +
            ", userId=" + getUserId() +
            "}";
    }
}
