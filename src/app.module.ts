import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: '5432',
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true // 与数据库同步
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
