import { Field, InputType } from '@nestjs/graphql';
import { IsDate, Length } from 'class-validator';

@InputType()
export class GetPricesInBetweenInput {
  @Field()
  @Length(4, 12)
  ticker: string;

  @Field()
  @IsDate()
  from: Date;

  @Field()
  @IsDate()
  to: Date;
}
