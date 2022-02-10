import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the company' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @IsNotEmpty()
  readonly address: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
