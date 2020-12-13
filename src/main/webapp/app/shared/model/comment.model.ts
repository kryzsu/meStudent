import { ICourse } from 'app/shared/model/course.model';

export interface IComment {
  id?: number;
  content?: string;
  writtenTo?: ICourse;
}

export class Comment implements IComment {
  constructor(public id?: number, public content?: string, public writtenTo?: ICourse) {}
}
