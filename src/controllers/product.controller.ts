import { Request, response, Response} from 'express'
import AppDataSource from '@/database/connection';
import { Product } from '@/entities/product.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

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

        const errors = await validate(product)

        if (errors.length > 0) {
            return response.status(422).send({
                errors: errors
            })
        }

        const dbProduct = await productRepository.save(product)

        return response.status(201).send({
            data: dbProduct
        })
    }

    async findOne(request: Request, response: Response): Promise<Response> {
        const id: string = request.params.id

        const productRepository = AppDataSource.getRepository(Product)
        const product = await productRepository.findOneBy({ id })

        if(!product){
            return response.status(404).send({
                error: "Produto não encontrado!"
            })
        }

        return response.status(200).send({
            data: product
        })
    }

    async update (request: Request, response: Response): Promise<Response> {
        const id = request.params.id
        const {nome, peso, descricao} = request.body

        const productRepository = AppDataSource.getRepository(Product)

        let product

        try {
            product = await productRepository.findOneByOrFail({ id })
        } catch (error) {
            return response.status(404).send({
                error: "Produto não encontrado!"
            })
        }

        product.nome = nome
        product.peso = peso
        product.descricao = descricao

        const errors = await validate(product)

        if (errors.length > 0) {
            return response.status(422).send({
                errors: errors
            })
        }

        try {
            const productUpdated = await productRepository.save(product)

            return response.status(200).send({
                data: productUpdated
            })
        } catch (error) {
            return response.status(500).send({
                error: "Erro ao atualizar produto!"
            })
        }
    }

    async delete (request: Request, response: Response): Promise<Response> {
        const id = request.params.id

        const productRepository = AppDataSource.getRepository(Product)

        try {
            await productRepository.delete(id)

            return response.status(204).send({
                data: "Produto deletedado com sucesso!"
            })
        } catch (error) {
            return response.status(400).send({
                error: "Erro ao deletar produto!"
            })
        }
    }
}

export default new ProductController