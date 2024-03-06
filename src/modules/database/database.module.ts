import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './models/schemas/company.schema';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const db = MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DBNAME,
    });
    return {
      module: DatabaseModule,
      global: true,
      imports: [db],
      exports: [db],
    };
  }

  static forFeature() {
    return MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
    ]);
  }
}
