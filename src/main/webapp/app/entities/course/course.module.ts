import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MeStudentSharedModule } from 'app/shared/shared.module';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseUpdateComponent } from './course-update.component';
import { CourseDeleteDialogComponent } from './course-delete-dialog.component';
import { courseRoute } from './course.route';

@NgModule({
  imports: [MeStudentSharedModule, RouterModule.forChild(courseRoute)],
  declarations: [CourseComponent, CourseDetailComponent, CourseUpdateComponent, CourseDeleteDialogComponent],
  entryComponents: [CourseDeleteDialogComponent],
})
export class MeStudentCourseModule {}
