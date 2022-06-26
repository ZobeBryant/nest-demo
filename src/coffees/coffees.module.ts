import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

// 在module添加过的controller和service要在appmodule中删除，否则会实例化两次
@Module({controllers: [CoffeesController], providers: [CoffeesService], })
export class CoffeesModule {}
