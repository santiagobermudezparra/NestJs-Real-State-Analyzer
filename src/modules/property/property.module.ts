import { Module } from '@nestjs/common';
import { PropertyController } from './property/property.controller';
import { PropertyService } from './services/property/property.service';
import { PropertyScraperService } from './services/property-scraper/property-scraper.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, PropertyScraperService]
})
export class PropertyModule {}
