import { Request, response, Response} from 'express'
import { validate } from 'class-validator';
import { ProductRepository } from '@/repositories/product.repository';
import { CreateProductDTO, UpdateProductDTO } from '@/dto/product.dto';

class ProductController {
    private productRepository: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository
    }

    findAll = async (request: Request, response: Response): Promise<Response> => {
        const products = await this.productRepository.getAll()

        return response.status(200).send({
            data: products
        })
    }

    create = async (request: Request, response: Response): Promise<Response> => {
        const {nome, peso, descricao} = request.body

        const createDto = new CreateProductDTO
        createDto.nome = nome
        createDto.descricao = descricao
        createDto.peso = peso

        const errors = await validate(createDto)
        if (errors.length > 0) {
            return response.status(422).send({
                error: errors
            })
        }

        const dbProduct = await this.productRepository.create(createDto)

        return response.status(201).send({
            data: dbProduct
        })
    }

    findOne = async (request: Request, response: Response): Promise<Response> => {
        const id: string = request.params.id

        const product = await this.productRepository.getOne(id)

        if(!product){
            return response.status(404).send({
                error: "Produto não encontrado!"
            })
        }

        return response.status(200).send({
            data: product
        })
    }

    update = async (request: Request, response: Response): Promise<Response> => {
        const id = request.params.id
        const {nome, peso, descricao} = request.body

        const updateDto = new UpdateProductDTO
        updateDto.id = id
        updateDto.nome = nome
        updateDto.descricao = descricao
        updateDto.peso = peso

        const errors = await validate(updateDto)
        if (errors.length > 0) {
            return response.status(422).send({
                error: errors
            })
        }

        try {
            const productUpdated = await this.productRepository.update(updateDto)

            if (!productUpdated) {
                return response.status(404).send({
                    error: "Produto não encontrado."
                })
            }

            return response.status(200).send({
                data: productUpdated
            })
        } catch (error) {
            return response.status(500).send({
                error: "Erro ao atualizar produto!"
            })
        }
    }

    delete = async (request: Request, response: Response): Promise<Response> => {
        const id = request.params.id

        try {
            await this.productRepository.deleteOne(id)

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