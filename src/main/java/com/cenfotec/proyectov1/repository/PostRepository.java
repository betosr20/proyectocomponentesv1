package com.cenfotec.proyectov1.repository;

import com.cenfotec.proyectov1.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "select distinct post from Post post left join fetch post.tags",
        countQuery = "select count(distinct post) from Post post")
    Page<Post> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct post from Post post left join fetch post.tags  inner join fetch post.userExtra left join fetch post.comments")
    List<Post> findAllWithEagerRelationships();

    @Query("select post from Post post left join fetch post.tags  left join fetch post.comments where post.id =:id")
    Optional<Post> findOneWithEagerRelationships(@Param("id") Long id);

}
