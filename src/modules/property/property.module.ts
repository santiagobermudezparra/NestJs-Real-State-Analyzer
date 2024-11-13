import { Module } from '@nestjs/common';
import { PropertyController } from './property/property.controller';
import { PropertyService } from './services/property/property.service';
import { PropertyScraperService } from './services/property-scraper/property-scraper.service';
import { AnalysisModule } from '@modules/analysis/analysis.module';


@Module({
  imports: [
    AnalysisModule
  ],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    PropertyScraperService
  ],
  exports: [PropertyService]
})
export class PropertyModule {}
