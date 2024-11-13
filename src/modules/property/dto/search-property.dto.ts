import { IsEnum, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SearchPropertyDto {
    @ApiProperty({ enum: ['apartamento', 'casa'] })
    @IsEnum(['apartamento', 'casa'])
    propertyType: 'apartamento' | 'casa';

    @ApiProperty({ enum: ['venta', 'arriendo'] })
    @IsEnum(['venta', 'arriendo'])
    businessType: 'venta' | 'arriendo';

    @ApiProperty({ enum: ['nuevo', 'usado'] })
    @IsEnum(['nuevo', 'usado'])
    status: 'nuevo' | 'usado';

    @ApiProperty()
    @IsNumber()
    @Min(0)
    minPrice: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    maxPrice: number;

    @ApiProperty({ required: false })
    @IsOptional()
    includeNew?: boolean;
  }