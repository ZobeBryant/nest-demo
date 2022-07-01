import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

class MockCoffeesService { }
class ConfigService { }
class DevelopmentConfigService { }
class ProductionConfigService { }

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        /* do something ... */
        return ['buddy brew', 'nescafe'];
    }
}

// 在module添加过的controller和service要在appmodule中删除，否则会实例化两次
@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffeesConfig)], // 将TypeORM注册到此模块中 forFeature用来注册实体
        controllers: [CoffeesController],
    // providers: [CoffeesService], // IOC 控制反转的容器 单例模式
    /* providers:[
        {
            provide: CoffeesService,
            useClass: CoffeesService,
        }
    ] */
    // providers:[{provide: CoffeesService, useValue: new MockCoffeesService()}], 

    // 自定义providers:useValue、useClass、useFactory; useValue有助于注入constant值; useFactory允许动态创建提供者
    /* providers: [
        CoffeesService,
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService,
        },
        { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }
    ], */
    /*  providers: [
         CoffeesService,
         CoffeeBrandsFactory,
         { 
             provide: COFFEE_BRANDS, 
             useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
             inject: [CoffeeBrandsFactory], // inject接收提供者数组，这些依赖传入到useFactory函数中，可以任意使用
          }
         ], */

    // 异步provider
    /* providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: async (connection: Connection): Promise<string[]> => {
                // const coffeeBrands = await connection.query('SELECT * ...')
                const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
                return coffeeBrands;
            },
            inject: [Connection], // inject接收提供者数组，这些依赖传入到useFactory函数中，可以任意使用
        }
    ], */
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        { 
            provide: COFFEE_BRANDS, 
            useFactory: () => ['buddy brew', 'nescafe'],
            scope: Scope.TRANSIENT,
         }
        ],
    exports: [CoffeesService], // 供其他模块使用
})
export class CoffeesModule { }
