package hu.me.mestudent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import hu.me.mestudent.web.rest.TestUtil;

public class InvitationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Invitation.class);
        Invitation invitation1 = new Invitation();
        invitation1.setId(1L);
        Invitation invitation2 = new Invitation();
        invitation2.setId(invitation1.getId());
        assertThat(invitation1).isEqualTo(invitation2);
        invitation2.setId(2L);
        assertThat(invitation1).isNotEqualTo(invitation2);
        invitation1.setId(null);
        assertThat(invitation1).isNotEqualTo(invitation2);
    }
}
