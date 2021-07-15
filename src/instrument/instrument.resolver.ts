import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Instrument } from './models/instrument.model';
import { AddInstrumentInput } from './dto/addInstrument.input';
import { Price } from '../price/models/price.model';
import { AddQuoteInput } from './dto/addQuote.input';

@Resolver((of) => Instrument)
export class InstrumentResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query((returns) => [String], {
    description: 'Gets all available tickers.',
  })
  async getTickers(): Promise<string[]> {
    const instruments = await this.prisma.instrument.findMany();

    return instruments.map((i) => i.ticker);
  }

  @Query((returns) => Instrument, {
    description: 'Gets specific instrument information.',
  })
  async getInstrument(@Args('ticker') ticker: string): Promise<Instrument> {
    return await this.prisma.instrument.findUnique({
      where: {
        ticker: ticker,
      },
    });
  }

  @ResolveField()
  async prices(@Parent() instrument: Instrument): Promise<Price[]> {
    return await this.prisma.price.findMany({
      take: 5, // Return only last 5.
      where: {
        instrumentId: instrument.id,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  @Mutation((returns) => Instrument, {
    description: 'Adds a specific instrument.',
  })
  async addInstrument(
    @Args('data') data: AddInstrumentInput,
  ): Promise<Instrument> {
    return await this.prisma.instrument.create({
      data: {
        ticker: data.ticker,
        baseCurrency: data.baseCurrency,
        quoteCurrency: data.quoteCurrency,
      },
    });
  }

  // TODO:
  // 1. Tickera nie ma w bazie, dodajemy ticker a następnie wycenę.
  // 2. Ticker jest w bazie, dodajemy wycenę !!! case kiedy ta sama wycena jest dodawana kilkukrotnie!!!.
  @Mutation((returns) => Instrument, {
    description:
      'Sends Instrument quote (ticker, date and open/close price, if such instrument does not exist adds a new one.',
  })
  async addQuote(@Args('data') data: AddQuoteInput): Promise<Instrument> {
    try {
      return await this.prisma.instrument.create({
        data: {
          ticker: data.ticker,
          baseCurrency: '',
          quoteCurrency: '',
          prices: {
            create: {
              date: data.date,
              open: data.open,
              close: data.close,
              source: data.source,
            },
          },
        },
      });
    } catch (e) {
      if (e.code !== 'P2002' || e.meta.target[0] !== 'ticker') {
        console.log(e);
        throw e;
      }
    }

    // Chcemy dodać wycenę do już istniejącego instrumentu
    try {
      return await this.prisma.instrument.update({
        where: {
          ticker: data.ticker,
        },
        data: {
          prices: {
            create: {
              date: data.date,
              open: data.open,
              close: data.close,
              source: data.source,
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
      if (
        e.code === 'P2002' &&
        e.meta.target[0] === 'date' &&
        e.meta.target[1] === 'instrumentId'
      ) {
        console.log('Repeated request error!');
      } else {
        throw e;
      }
    }
  }
}
