import { CreateUsersDTO } from '@/dto/users.dto';
import { UsersRepository } from '@/repositories/users.repository';
import bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

class UsersController {
    private usersRepository: UsersRepository

    constructor() {
        this.usersRepository = new UsersRepository
    }

    create =  async (request: Request, response: Response): Promise<Response> => {
        const {user_name, password} = request.body

        const createDto = new CreateUsersDTO
        createDto.user_name = user_name
        createDto.password = bcrypt.hashSync(password, 10)

        const errors = await validate(createDto)
        if (errors.length > 0) {
            return response.status(422).send({
                error: errors
            })
        }

        const dbUser = await this.usersRepository.create(createDto)

        return response.status(201).send({
            data: dbUser
        })
    }

    login = async (request: Request, response: Response): Promise<Response> => {
        const { user_name, password } = request.body

        const user = await this.usersRepository.getOne(user_name)

        if (!user) {
            return response.status(404).send({
                error: 'Usuário não encontrado!'
            })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return response.status(401).send({
                error: 'Senha inválida!'
            })
        }

        const token = await this.gerarToken(user.id);

        response.setHeader('authorization', `${token}`);

        return response.status(200).send({
            data: {
                user,
                token
            }
        })
    }

    gerarToken = async (userId: string): Promise<string> => {
        const tempoExpiracao = process.env.JWT_EXPIRATION || '8h';
        const chaveJWT = process.env.JWT_SECRET || 'secret2001';

        const token = jwt.sign({ id: userId }, chaveJWT, { expiresIn: tempoExpiracao });
        return token;
    }
}

export default new UsersController