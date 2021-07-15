import { Module } from '@nestjs/common';
import { PriceResolver } from './price.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PriceResolver],
})
export class PriceModule {}
