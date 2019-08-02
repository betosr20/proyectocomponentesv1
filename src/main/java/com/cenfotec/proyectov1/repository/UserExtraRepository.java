package com.cenfotec.proyectov1.repository;

import com.cenfotec.proyectov1.domain.UserExtra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Spring Data  repository for the UserExtra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtraRepository extends JpaRepository<UserExtra, Long> {

    Optional<UserExtra> findByUserId(Long userId);
}
