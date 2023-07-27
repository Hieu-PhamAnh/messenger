import { IsNotEmpty, IsNumber } from 'class-validator';
import { CustomParseIntRoom } from 'src/CustomPipe/ParseIdPipe';

export class RoomDto {
  @IsNotEmpty()
  @IsNumber()
  user1: number;

  @IsNotEmpty()
  @IsNumber()
  user2: number;
}
