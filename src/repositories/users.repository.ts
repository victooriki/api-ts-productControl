import AppDataSource from "@/database/connection";
import { CreateUsersDTO } from "@/dto/users.dto";
import { Users } from "@/entities/users.entity";
import { Repository } from "typeorm";

export class UsersRepository {
    private repository: Repository<Users>

    constructor() {
        this.repository = AppDataSource.getRepository(Users)
    }

    async create(input: CreateUsersDTO): Promise<Users> {
        const users = new Users

        users.user_name = input.user_name
        users.password = input.password

        return await this.repository.save(users)
    }

    async getOne(user_name: string): Promise<Users|null> {
        return await this.repository.findOneBy({ user_name })
    }
}