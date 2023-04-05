import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseNotFound } from './courses.model';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  coursesService: CoursesService;
  constructor(coursesService: CoursesService) {
    this.coursesService = coursesService;
  } /* constructor(private readonly coursesService: CoursesService){}   Dependency Injection  */

  @Get() /* Controle method  that there is just a defaut route implemented*/
  async getAllCourses() {
    const courses = await this.coursesService.getCourses();
    return courses;
  }

  @Get(':courseId')
  async getCourseById(@Param('courseId', ParseIntPipe) courseId: number) {
    /* id is a string, so that we need to use ParseIntPipe to convert to number */
    try {
      const course = await this.coursesService.getCourse(courseId);
      return course;
    } catch (error) {
      if (error instanceof CourseNotFound) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
