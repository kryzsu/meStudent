import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFile } from 'app/shared/model/file.model';
import { FileService } from './file.service';
import { FileDeleteDialogComponent } from './file-delete-dialog.component';

@Component({
  selector: 'jhi-file',
  templateUrl: './file.component.html',
})
export class FileComponent implements OnInit, OnDestroy {
  files?: IFile[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected fileService: FileService,
    protected dataUtils: JhiDataUtils,
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
      this.fileService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IFile[]>) => (this.files = res.body || []));
      return;
    }

    this.fileService.query().subscribe((res: HttpResponse<IFile[]>) => (this.files = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFiles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFile): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInFiles(): void {
    this.eventSubscriber = this.eventManager.subscribe('fileListModification', () => this.loadAll());
  }

  delete(file: IFile): void {
    const modalRef = this.modalService.open(FileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.file = file;
  }
}
