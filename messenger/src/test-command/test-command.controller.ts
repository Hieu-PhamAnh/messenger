import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestCommandService } from './test-command.service';
import { CreateTestCommandDto } from './dto/create-test-command.dto';
import { UpdateTestCommandDto } from './dto/update-test-command.dto';

@Controller('test-command')
export class TestCommandController {
  constructor(private readonly testCommandService: TestCommandService) {}

  @Post()
  create(@Body() createTestCommandDto: CreateTestCommandDto) {
    return this.testCommandService.create(createTestCommandDto);
  }

  @Get()
  findAll() {
    return this.testCommandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testCommandService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestCommandDto: UpdateTestCommandDto,
  ) {
    return this.testCommandService.update(+id, updateTestCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testCommandService.remove(+id);
  }
}
