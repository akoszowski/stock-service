import { Test, TestingModule } from '@nestjs/testing';
import { PriceResolver } from './price.resolver';
import { PrismaService } from '../prisma/prisma.service';

describe('PriceResolver', () => {
  let resolver: PriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceResolver, PrismaService],
    }).compile();

    resolver = module.get<PriceResolver>(PriceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
