import { ITask } from 'app/shared/model/task.model';
import { ICourse } from 'app/shared/model/course.model';
import { IComment } from 'app/shared/model/comment.model';

export interface IFile {
  id?: number;
  title?: string;
  dataContentType?: string;
  data?: any;
  taskAttachedTo?: ITask;
  courseAttachedTo?: ICourse;
  commentAttachedTo?: IComment;
}

export class File implements IFile {
  constructor(
    public id?: number,
    public title?: string,
    public dataContentType?: string,
    public data?: any,
    public taskAttachedTo?: ITask,
    public courseAttachedTo?: ICourse,
    public commentAttachedTo?: IComment
  ) {}
}
