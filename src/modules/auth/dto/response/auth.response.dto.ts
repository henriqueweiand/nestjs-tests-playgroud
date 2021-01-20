import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'token of access', nullable: false })
  token: string;

  @ApiProperty({ description: 'name of user', nullable: false })
  username: string;
}
