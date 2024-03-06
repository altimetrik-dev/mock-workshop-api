import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [CoreModule.forRoot(), CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
