import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity('products')
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    peso: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;
}
