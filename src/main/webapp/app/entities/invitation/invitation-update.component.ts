import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInvitation, Invitation } from 'app/shared/model/invitation.model';
import { InvitationService } from './invitation.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

type SelectableEntity = IUser | ICourse;

@Component({
  selector: 'jhi-invitation-update',
  templateUrl: './invitation-update.component.html',
})
export class InvitationUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  courses: ICourse[] = [];

  editForm = this.fb.group({
    id: [],
    invitedBy: [],
    belongsTo: [],
  });

  constructor(
    protected invitationService: InvitationService,
    protected userService: UserService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invitation }) => {
      this.updateForm(invitation);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.courseService.query().subscribe((res: HttpResponse<ICourse[]>) => (this.courses = res.body || []));
    });
  }

  updateForm(invitation: IInvitation): void {
    this.editForm.patchValue({
      id: invitation.id,
      invitedBy: invitation.invitedBy,
      belongsTo: invitation.belongsTo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invitation = this.createFromForm();
    if (invitation.id !== undefined) {
      this.subscribeToSaveResponse(this.invitationService.update(invitation));
    } else {
      this.subscribeToSaveResponse(this.invitationService.create(invitation));
    }
  }

  private createFromForm(): IInvitation {
    return {
      ...new Invitation(),
      id: this.editForm.get(['id'])!.value,
      invitedBy: this.editForm.get(['invitedBy'])!.value,
      belongsTo: this.editForm.get(['belongsTo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvitation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
