package hu.me.mestudent.repository;

import hu.me.mestudent.domain.Invitation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Invitation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    @Query("select invitation from Invitation invitation where invitation.invitedBy.login = ?#{principal.username}")
    List<Invitation> findByInvitedByIsCurrentUser();
}
