import { Injectable } from '@nestjs/common';
import { CreateTestCommandDto } from './dto/create-test-command.dto';
import { UpdateTestCommandDto } from './dto/update-test-command.dto';

@Injectable()
export class TestCommandService {
  create(createTestCommandDto: CreateTestCommandDto) {
    return 'This action adds a new testCommand';
  }

  findAll() {
    return `This action returns all testCommand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testCommand`;
  }

  update(id: number, updateTestCommandDto: UpdateTestCommandDto) {
    return `This action updates a #${id} testCommand`;
  }

  remove(id: number) {
    return `This action removes a #${id} testCommand`;
  }
}
