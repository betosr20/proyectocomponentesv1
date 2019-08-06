package com.cenfotec.proyectov1.web.rest;

import com.cenfotec.proyectov1.domain.Comment;
import com.cenfotec.proyectov1.domain.User;
import com.cenfotec.proyectov1.domain.UserExtra;
import com.cenfotec.proyectov1.domain.Post;
import com.cenfotec.proyectov1.domain.Tag;
import com.cenfotec.proyectov1.repository.PostRepository;
import com.cenfotec.proyectov1.repository.UserExtraRepository;
import com.cenfotec.proyectov1.repository.UserRepository;
import com.cenfotec.proyectov1.service.UserService;
import com.cenfotec.proyectov1.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing {@link com.cenfotec.proyectov1.domain.Post}.
 */
@RestController
@RequestMapping("/api")
public class PostResource {

    private final Logger log = LoggerFactory.getLogger(PostResource.class);
    private UserService userService;
    private static final String ENTITY_NAME = "post";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PostRepository postRepository;
    private final UserExtraRepository userExtraRepository;

    public PostResource(UserService userService, PostRepository postRepository,UserExtraRepository puserExtraRepository) {
        this.postRepository = postRepository;
        this.userService = userService;
        this.userExtraRepository =puserExtraRepository;
    }

    /**
     * {@code POST  /posts} : Create a new post.
     *
     * @param post the post to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new post, or with status {@code 400 (Bad Request)} if the post has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) throws URISyntaxException {
        log.debug("REST request to save Post : {}", post);
        if (post.getId() != null) {
            throw new BadRequestAlertException("A new post cannot already have an ID", ENTITY_NAME, "idexists");
        }
        post.setTimestamp(""+LocalDate.now());
        post.setStatus("Active");
        Post result = postRepository.save(post);
        return ResponseEntity.created(new URI("/api/posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /posts} : Updates an existing post.
     *
     * @param post the post to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated post,
     * or with status {@code 400 (Bad Request)} if the post is not valid,
     * or with status {@code 500 (Internal Server Error)} if the post couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/posts")
    public ResponseEntity<Post> updatePost(@RequestBody Post post) throws URISyntaxException {
        log.debug("REST request to update Post : {}", post);
        if (post.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Long id_user = this.userService.getUserWithAuthorities().get().getId();
        Optional<UserExtra> userExtra = this.userExtraRepository.findUserExternalByIdUserJHipster(id_user);
        post.setUserExtra(userExtra.get());
        Post result = postRepository.save(post);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, post.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /posts} : get all the posts.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of posts in body.
     */
    @GetMapping("/posts")
    public List<Post> getAllPosts(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Posts");
        return postRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /posts/:id} : get the "id" post.
     *
     * @param id the id of the post to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the post, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        log.debug("REST request to get Post : {}", id);
        Optional<Post> post = postRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(post);
    }
    /**
     * {@code GET  /posts/:id_user} : get the "id_user" post.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of posts in body.
    */
    @GetMapping("/posts/user")
    public List<Post> getPostByUser(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        Long id_user = this.userService.getUserWithAuthorities().get().getId();
        Optional<UserExtra> userExtra = this.userExtraRepository.findUserExternalByIdUserJHipster(id_user);
        List<Post> listPost =  new ArrayList<Post>();

        for (Iterator<Post> iterator = userExtra.get().getPosts().iterator(); iterator.hasNext();) {
            Post post = iterator.next();
            Optional<Post> auxiPost  = postRepository.findOneWithEagerRelationships(post.getId());
            listPost.add(auxiPost.get());
        }

        return  listPost;
    }
    /**
     * {@code DELETE  /posts/:id} : delete the "id" post.
     *
     * @param id the id of the post to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        log.debug("REST request to delete Post : {}", id);
        postRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
