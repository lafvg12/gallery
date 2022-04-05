import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of image' })
  readonly filename: string;
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'description of image' })
  // readonly description: string;
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'url' })
  // readonly url: string;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
