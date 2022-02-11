import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService){}

    @Post()
    async createProduct(@Body(ValidationPipe) productData:  CreateProductDto){
        return this.service.createProduct(productData);
    }

    @Get()
    async listProduct(){
        return this.service.listProduct();
    }
}
