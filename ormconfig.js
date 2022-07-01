// 数据库迁移
module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'], //TypeORM迁移需要处理Nest已编译的文件
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations',
    }

}