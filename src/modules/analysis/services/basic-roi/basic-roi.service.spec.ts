import { Test, TestingModule } from '@nestjs/testing';
import { BasicRoiService } from './basic-roi.service';

describe('BasicRoiService', () => {
  let service: BasicRoiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicRoiService],
    }).compile();

    service = module.get<BasicRoiService>(BasicRoiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
