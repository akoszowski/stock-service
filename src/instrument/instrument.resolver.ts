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
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

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
    try {
      return await this.prisma.instrument.create({
        data: {
          ticker: data.ticker,
          baseCurrency: data.baseCurrency,
          quoteCurrency: data.quoteCurrency,
        },
      });
    } catch (e) {
      if (e.code === 'P2002' && e.meta.target[0] === 'ticker') {
        throw new BadRequestException(
          'Instrument with given ticker already exists!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

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
        throw new InternalServerErrorException();
      }
    }

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
        throw new BadRequestException('Repeated request!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
