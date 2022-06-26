import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';


@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService){

    }
    // 不建议自己操作响应对象对象 
    // @Get()
    // findAll(@Res() response){
    //     response.status(200).send('This actions return all coffees');
    // }
    // 建议使用nestjs标准
    // @Get()
    // findAll(){
    //     return 'This actions return all coffees';
    // }
    @Get()
    findAll(@Query() paginationQuery){
        // const {limit, offset} = paginationQuery
        return this.coffeesService.findAll();
        // return `This actions return all coffees. Limit: ${limit}, offset: ${offset}`;
    }
   
    

    // @Get(':id')
    // findOne(@Param() params){
    //     return `This action returns #${params.id} coffee`;
    // }
    @Get(':id')
    findOne(@Param('id') id: string){

        const coffee = this.coffeesService.findOne(id);
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return coffee;
        //return `This action returns #${id} coffee`;
    }

    // @Post()
    // create(@Body() body){
    //     return body;
    // }
    //@Post()
    // @HttpCode(HttpStatus.GONE) //自定义状态码 不建议自定义状态码，建议使用nestjs标准
    // create(@Body('name') body){
    //     return body;
    // }
    // @Post()
    // create(@Body() body){
    //     return this.coffeesService.create(body);
    // }
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        return this.coffeesService.update(id, updateCoffeeDto);
        
        // return `This action updates #${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id);
        // return `This action removes #${id} coffee`;
    }

}
