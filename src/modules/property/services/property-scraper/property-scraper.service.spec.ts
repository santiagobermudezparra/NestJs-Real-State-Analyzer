import { Test, TestingModule } from '@nestjs/testing';
import { PropertyScraperService } from './property-scraper.service';

describe('PropertyScraperService', () => {
  let service: PropertyScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyScraperService],
    }).compile();

    service = module.get<PropertyScraperService>(PropertyScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
