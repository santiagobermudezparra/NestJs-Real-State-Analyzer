import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis/analysis.controller';
import { AnalysisBaseService } from './services/analysis-base/analysis-base.service';
import { BasicRoiService } from './services/basic-roi/basic-roi.service';
import { AdvancedFinancialService } from './services/advanced-financial/advanced-financial.service';

@Module({
  controllers: [AnalysisController],
  providers: [AnalysisBaseService, BasicRoiService, AdvancedFinancialService]
})
export class AnalysisModule {}
