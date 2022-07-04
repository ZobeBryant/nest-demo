import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import {Event} from '../events/entities/event.entity'
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';


// 此装饰器将类标记为提供者
// @Injectable({scope: Scope.DEFAULT})
// @Injectable({scope: Scope.TRANSIENT}) // 多次实例化 CoffesService用在CoffeesController和CoffeeBrandsFactory中
// @Injectable({scope: Scope.REQUEST}) // 为每个传入请求创建新实例并在请求完成后进行垃圾回收 可能会对程序的性能产生影响（因为会创建多个实例）
@Injectable()
export class CoffeesService {
    // 将实体存储到仓库中（仓库是抽象出来的概念，用来与数据源交互）
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection, // 用于创建事务
        @Inject('COFFEE_BRANDS') coffeeBrands: string[],
        // private readonly configService: ConfigService

        @Inject(coffeesConfig.KEY)
        private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>
    ) {
        // console.log(coffeeBrands)
        // console.log('CoffeesService instantiated')
        
        //const databaseHost = this.configService.get('database.host', 'localhost')
        //console.log(databaseHost)

        /* const coffeesConfig = this.configService.get('coffees');
        console.log(coffeesConfig) */

        console.log(coffeesConfiguration.foo)
     }

    findAll(paginationQueryDto: PaginationQueryDto) {
        const { limit, offset } = paginationQueryDto
        return this.coffeeRepository.find({
            relations: ["flavors"],
            skip: offset,
            take: limit
        })
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ["flavors"] // 默认情况下不加载关系
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)))
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors &&
            (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
            ));
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    // 通过事务管理器进行多个数据库操作，多个操作成功后才算成功，否则回滚操作。
    async recommendCoffee(coffee: Coffee) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };

            // 实体管理器
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();

        } catch (error) {
            // 回滚
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release()
        }
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor)
            return existingFlavor;
        return this.flavorRepository.create({ name })
    }

}
