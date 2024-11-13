// src/modules/property/dto/analysis-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RentalPotentialDto {
  @ApiProperty()
  monthlyRent: number;

  @ApiProperty()
  monthlyExpenses: number;

  @ApiProperty()
  estimatedFlow: number;

  @ApiProperty()
  annualROI: number;
}

export class PropertyContactDto {
  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  whatsapp?: string;

  @ApiProperty({ required: false })
  realEstate?: string;
}

export class PropertyDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty({ required: false })
  commonNeighborhood?: string;

  @ApiProperty()
  salePrice: number;

  @ApiProperty()
  totalArea: number;

  @ApiProperty()
  builtArea: number;

  @ApiProperty()
  rooms: number;

  @ApiProperty()
  bathrooms: number;

  @ApiProperty()
  parking: number;

  @ApiProperty()
  stratum: number;

  @ApiProperty()
  administration: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ required: false })
  pricePerM2: number | null;

  @ApiProperty({ type: RentalPotentialDto })
  rentalPotential: RentalPotentialDto;

  @ApiProperty({ type: PropertyContactDto })
  contact: PropertyContactDto;

  @ApiProperty()
  url: string;

  @ApiProperty({ required: false })
  photo?: string;

  @ApiProperty()
  yieldRate: number;
}

export class AnalysisDto {
  @ApiProperty()
  score: number;

  @ApiProperty({ required: false })
  recommendation?: string;

  @ApiProperty()
  details: Record<string, number | string>;
}

export class AnalysisResultDto {
  @ApiProperty({ type: PropertyDto })
  property: PropertyDto;

  @ApiProperty({ type: AnalysisDto })
  analysis: AnalysisDto;
}