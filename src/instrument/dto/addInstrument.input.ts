import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class AddInstrumentInput {
  @Field()
  @Length(4, 12)
  ticker: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  baseCurrency?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  quoteCurrency?: string;
}
