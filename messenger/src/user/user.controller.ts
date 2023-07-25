import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('test')
  test() {
    console.log('This is a test');
    const a: string = process.env.DATABASE_URL;
    console.log(a);
    return { message: a };
  }
}
