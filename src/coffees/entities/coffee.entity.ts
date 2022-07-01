import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";
@Entity() // 每个Entity类代表一个SQL表 @Entity('coffees')表示表名为coffees
export class Coffee {
    @PrimaryGeneratedColumn() // 主键并且自动增加值
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({default: 0})
    recommendations: number;

    //@Column('json', {nullable: true}) // 将数组存储为json
    @JoinTable()
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffees,
        {
            cascade: true // ['insert'] 任何新口味都会自动添加到数据库
        }
    )
    flavors: Flavor[];
}

