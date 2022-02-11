import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsUUID()
    categoryId: string;
}

