import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('products')
export class Product {
    @PrimaryColumn()
    id: string

    @Column()
    nome: string

    @Column()
    descricao: string

    @Column()
    peso: number

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
