import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto, SearchDto } from './dto';
import { CustomParseIntPipe } from 'src/CustomPipe/ParseIdPipe';
import { JwtAccessGuard } from 'src/auth/guard/jwtAccess.guard';

@Controller('users')
@UseGuards(JwtAccessGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('test')
  test() {
    console.log('This is a test');
    const a: string = process.env.DATABASE_URL;
    return { message: a };
  }

  @Get('search')
  searchByUsername(@Body() dto: SearchDto) {
    return this.userService.searchByUsername(dto);
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

  @Delete(':id')
  deleteUser(@Param('id', CustomParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
