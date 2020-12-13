import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from './comment.service';
import { CommentDeleteDialogComponent } from './comment-delete-dialog.component';

@Component({
  selector: 'jhi-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit, OnDestroy {
  comments?: IComment[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected commentService: CommentService,
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
      this.commentService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IComment[]>) => (this.comments = res.body || []));
      return;
    }

    this.commentService.query().subscribe((res: HttpResponse<IComment[]>) => (this.comments = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInComments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IComment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInComments(): void {
    this.eventSubscriber = this.eventManager.subscribe('commentListModification', () => this.loadAll());
  }

  delete(comment: IComment): void {
    const modalRef = this.modalService.open(CommentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.comment = comment;
  }
}
