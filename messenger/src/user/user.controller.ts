import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('test')
  test() {
    console.log('This is a test');
    return { message: 'This is a test' };
  }
}
