import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvitation } from 'app/shared/model/invitation.model';
import { InvitationService } from './invitation.service';
import { InvitationDeleteDialogComponent } from './invitation-delete-dialog.component';

@Component({
  selector: 'jhi-invitation',
  templateUrl: './invitation.component.html',
})
export class InvitationComponent implements OnInit, OnDestroy {
  invitations?: IInvitation[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected invitationService: InvitationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.invitationService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IInvitation[]>) => (this.invitations = res.body || []));
      return;
    }

    this.invitationService.query().subscribe((res: HttpResponse<IInvitation[]>) => (this.invitations = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInvitations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInvitation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInvitations(): void {
    this.eventSubscriber = this.eventManager.subscribe('invitationListModification', () => this.loadAll());
  }

  delete(invitation: IInvitation): void {
    const modalRef = this.modalService.open(InvitationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.invitation = invitation;
  }
}
