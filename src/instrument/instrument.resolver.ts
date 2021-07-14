import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Instrument } from './models/instruments.model';

@Resolver((of) => Instrument)
export class InstrumentResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query((returns) => [String])
  async getInstruments(): Promise<string[]> {
    const instruments = await this.prisma.instrument.findMany();

    return instruments.map((i) => i.ticker);
  }
}
