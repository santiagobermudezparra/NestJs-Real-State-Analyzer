// src/common/interfaces/analysis.interface.ts
import { Property } from './property.interface';

export interface Analysis {
    score: number;
    recommendation?: string;
    details: Record<string, number | string>;
}

export interface AnalysisResult {
    property: Property;
    analysis: Analysis;
}

export interface AnalysisService {
    analyzeProperty(property: Property): Analysis;
}