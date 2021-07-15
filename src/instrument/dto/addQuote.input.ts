import { Field, Float, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class AddQuoteInput {
  @Field()
  @MinLength(6)
  @MaxLength(10)
  ticker: string;

  @Field()
  date: Date;

  @Field((type) => Float)
  open: number;

  @Field((type) => Float)
  close: number;

  @Field({ nullable: true })
  source?: string;
}
