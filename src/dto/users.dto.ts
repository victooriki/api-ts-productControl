import { IsNotEmpty, Length, } from "class-validator"

export class CreateUsersDTO {
    @IsNotEmpty()
    @Length(5, 155)
    user_name: string

    @IsNotEmpty()
    @Length(5, 155)
    password: string
}