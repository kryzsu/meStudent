package hu.me.mestudent.repository.search;

import hu.me.mestudent.domain.Invitation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Invitation} entity.
 */
public interface InvitationSearchRepository extends ElasticsearchRepository<Invitation, Long> {
}
