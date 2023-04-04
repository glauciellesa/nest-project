/* Contain the basic sercice implementation */
import { Injectable } from '@nestjs/common';

@Injectable() /*  = decorator */
export class AppService {
  getHello(): string {
    return 'Hello world! :)';
  }
}
