import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppResolver } from './app.resolver';
import { PrismaModule } from './prisma/prisma.module';
import { InstrumentModule } from './instrument/instrument.module';
import { PriceModule } from './price/price.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    PrismaModule,
    InstrumentModule,
    PriceModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
