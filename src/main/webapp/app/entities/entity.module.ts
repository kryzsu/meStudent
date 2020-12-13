import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.MeStudentStudentModule),
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.MeStudentTeacherModule),
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.MeStudentCourseModule),
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.MeStudentTaskModule),
      },
      {
        path: 'file',
        loadChildren: () => import('./file/file.module').then(m => m.MeStudentFileModule),
      },
      {
        path: 'invitation',
        loadChildren: () => import('./invitation/invitation.module').then(m => m.MeStudentInvitationModule),
      },
      {
        path: 'comment',
        loadChildren: () => import('./comment/comment.module').then(m => m.MeStudentCommentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MeStudentEntityModule {}
