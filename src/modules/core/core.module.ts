import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV } from './helpers/api.helper';
import { DatabaseModule } from '../database/database.module';

@Module({})
export class CoreModule {
  static forRoot(): DynamicModule {
    const envFilePath = ENV();
    const config = ConfigModule.forRoot({
      ...(envFilePath ? { envFilePath } : {}),
    });
    const db = DatabaseModule.forRoot();
    return {
      module: CoreModule,
      global: true,
      imports: [config, db],
      exports: [config, db],
    };
  }
}
