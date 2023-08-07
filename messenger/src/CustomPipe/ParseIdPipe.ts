import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    // console.log('metadata:', metadata);
    const id = parseInt(value, 10);
    if (!id) throw new BadRequestException('Invalid ID - expected a number');
    return id;
  }
}

@Injectable()
export class CustomParseIntRoom implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    // console.log('metadata:', metadata);
    if (!value) throw new BadRequestException('Empty ID');
    const id = parseInt(value, 10);
    if (!id) throw new BadRequestException('Invalid ID - expected a number');
    return id;
  }
}
