import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { UpdateImageDto, CreateImageDto } from '../dtos/image.dto';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Get all images' })
  getImage() {
    return this.imageService.getAllImages();
  }

  @Post('/')
  @ApiOperation({ summary: 'create image' })
  createImage(@Body() payload: CreateImageDto) {
    return this.imageService.create(payload);
  }

  @Post('/:id')
  @ApiOperation({ summary: 'update image' })
  updateImage(
    @Body() payload: UpdateImageDto,
    @Param('id', MongoIdPipe) id: string,
  ) {
    return this.imageService.update(id, payload);
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'Get images for Id' })
  deleteImage(@Param('id', MongoIdPipe) id: string) {
    return this.imageService.deleteImage(id);
  }
}
