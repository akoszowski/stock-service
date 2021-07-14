import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Price {
  @Field((type) => Int)
  id: number;

  @Field()
  date: Date;

  @Field((type) => Float)
  open: number;

  @Field((type) => Float)
  close: number;

  @Field({ nullable: true })
  source?: string;

  @Field((type) => Int)
  instrumentId: number;
}
