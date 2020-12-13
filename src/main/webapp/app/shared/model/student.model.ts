import { IUser } from 'app/core/user/user.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IStudent {
  id?: number;
  name?: string;
  isa?: IUser;
  assegnedTo?: ICourse;
}

export class Student implements IStudent {
  constructor(public id?: number, public name?: string, public isa?: IUser, public assegnedTo?: ICourse) {}
}
