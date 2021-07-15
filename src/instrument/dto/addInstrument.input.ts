import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class AddInstrumentInput {
  @Field()
  @MinLength(6)
  @MaxLength(10)
  ticker: string;

  @Field()
  baseCurrency?: string;

  @Field()
  quoteCurrency?: string;
}
