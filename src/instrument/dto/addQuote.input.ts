import { Field, Float, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString, Length } from "class-validator";

@InputType()
export class AddQuoteInput {
  @Field()
  @Length(4, 12)
  ticker: string;

  @Field()
  @IsDate()
  date: Date;

  @Field((type) => Float)
  @IsNumber()
  open: number;

  @Field((type) => Float)
  @IsNumber()
  close: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  source?: string;
}
