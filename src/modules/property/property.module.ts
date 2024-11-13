import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PropertyController } from './property/property.controller';
import { PropertyService } from './services/property/property.service';
import { PropertyScraperService } from './services/property-scraper/property-scraper.service';
import { AnalysisModule } from '@modules/analysis/analysis.module';
import { AnalysisBaseService } from '../analysis/services/analysis-base/analysis-base.service';



@Module({
  imports: [
    AnalysisModule,
    HttpModule.register({
      timeout: 10000, // 10 segundos
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
      }
    })
  ],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    PropertyScraperService,
    AnalysisBaseService
  ],
  exports: [PropertyService]
})
export class PropertyModule {}
