import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./coffee.entity";

@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    // Coffee是关系的拥有者，所以此处不需要@JoinTable()注解
    @ManyToMany(type => Coffee, coffee => coffee.flavors)
    coffees: Coffee[]
}
