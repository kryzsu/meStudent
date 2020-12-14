package hu.me.mestudent.web.rest;

import hu.me.mestudent.domain.Invitation;
import hu.me.mestudent.repository.InvitationRepository;
import hu.me.mestudent.repository.search.InvitationSearchRepository;
import hu.me.mestudent.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link hu.me.mestudent.domain.Invitation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InvitationResource {

    private final Logger log = LoggerFactory.getLogger(InvitationResource.class);

    private static final String ENTITY_NAME = "invitation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvitationRepository invitationRepository;

    private final InvitationSearchRepository invitationSearchRepository;

    public InvitationResource(InvitationRepository invitationRepository, InvitationSearchRepository invitationSearchRepository) {
        this.invitationRepository = invitationRepository;
        this.invitationSearchRepository = invitationSearchRepository;
    }

    /**
     * {@code POST  /invitations} : Create a new invitation.
     *
     * @param invitation the invitation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invitation, or with status {@code 400 (Bad Request)} if the invitation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invitations")
    public ResponseEntity<Invitation> createInvitation(@RequestBody Invitation invitation) throws URISyntaxException {
        log.debug("REST request to save Invitation : {}", invitation);
        if (invitation.getId() != null) {
            throw new BadRequestAlertException("A new invitation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Invitation result = invitationRepository.save(invitation);
        invitationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/invitations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /invitations} : Updates an existing invitation.
     *
     * @param invitation the invitation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invitation,
     * or with status {@code 400 (Bad Request)} if the invitation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invitation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invitations")
    public ResponseEntity<Invitation> updateInvitation(@RequestBody Invitation invitation) throws URISyntaxException {
        log.debug("REST request to update Invitation : {}", invitation);
        if (invitation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Invitation result = invitationRepository.save(invitation);
        invitationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, invitation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /invitations} : get all the invitations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invitations in body.
     */
    @GetMapping("/invitations")
    public List<Invitation> getAllInvitations() {
        log.debug("REST request to get all Invitations");
        return invitationRepository.findAll();
    }

    /**
     * {@code GET  /invitations/:id} : get the "id" invitation.
     *
     * @param id the id of the invitation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invitation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invitations/{id}")
    public ResponseEntity<Invitation> getInvitation(@PathVariable Long id) {
        log.debug("REST request to get Invitation : {}", id);
        Optional<Invitation> invitation = invitationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(invitation);
    }

    /**
     * {@code DELETE  /invitations/:id} : delete the "id" invitation.
     *
     * @param id the id of the invitation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invitations/{id}")
    public ResponseEntity<Void> deleteInvitation(@PathVariable Long id) {
        log.debug("REST request to delete Invitation : {}", id);
        invitationRepository.deleteById(id);
        invitationSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/invitations?query=:query} : search for the invitation corresponding
     * to the query.
     *
     * @param query the query of the invitation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/invitations")
    public List<Invitation> searchInvitations(@RequestParam String query) {
        log.debug("REST request to search Invitations for query {}", query);
        return StreamSupport
            .stream(invitationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
