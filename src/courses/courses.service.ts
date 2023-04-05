import { HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './courses.mock';
import { Course, CourseNotFound } from './courses.model';

@Injectable()
export class CoursesService {
  courses = COURSES;

  getCourses(): Promise<Course[]> {
    return new Promise((resolve) => {
      resolve(this.courses);
    });
  }

  getCourse(courseId: number): Promise<Course> {
    return new Promise((resolve) => {
      const course = this.courses.find((course) => course.id === courseId);

      if (!course) {
        throw new CourseNotFound();
      }
      resolve(course);
    });
  }
}
