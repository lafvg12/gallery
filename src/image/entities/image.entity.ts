import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  filename: string;

  // @Prop({ required: true })
  // description: string;

  // @Prop({ required: true })
  // url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
