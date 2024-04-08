import AppDataSource from "@/database/connection";
import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
    private repository: Repository<Product>

    constructor() {
        this.repository = AppDataSource.getRepository(Product)
    }

    async getAll(): Promise<Product[]> {
        return await this.repository.find()
    }

    async create(input: CreateProductDTO): Promise<Product> {
        const product = new Product

        product.nome = input.nome
        product.descricao = input.descricao
        product.peso = input.peso

        return await this.repository.save(product)
    }

    async getOne(id: string): Promise<Product|null> {
        return await this.repository.findOneBy({ id })
    }

    async deleteOne(id: string) {
        await this.repository.delete(id)
    }

    async update(input: UpdateProductDTO): Promise<Product|null> {
        const product = await this.getOne(input.id)

        if (!product) {
            return null
        }

        product.nome = input.nome
        product.descricao = input.descricao
        product.peso = input.peso

        return await this.repository.save(product)
    }
}