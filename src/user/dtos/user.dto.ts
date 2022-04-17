import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the rol' })
  readonly role: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "the user' password", deprecated: true })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
