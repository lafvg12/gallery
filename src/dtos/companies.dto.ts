import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @IsNotEmpty()
  readonly address: string;
}
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
