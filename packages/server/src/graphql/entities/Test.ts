import { ObjectType, Field} from 'type-graphql';
import { Entity, Column,  PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class Test extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  // @Authorized("ADMIN")
  @Field()
  @Column()
  adminField: string;

  // @Authorized("DEVELOPER")
  @Field()
  @Column()
  developerField: string;

  // @Authorized(["ADMIN","DEVELOPER"])
  @Field()
  @Column()
  adminAndDeveloperField: string;
}
