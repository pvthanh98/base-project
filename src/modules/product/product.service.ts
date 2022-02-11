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

    /** Insert product */
    async createProduct(data: CreateProductDto):Promise<Product>{
        const { categoryId, ...productData } = data;

        /** Find category */
        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        })
        
        /** Check if category exists */
        if (!category) 
            throw new BadRequestException(CATEGORY_ERROR.NOT_FOUND)

        /** Create product with the category */
        const product = await this.productRepository.create({
            ...productData,
            category: category
        });

        /** Save the product */
        await this.productRepository.save(product);

        return product;
    }

    /** List products */
    async listProduct(): Promise<Product[]>{
        return this.productRepository
                .createQueryBuilder("product")
                .innerJoinAndSelect("product.category","category")
                .where("product.id=:id",{
                    id:"df823edf-9fc1-4caa-a006-9a203905d1ea"
                })
                .getMany();
    }
}
