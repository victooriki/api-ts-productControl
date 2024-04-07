import { Request, response, Response} from 'express'
import AppDataSource from '../connection';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

class ProductController {
    private productRepository: Repository<Product>

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const products = await productRepository.find()

        return response.status(200).send({
            data: products
        })
    }

    async create(request: Request, response: Response): Promise<Response> {
        const {nome, peso, descricao} = request.body

        const productRepository = AppDataSource.getRepository(Product)

        const product = new Product
        product.nome = nome
        product.peso = peso
        product.descricao = descricao

        const dbProduct = await productRepository.save(product)

        return response.status(201).send({
            data: dbProduct
        })
    }
}

export default new ProductController