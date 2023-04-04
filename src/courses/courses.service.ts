import { HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './courses.mock';

@Injectable()
export class CoursesService {
  courses = COURSES;

  getCourses(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.courses);
    });
  }
  /* getCourse(courseId: any): Promise<any> {
    let id = Number(courseId);
    return new Promise((resolve) => {
      const course = this.courses.find((course) => course.id === id);
      if (!course) {
        throw new HttpException('Course does not exist', 404);
      }
      resolve(course);
    });
  } */
}
