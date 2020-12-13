import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MeStudentSharedModule } from 'app/shared/shared.module';
import { FileComponent } from './file.component';
import { FileDetailComponent } from './file-detail.component';
import { FileUpdateComponent } from './file-update.component';
import { FileDeleteDialogComponent } from './file-delete-dialog.component';
import { fileRoute } from './file.route';

@NgModule({
  imports: [MeStudentSharedModule, RouterModule.forChild(fileRoute)],
  declarations: [FileComponent, FileDetailComponent, FileUpdateComponent, FileDeleteDialogComponent],
  entryComponents: [FileDeleteDialogComponent],
})
export class MeStudentFileModule {}
