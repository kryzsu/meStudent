import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MeStudentTestModule } from '../../../test.module';
import { InvitationComponent } from 'app/entities/invitation/invitation.component';
import { InvitationService } from 'app/entities/invitation/invitation.service';
import { Invitation } from 'app/shared/model/invitation.model';

describe('Component Tests', () => {
  describe('Invitation Management Component', () => {
    let comp: InvitationComponent;
    let fixture: ComponentFixture<InvitationComponent>;
    let service: InvitationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MeStudentTestModule],
        declarations: [InvitationComponent],
      })
        .overrideTemplate(InvitationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvitationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvitationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Invitation(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.invitations && comp.invitations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
