import { PartialType } from '@nestjs/mapped-types';
import { CreateTestCommandDto } from './create-test-command.dto';

export class UpdateTestCommandDto extends PartialType(CreateTestCommandDto) {}
