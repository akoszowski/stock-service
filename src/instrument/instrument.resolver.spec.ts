import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentResolver } from './instrument.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../../test/singleton';
import { Instrument } from './models/instrument.model';
import { AddInstrumentInput } from './dto/addInstrument.input';

describe('InstrumentResolver', () => {
  let resolver: InstrumentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentResolver, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    resolver = module.get<InstrumentResolver>(InstrumentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  const instruments: Instrument[] = [
    {
      id: 1,
      ticker: 'btcusd',
      baseCurrency: 'btc',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 2,
      ticker: 'ethusd',
      baseCurrency: 'eth',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 3,
      ticker: 'ltcusd',
      baseCurrency: 'ltc',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 4,
      ticker: 'adausd',
      baseCurrency: 'ada',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 5,
      ticker: 'dotusd',
      baseCurrency: 'dot',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 6,
      ticker: 'bchtusd',
      baseCurrency: 'bcht',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 7,
      ticker: 'xlmusd',
      baseCurrency: 'xlm',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 8,
      ticker: 'linkusd',
      baseCurrency: 'link',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 9,
      ticker: 'usdtusd',
      baseCurrency: 'usdt',
      quoteCurrency: 'usd',
      prices: [],
    },
    {
      id: 10,
      ticker: 'xmrusd',
      baseCurrency: 'xmr',
      quoteCurrency: 'usd',
      prices: [],
    },
  ];

  // it('should return instruments', async () => {
  //   prismaMock.instrument.findMany.mockResolvedValue(instruments);
  //
  //   await expect(resolver.getTickers()).resolves.toEqual(
  //     instruments.map((i) => i.ticker),
  //   );
  // });

  // it('should add instrument', async () => {
  //   const i: AddInstrumentInput = {
  //     ticker: 'btcusd',
  //     baseCurrency: 'btc',
  //     quoteCurrency: 'usd',
  //   };
  //
  //   prismaMock.instrument.create.mockResolvedValue({
  //     id: 1,
  //     ticker: 'btcusd',
  //     baseCurrency: 'btc',
  //     quoteCurrency: 'usd',
  //   });
  //
  //   await expect(resolver.addInstrument(i)).resolves.toEqual({
  //     id: 1,
  //     ticker: 'btcusd',
  //     baseCurrency: 'btc',
  //     quoteCurrency: 'usd',
  //   });
  //
  //   expect(prismaMock.instrument.create).toHaveBeenCalled();
  // });
});
