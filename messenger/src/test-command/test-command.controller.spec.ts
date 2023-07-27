import { Test, TestingModule } from '@nestjs/testing';
import { TestCommandController } from './test-command.controller';
import { TestCommandService } from './test-command.service';

describe('TestCommandController', () => {
  let controller: TestCommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCommandController],
      providers: [TestCommandService],
    }).compile();

    controller = module.get<TestCommandController>(TestCommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
