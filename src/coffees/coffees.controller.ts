import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';


@Controller('coffees')
export class CoffeesController {
    // 将coffeesService依赖注入到CoffesController中
    constructor(private readonly coffeesService: CoffeesService, @Inject(REQUEST) private readonly request: Request){
        
        console.log('CoffeesController created');
    }
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto){
        return this.coffeesService.findAll(paginationQuery);
    }
   
    @Get(':id')
    findOne(@Param('id') id: string){

        const coffee = this.coffeesService.findOne(id);
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return coffee;
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id);
    }

}
