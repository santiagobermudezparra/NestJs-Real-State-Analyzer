import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Property } from '@common/interfaces/property.interface';
import { Analysis } from '@common/interfaces/analysis.interface';

@Injectable()
export class AnalysisBaseService {
  private readonly inflationRate: number;
  private readonly appreciationRate: number;
  private readonly yearsToProject: number;

  constructor(private readonly configService: ConfigService) {
    this.inflationRate = this.configService.get<number>('config.analysis.inflationRate');
    this.appreciationRate = this.configService.get<number>('config.analysis.appreciationRate');
    this.yearsToProject = this.configService.get<number>('config.analysis.yearsToProject');
  }

  analyzeProperty(property: Property): Analysis {
    const score = this.calculateScore(property);
    return {
      score,
      recommendation: this.generateRecommendation(score),
      details: this.getAnalysisDetails(property, score)
    };
  }

  private calculateScore(property: Property): number {
    const cashFlows = this.projectCashFlows(property);
    const totalReturn = this.calculateTotalReturn(cashFlows, property);
    return totalReturn / property.salePrice * 100;
  }

  private generateRecommendation(score: number): string {
    if (score >= 40) return "Excelente inversión a largo plazo";
    if (score >= 30) return "Buena inversión a largo plazo";
    if (score >= 20) return "Inversión moderada a largo plazo";
    return "Considerar otras opciones de inversión";
  }

  private getAnalysisDetails(property: Property, score: number): Record<string, number | string> {
    const cashFlows = this.projectCashFlows(property);
    const finalValue = property.salePrice * Math.pow(1 + this.appreciationRate, this.yearsToProject);
    
    return {
      fiveYearROI: score,
      projectedAppreciation: finalValue - property.salePrice,
      finalEstimatedValue: finalValue,
      averageMonthlyReturn: this.calculateAverageMonthlyReturn(cashFlows)
    };
  }

  private projectCashFlows(property: Property): number[] {
    const cashFlows: number[] = [];
    let monthlyRent = property.rentalPotential.monthlyRent;
    let monthlyExpenses = property.rentalPotential.monthlyExpenses;

    for (let month = 0; month < this.yearsToProject * 12; month++) {
      if (month % 12 === 0 && month > 0) {
        monthlyRent *= (1 + this.inflationRate);
        monthlyExpenses *= (1 + this.inflationRate);
      }
      cashFlows.push(monthlyRent - monthlyExpenses);
    }

    return cashFlows;
  }

  private calculateTotalReturn(cashFlows: number[], property: Property): number {
    const totalCashFlow = cashFlows.reduce((sum, flow) => sum + flow, 0);
    const appreciation = property.salePrice * 
      (Math.pow(1 + this.appreciationRate, this.yearsToProject) - 1);
    return totalCashFlow + appreciation;
  }

  private calculateAverageMonthlyReturn(cashFlows: number[]): number {
    return cashFlows.reduce((sum, flow) => sum + flow, 0) / cashFlows.length;
  }
}