import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SearchPropertyDto } from '../dto/search-property.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PropertyService } from '../services/property/property.service';

@ApiTags('properties')
@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService:PropertyService){}

    @Get('search')
    @ApiOperation({ summary: 'Search properties with analysis' })
    @ApiResponse({ status: 200, description: 'Return analyzed properties' })
    async sarchProperties(@Query(ValidationPipe) searchParams: SearchPropertyDto){
        return this.propertyService.getRecommendedNeighborhoods();
    }

    
}
