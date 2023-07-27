import { Module } from '@nestjs/common';
import { TestCommandService } from './test-command.service';
import { TestCommandController } from './test-command.controller';

@Module({
  controllers: [TestCommandController],
  providers: [TestCommandService]
})
export class TestCommandModule {}
