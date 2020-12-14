export interface ICourse {
  id?: number;
  name?: string;
  code?: string;
}

export class Course implements ICourse {
  constructor(public id?: number, public name?: string, public code?: string) {}
}
