import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class GetPricesInBetweenInput {
  @Field()
  @MinLength(6)
  @MaxLength(10)
  ticker: string;

  @Field()
  from: Date;

  @Field()
  to: Date;
}