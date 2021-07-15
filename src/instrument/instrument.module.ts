import { Module } from '@nestjs/common';
import { InstrumentResolver } from './instrument.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InstrumentResolver],
})
export class InstrumentModule {}
