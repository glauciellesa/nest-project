import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Course, CourseNotFound } from './courses.model';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  coursesService: CoursesService;
  constructor(coursesService: CoursesService) {
    this.coursesService = coursesService;
  } /* constructor(private readonly coursesService: CoursesService){}   Dependency Injection  */

  @Get() /* Controle method  that there is just a defaut route implemented.
   @Get method tells Nest to create a handler for a specific endpoint for HTTP requests.*/
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

  @Post()
  async addCourse(@Body() createCourseDto: Course) {
    const course = await this.coursesService.addCourse(createCourseDto);
    return course;
  }

  @Delete(':id')
  async deleteCourse(@Param('id', ParseIntPipe) id: number) {
    const courses = await this.coursesService.deleteCourse(id);
  }
}
