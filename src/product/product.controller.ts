import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param , NotFoundException, Query, createParamDecorator} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
global.fetch = require('node-fetch')
import { ProductService } from './product.service';
import { throws } from 'assert';

@Controller('Product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){
        //console.log(createProductDTO);
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message:'Product Successfully Created',
            product: product
        });
    }

    @Get('/')
    async getProducts(@Res() res){
        let respuesta = await fetch('http://34.95.197.202:8080/alumno');
        respuesta = await respuesta.json()
        console.log('controller, respuesta: ', respuesta)
        const products = await this.productService.getPeoducts();
        return res.status(HttpStatus.OK).json({
            respuesta
        })
    }


    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/:productID')
    async deleteProduct(@Res() res, @Param('productID') productID){
        const productDeleted = await this.productService.deleteProduct(productID)
        if(!productDeleted) throw new NotFoundException('Producto no existe, colocar un ID existente');
        return res.status(HttpStatus.OK).json({
            message: 'Producto borrado satisfactoriamente',
            productDeleted
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO : CreateProductDTO,
     @Query('productID') productID){
         const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
         if(!updatedProduct) throw new NotFoundException('Producto no existe');
         return res.status(HttpStatus.OK).json({
             message: 'Peoducto actualizado correctamente',
             updatedProduct
         });
     }
}
