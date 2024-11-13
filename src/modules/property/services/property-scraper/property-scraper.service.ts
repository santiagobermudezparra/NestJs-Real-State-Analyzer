import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Property } from '@common/interfaces/property.interface';
import { SearchPropertyDto } from '../../dto/search-property.dto';
import { HttpService } from '@nestjs/axios';
import { baseUrl } from '@common/interfaces/types';
import { lastValueFrom } from 'rxjs';
import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios';

@Injectable()
export class PropertyScraperService {
    private readonly logger = new Logger(PropertyScraperService.name);
    private readonly headers: any;
    private readonly neighborhoodYields: Record<string, number>;
    private readonly recommendedNeighborhoods: string[];

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {

    this.headers = this.configService.get('config.api.headers');
    this.neighborhoodYields = this.configService.get('config.neighborhoods.yields');
    this.recommendedNeighborhoods = this.configService.get('config.neighborhoods.recommended');
  }

  async searchAllNeighborhoods(params: SearchPropertyDto): Promise<Property[]> {
    const allProperties: Property[] = [];
    
    for (const neighborhood of this.recommendedNeighborhoods) {
      try {
        const properties = await this.searchByNeighborhood(neighborhood, params);
        allProperties.push(...properties);
      } catch (error) {
        console.error(`Error searching in ${neighborhood}:`, error);
      }
    }

    return allProperties;
  }

  private async searchByNeighborhood(
    neighborhood:string,
    params: SearchPropertyDto
  ): Promise<Property[]>{

    const properties: Property[] = [];
    let from = 0;
    const size =  50;
    let hasMorePages = true;
    const MAX_PAGES = 10;

    while (hasMorePages && (from/size) < MAX_PAGES) {
        try {
            const url = 'https://www.metrocuadrado.com/rest-search/search';
            const queryParams = this.buildQueryParams(neighborhood, params, from, size);
            const response = await this.makeRequest(queryParams);

            if (response.data?.results) {
                const filteredResults = this.filterResults(response.data.results, params);
                const processedProperties = this.processResults(filteredResults, neighborhood);
                properties.push(...processedProperties);

                from += size;
                hasMorePages = from < response.data.totalResults && filteredResults.length > 0;
            } else {
                hasMorePages = false;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Error in page ${from/size + 1} for ${neighborhood}:`, error);
            hasMorePages = false;
        }
    }

    return properties;
  }


  private processResults(results: any[], neighborhood: string): Property[] {
    return results.map(result => {
      const yieldRate = this.neighborhoodYields[neighborhood] || 6.0;
      const rentalPotential = this.calculateRentalPotential(result, yieldRate);

      return {
        code: result.midinmueble,
        type: result.mtipoinmueble?.nombre,
        neighborhood: result.mbarrio,
        commonNeighborhood: result.mnombrecomunbarrio,
        salePrice: result.mvalorventa,
        totalArea: result.mareac,
        builtArea: result.marea,
        rooms: result.mnrocuartos,
        bathrooms: result.mnrobanos,
        parking: result.mnrogarajes,
        stratum: result.mestrato,
        administration: parseFloat(result.data?.mvaloradministracion) || 0,
        status: result.mestadoinmueble,
        pricePerM2: result.marea ? Math.round(result.mvalorventa / result.marea) : null,
        rentalPotential,
        contact: {
          phone: result.contactPhone,
          whatsapp: result.whatsapp,
          realEstate: result.mcontactoinmobiliaria_fijo1
        },
        url: `${baseUrl}${result.link}`,
        photo: result.imageLink,
        yieldRate
      };
    });
  }

  private calculateRentalPotential(property: any, yieldRate: number) {
    const monthlyRent = Math.round((property.mvalorventa * (yieldRate/100)) / 12);
    const administration = parseFloat(property.data?.mvaloradministracion) || 0;
    const monthlyExpenses = administration + 120000;
    const estimatedFlow = monthlyRent - monthlyExpenses;
    
    return {
      monthlyRent,
      monthlyExpenses,
      estimatedFlow,
      annualROI: (estimatedFlow * 12 / property.mvalorventa) * 100
    };
  }

  private filterResults(results: any[], params: SearchPropertyDto): any[] {
    return results.filter(result => {
        const cityName = (result.mciudad?.nombre || '').toLowerCase();
        const isBogota = ['bogotá d.c.', 'bogota d.c.', 'bogotá', 'bogota'].includes(cityName);
        
        const meetsPrice = result.mvalorventa >= params.minPrice && 
                         result.mvalorventa <= params.maxPrice;
        
        if (params.includeNew) {
            return isBogota && meetsPrice;
        }
        
        const administration = parseFloat(result.data?.mvaloradministracion);
        return isBogota && 
               meetsPrice && 
               !isNaN(administration) && 
               administration >= 80000;
    });
}

    private buildQueryParams(neighborhood: string, params: SearchPropertyDto, from: number, size: number): string {
        const queryParams = new URLSearchParams();
        
        queryParams.append('realEstateTypeList', params.propertyType);
        queryParams.append('saleRange', params.minPrice.toString());
        queryParams.append('saleRange', params.maxPrice.toString());
        queryParams.append('realEstateBusinessList', params.businessType);
        queryParams.append('realEstateStatusList', params.status);
        queryParams.append('locationsList', neighborhood);
        queryParams.append('from', from.toString());
        queryParams.append('size', size.toString());

        return queryParams.toString();
    }

    private async makeRequest(queryParams: string): Promise<any> {
        try {

            const url = `${baseUrl}/rest-search/search?${queryParams}`;
            const response = await lastValueFrom(
              this.httpService.get(url, { headers: this.headers })
            );
          return response.data;
        } catch (error) {
          this.logger.error('Error making HTTP request:', error);
          throw error;
        }
      }


}
