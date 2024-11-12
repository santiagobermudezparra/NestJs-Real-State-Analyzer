import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PropertyModule } from './modules/property/property.module';
import { AnalysisModule } from './modules/analysis/analysis.module';
import configuration from './common/config/configuration';  

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],  
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    PropertyModule,
    AnalysisModule,
  ],
})
export class AppModule {}