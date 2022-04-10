import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  src: string;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  idUser: MongoIdPipe;

  // @Prop({ required: true })
  // description: string;

  // @Prop({ required: true })
  // url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
