import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Price } from '../../price/models/price.model';

@ObjectType()
export class Instrument {
  @Field((type) => Int)
  id: number;

  @Field()
  ticker: string;

  @Field({ nullable: true })
  baseCurrency?: string;

  @Field({ nullable: true })
  quoteCurrency?: string;

  @Field((returns) => [Price], { nullable: 'itemsAndList' })
  prices?: Price[];
}
