import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, NotFoundException, Param, Patch, Post, Query, Res, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// @UsePipes(ValidationPipe) 控制器范围内的pipe
@Controller('coffees')
export class CoffeesController {
    // 将coffeesService依赖注入到CoffesController中
    constructor(private readonly coffeesService: CoffeesService, @Inject(REQUEST) private readonly request: Request){
        
        console.log('CoffeesController created');
    } 

    // @UsePipes(ValidationPipe) // 方法范围内的pipe
    // @SetMetadata('isPublic', true)
    @Public()
    @Get()
    /* async */ findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto){
        // await new Promise(resolve => setTimeout(resolve, 5000))
        console.log(protocol);
        return this.coffeesService.findAll(paginationQuery);
    }
   
    @Get(':id') 
    findOne(@Param('id', ParseIntPipe) id: string){
        const coffee = this.coffeesService.findOne(id);
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return coffee;
    }
   /*  @UsePipes(new ValidationPipe({
        whitelist: true, // 根据dto过滤response body无效属性
        transform: true, // 将response body转换为具体的dto实例
        forbidNonWhitelisted: true, // 与whitelist属性一起使用时，如果请求有多余字段，则报错
        transformOptions:{
          enableImplicitConversion: true //自动隐式转换
        }
      })) */
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto){ // 参数范围内的pipe
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id);
    }

}
