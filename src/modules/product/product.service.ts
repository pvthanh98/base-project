import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './product.dto';
import { Category } from '../../entities/category.entity';
import { CATEGORY_ERROR } from 'src/common/constants/error-constant';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ){}

    async createProduct(data: CreateProductDto){
        const { categoryId, ...productData } = data;

        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        })
        
        if (!category) 
            throw new BadRequestException(CATEGORY_ERROR.NOT_FOUND)

        const product = await this.productRepository.create({
            ...productData,
            category: category
        });
        await this.productRepository.save(product);
        return product;
        
    }
}
