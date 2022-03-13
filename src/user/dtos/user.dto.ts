import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the company' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the company' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the company' })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
