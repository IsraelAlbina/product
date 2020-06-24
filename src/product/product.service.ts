import { Injectable } from '@nestjs/common';
//import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


import { Product } from './interfaces/product.interfaces';
import { CreateProductDTO } from './dto/product.dto'
import { read } from 'fs';
import { identity } from 'rxjs';
import { threadId } from 'worker_threads';


@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModule: Model<Product>){}

    async getPeoducts(): Promise<Product[]>{
        const product = await this.productModule.find()

        return product;

    }

    async getProduct(productID: string): Promise<Product>{
        const product = await this.productModule.findById(productID)
        return product;
         
    }

    async createProduct(createProductDTO: CreateProductDTO) : Promise<Product>{
        const product = new this.productModule(createProductDTO);
        return await product.save();

    }

    async deleteProduct(productID): Promise<Product>{
        const deletedProduct = await this.productModule.findOneAndDelete(productID);
        return deletedProduct;

    }

    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product>{
        const updatedProduct = this.productModule.findByIdAndUpdate(productID, createProductDTO, { new: true });
        return updatedProduct;

    }
}
