import { Controller, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(readonly coursesService: CoursesService) {}

  @Get()
  async getAllCourses() {
    const courses = await this.coursesService.getCourses();
    return courses;
  }

  @Get('oi/br')
  async getAllCourses2() {
    return 'hello';
  }
}
