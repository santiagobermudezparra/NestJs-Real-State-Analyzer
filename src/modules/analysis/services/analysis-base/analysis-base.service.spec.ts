import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisBaseService } from './analysis-base.service';

describe('AnalysisBaseService', () => {
  let service: AnalysisBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysisBaseService],
    }).compile();

    service = module.get<AnalysisBaseService>(AnalysisBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
