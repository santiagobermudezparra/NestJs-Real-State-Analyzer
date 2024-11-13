import { Controller, Get, Query, ValidationPipe,HttpException,HttpStatus} from '@nestjs/common';
import { SearchPropertyDto } from '../dto/search-property.dto';
import { AnalysisResultDto } from '../dto/analysis-response.dto';
import { ApiTags, ApiOperation, ApiResponse,ApiQuery } from '@nestjs/swagger';
import { PropertyService } from '../services/property/property.service';

@ApiTags('properties')
@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}

    @Get('search')
    @ApiOperation({ summary: 'Search properties with analysis' })
    @ApiResponse({ 
        status: 200, 
        description: 'Return analyzed properties',
        type: [AnalysisResultDto]  
    })
    @ApiOperation({ summary: 'Search properties with analysis' })
    @ApiQuery({ name: 'propertyType', enum: ['apartamento', 'casa'] })
    @ApiQuery({ name: 'businessType', enum: ['venta', 'arriendo'] })
    @ApiQuery({ name: 'status', enum: ['nuevo', 'usado'] })
    @ApiQuery({ name: 'minPrice', type: 'number' })
    @ApiQuery({ name: 'maxPrice', type: 'number' })
    @ApiQuery({ name: 'size', type: 'number', required: false })
    @ApiQuery({ name: 'includeNew', type: 'boolean', required: false })
    async searchProperties(
        @Query(ValidationPipe) searchParams: SearchPropertyDto
    ) {
        try {
            return await this.propertyService.searchAndAnalyzeProperties(searchParams);
        } catch (error) {
            throw new HttpException(
                'Error searching properties: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get('neighborhoods')
    @ApiOperation({ summary: 'Get recommended neighborhoods' })
    @ApiResponse({ 
        status: 200, 
        description: 'Return list of recommended neighborhoods',
        type: [String] 
    })
    getNeighborhoods() {
        return this.propertyService.getRecommendedNeighborhoods();
    }
}