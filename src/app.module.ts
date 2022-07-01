import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync( {
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true // 与数据库同步
      })
    }),
    ConfigModule.forRoot({ // 默认位置加载和解析.env文件
      // ignoreEnvFile:true // .env文件被ConfigModule完全忽略
      // 验证env

      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.required(),
      //   DATABASE_PORT: Joi.number().default(5432),
      // })

      load: [appConfig],
    }),
    CoffeesModule,
    /* TypeOrmModule.forRoot(
      {
        // type: 'postgres',
        // host: 'localhost',
        // port: '5432',
        // username: 'postgres',
        // password: '123456',
        // database: 'postgres',
        // autoLoadEntities: true,
        // synchronize: true // 与数据库同步
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true // 与数据库同步
      }
    ),  */
    CoffeeRatingModule, 
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
