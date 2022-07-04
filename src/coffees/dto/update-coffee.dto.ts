// export class UpdateCoffeeDto {
//     // 代码冗余：与CreateCoffeeDto代码重复 
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
// }

import { PartialType } from "@nestjs/swagger";
import { CreateCoffeeDto } from "./create-coffee.dto";

// PartialType不仅使属性可选，还继承了通过装饰器应用的所有验证规则
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){
    
}
