import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';

// 静态模块 不能自定义
/* @Module({
    providers:[{
        provide: 'CONNECTION',
        useValue: createConnection({
           type: 'postgres',
           host: 'localhost',
           port: 5432,
        })
    }]
}) */

// 动态模块 可以自定义type、host和port
@Module({})
export class DatabaseModule {
    static register(options: ConnectionOptions): DynamicModule{
        return {
            module: DatabaseModule,
            providers:[{
                provide: 'CONNECTION',
                useValue: createConnection(options)
            }]
        }
    }
}
