// src/common/interfaces/property.interface.ts
import { PropertyType, BusinessType, PropertyStatus } from './types';

export interface PropertyContact {
    phone?: string;
    whatsapp?: string;
    realEstate?: string;
}

export interface RentalPotential {
    monthlyRent: number;
    monthlyExpenses: number;
    estimatedFlow: number;
    annualROI: number;
}

export interface Property {
    code: string;
    type: PropertyType; 
    neighborhood: string;
    commonNeighborhood?: string;
    salePrice: number;
    totalArea: number;
    builtArea: number;
    rooms: number;
    bathrooms: number;
    parking: number;
    stratum: number;
    administration: number;
    status: PropertyStatus; 
    pricePerM2: number | null;
    rentalPotential: RentalPotential;
    contact: PropertyContact;
    url: string;
    photo?: string;
    yieldRate: number;
}

export interface SearchParams {
    propertyType: PropertyType;
    businessType: BusinessType;
    status: PropertyStatus;
    minPrice: number;
    maxPrice: number;
    size?: number;
    includeNew?: boolean;
}