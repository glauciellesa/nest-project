import { HttpException, Injectable } from '@nestjs/common';
import { resolve } from 'path';
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

  addCourse(course: Course): Promise<Course[]> {
    return new Promise((resolve) => {
      this.courses.push(course);
      resolve(this.courses);
    });
  }

  deleteCourse(courseId: number): Promise<Course[]> {
    return new Promise((resolve) => {
      let course = this.courses.find((course) => course.id === courseId);
      if (!course) {
        throw new CourseNotFound();
      }
      this.courses.splice(this.courses.indexOf(course), 1);
      resolve(this.courses);
    });

    /*    return new Promise((resolve) => {
      let index = this.courses.findIndex((course) => course.id === courseId);
      if (index === -1) {
        throw new CourseNotFound();
      }
      this.courses.splice(index, 1);
      resolve(this.courses);
    }); */
  }
}
