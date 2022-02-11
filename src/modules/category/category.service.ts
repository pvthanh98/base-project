import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { CreateCategoryDto } from './category.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    /** List categories in admin */
    async listCategories(): Promise<Category[]> {
        return this.categoryRepository.find()
    }

    /** Create category */
    async createCategory(data: CreateCategoryDto): Promise<any> {
        const category = await this.categoryRepository.create({
            ...data
        })
        await this.categoryRepository.save(category)
        return category
    }
}
