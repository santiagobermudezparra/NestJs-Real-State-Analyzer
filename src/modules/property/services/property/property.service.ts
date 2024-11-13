import { Injectable  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PropertyScraperService } from '../property-scraper/property-scraper.service';
import { AnalysisBaseService } from '../../../analysis/services/analysis-base/analysis-base.service';
import { SearchPropertyDto } from '../../dto/search-property.dto';
import { PropertyType } from '@common/interfaces/types';
import { Property } from '@common/interfaces/property.interface';
import { Analysis,AnalysisResult } from '@common/interfaces/analysis.interface';

@Injectable()
export class PropertyService {

    constructor( 
        private readonly configService:ConfigService,
        private readonly scraperService: PropertyScraperService
    ){
    }

    async searchAndAnalyzeProperties(
        searchParams: SearchPropertyDto
      ): Promise<AnalysisResult[]> {
        const properties = await this.scraperService.searchAllNeighborhoods(searchParams);
        // Analizar cada propiedad
        const analyzedProperties = properties.map(property => ({
            property,
            analysis: this.AnalysisBaseService.analyzeProperty(property)
        }));
    
        // Ordenar por score
        return analyzedProperties.sort((a, b) => b.analysis.score - a.analysis.score);

      }

      getRecommendedNeighborhoods(): string[] {
        return this.configService.get<string[]>('config.neighborhoods.recommended');
      }
}
