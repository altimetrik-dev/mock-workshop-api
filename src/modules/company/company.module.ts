import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company/company.controller';
import { CompanyService } from './services/company/company.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [DatabaseModule.forFeature()],
})
export class CompanyModule {}
