import { IUser } from 'app/core/user/user.model';
import { ICourse } from 'app/shared/model/course.model';

export interface ITeacher {
  id?: number;
  name?: string;
  isa?: IUser;
  manages?: ICourse;
}

export class Teacher implements ITeacher {
  constructor(public id?: number, public name?: string, public isa?: IUser, public manages?: ICourse) {}
}
