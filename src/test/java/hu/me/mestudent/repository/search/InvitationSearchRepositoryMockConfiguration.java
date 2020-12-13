package hu.me.mestudent.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link InvitationSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class InvitationSearchRepositoryMockConfiguration {

    @MockBean
    private InvitationSearchRepository mockInvitationSearchRepository;

}
