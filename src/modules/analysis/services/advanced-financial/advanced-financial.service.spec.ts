import { Test, TestingModule } from '@nestjs/testing';
import { AdvancedFinancialService } from './advanced-financial.service';

describe('AdvancedFinancialService', () => {
  let service: AdvancedFinancialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvancedFinancialService],
    }).compile();

    service = module.get<AdvancedFinancialService>(AdvancedFinancialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
