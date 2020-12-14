import { IUser } from 'app/core/user/user.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IInvitation {
  id?: number;
  invitedBy?: IUser;
  belongsTo?: ICourse;
}

export class Invitation implements IInvitation {
  constructor(public id?: number, public invitedBy?: IUser, public belongsTo?: ICourse) {}
}
