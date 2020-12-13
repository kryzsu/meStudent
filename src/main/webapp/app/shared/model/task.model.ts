export interface ITask {
  id?: number;
}

export class Task implements ITask {
  constructor(public id?: number) {}
}
