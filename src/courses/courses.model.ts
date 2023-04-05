export interface Course {
  id: number;
  title: string;
  description: string;
  author: string;
  url: string;
}

export class CourseNotFound extends Error {
  constructor() {
    super('Course not found');
  }
}
