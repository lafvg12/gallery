import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of image' })
  readonly src: string;
  readonly height: number;
  readonly width: number;
  readonly idUser: MongoIdPipe;

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
