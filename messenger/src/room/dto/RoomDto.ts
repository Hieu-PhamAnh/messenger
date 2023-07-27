import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  @IsNumber()
  user1: number;

  @IsNotEmpty()
  @IsNumber()
  user2: number;
}
