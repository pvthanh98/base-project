import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly service: CategoryService){}

    @Get('')
    async listCategories() {
        return this.service.listCategories()
    }

    @Post('')
    async createCategory(@Body(ValidationPipe) categoryData: CreateCategoryDto) {
        return this.service.createCategory(categoryData);
    }
}
