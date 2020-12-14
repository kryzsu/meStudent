package hu.me.mestudent.repository.search;

import hu.me.mestudent.domain.File;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link File} entity.
 */
public interface FileSearchRepository extends ElasticsearchRepository<File, Long> {
}
