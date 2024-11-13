import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Property } from '@common/interfaces/property.interface';
import { SearchPropertyDto } from '../../dto/search-property.dto';

@Injectable()
export class PropertyScraperService {

    private readonly headers: any;
    private readonly neighborhoodYields: Record<string, number>;
    private readonly recommendedNeighborhoods: string[];

  constructor(
    private readonly configService: ConfigService,
  ) {

    this.headers = this.configService.get('config.api.headers');
    this.neighborhoodYields = this.configService.get('config.neighborhoods.yields');
    this.recommendedNeighborhoods = this.configService.get('config.neighborhoods.recommended');
  }

  async searchAllNeighborhoods(params: SearchPropertyDto): Promise<Property[]> {
    const allProperties: Property[] = [];
    
    for (const neighborhood of this.recommendedNeighborhoods) {
      try {
        // const properties = await this.searchByNeighborhood(neighborhood, params);
        // allProperties.push(...properties);
      } catch (error) {
        console.error(`Error searching in ${neighborhood}:`, error);
      }
    }

    return allProperties;
  }
}
