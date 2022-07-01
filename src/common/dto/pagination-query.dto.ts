import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

// 分页
export class PaginationQueryDto {
    @IsOptional()
    @IsPositive() // 大于0
    // @Type(() => Number) // 传入的值被解析为数字 main.ts中配置enableImplicitConversion后就不需要手动设置
    limit: number;

    @IsOptional()
    @IsPositive()
    // @Type(() => Number)
    offset: number;
}
