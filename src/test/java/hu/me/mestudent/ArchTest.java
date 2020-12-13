package hu.me.mestudent;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("hu.me.mestudent");

        noClasses()
            .that()
            .resideInAnyPackage("hu.me.mestudent.service..")
            .or()
            .resideInAnyPackage("hu.me.mestudent.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..hu.me.mestudent.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
