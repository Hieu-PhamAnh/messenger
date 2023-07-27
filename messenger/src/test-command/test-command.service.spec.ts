import { Test, TestingModule } from '@nestjs/testing';
import { TestCommandService } from './test-command.service';

describe('TestCommandService', () => {
  let service: TestCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestCommandService],
    }).compile();

    service = module.get<TestCommandService>(TestCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
