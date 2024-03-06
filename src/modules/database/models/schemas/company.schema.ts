import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CompanyDocument = mongoose.HydratedDocument<Company>;
export class CompanyConnection {
  reference: string;
  type: string;
}

@Schema()
export class Company {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  connections?: CompanyConnection;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
