import { Args, Query, Resolver } from '@nestjs/graphql';
import { Price } from './models/price.model';
import { GetPricesInBetweenInput } from './dto/getPricesInBetween.input';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class PriceResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query((returns) => [Price], {
    description: 'Gets prices from/to time period for the specific instrument.',
  })
  async getPricesInBetween(
    @Args('data') data: GetPricesInBetweenInput,
  ): Promise<Price[]> {
    const prices = await this.prisma.instrument
      .findUnique({
        where: {
          ticker: data.ticker,
        },
      })
      .prices({
        where: {
          AND: [
            {
              date: {
                gte: data.from,
              },
            },
            {
              date: {
                lte: data.to,
              },
            },
          ],
        },
        orderBy: {
          date: 'desc',
        },
      });

    if (prices) {
      return prices;
    }

    throw new BadRequestException(
      'Instrument with given ticker does not exist!',
    );
  }
}
