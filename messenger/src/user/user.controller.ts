import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { CustomParseIntPipe } from 'src/CustomPipe/ParseIdPipe';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('test')
  test() {
    console.log('This is a test');
    const a: string = process.env.DATABASE_URL;
    return { message: a };
  }

  @Get(':id')
  getUser(@Param('id', CustomParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  editUser(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(id, dto);
  }
}
