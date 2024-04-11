import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('users')
export class Users {
    @PrimaryColumn()
    id: string

    @Column()
    user_name: string

    @Column()
    password: string

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
