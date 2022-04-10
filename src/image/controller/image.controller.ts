import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { UpdateImageDto, CreateImageDto } from '../dtos/image.dto';
import { ImageService } from '../service/image.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../src/auth/guards/roles.guard';

import { Public } from '../../../src/auth/decorators/nombre.decorator';
import { Roles } from '../../../src/auth/decorators/roles.decorator';
import { Role } from '../../../src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Public()
  @Get('/all')
  @ApiOperation({ summary: 'Get all images' })
  getImage() {
    return this.imageService.getAllImages();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all images' })
  getImageById(@Param('id', MongoIdPipe) id: string) {
    return this.imageService.findOne(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all images' })
  getImageByIdUser(@Param('id', MongoIdPipe) id: string) {
    return this.imageService.findOneImageUser(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'create image' })
  createImage(@Body() payload: CreateImageDto) {
    return this.imageService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Post('/upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', MongoIdPipe) id: MongoIdPipe,
  ) {
    const url = await this.imageService.sendAws(file, id);
    return {
      url,
    };
  }

  @Roles(Role.ADMIN)
  @Post('/:id')
  @ApiOperation({ summary: 'update image' })
  updateImage(
    @Body() payload: UpdateImageDto,
    @Param('id', MongoIdPipe) id: string,
  ) {
    return this.imageService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  @ApiOperation({ summary: 'Get images for Id' })
  deleteImage(@Param('id', MongoIdPipe) id: string) {
    return this.imageService.deleteImage(id);
  }
}
