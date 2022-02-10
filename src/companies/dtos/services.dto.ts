import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;
}
import { PartialType } from '@nestjs/swagger';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
