import { IsEnum, IsNumber, IsOptional, Min, Max, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyType, BusinessType, PropertyStatus } from '@common/interfaces/types';

export class SearchPropertyDto {
    @ApiProperty({ enum: ['apartamento', 'casa'] })
    @IsEnum(['apartamento', 'casa'])
    propertyType: PropertyType;

    @ApiProperty({ enum: ['venta', 'arriendo'] })
    @IsEnum(['venta', 'arriendo'])
    businessType: BusinessType;

    @ApiProperty({ enum: ['nuevo', 'usado'] })
    @IsEnum(['nuevo', 'usado'])
    status: PropertyStatus;

    @ApiProperty()
    @Type(() => Number)  
    @IsNumber()
    @Min(0)
    minPrice: number;

    @ApiProperty()
    @Type(() => Number)  
    @IsNumber()
    @Min(0)
    maxPrice: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    size?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => value === 'true') 
    @IsBoolean()
    includeNew?: boolean;
}