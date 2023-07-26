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
    // console.log('Pipe: id:', id);
    // console.log(!id);
    if (!id) throw new BadRequestException('Invalid ID - expected a number');
    return id;
  }
}
