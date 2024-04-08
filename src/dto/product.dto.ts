import { IsNotEmpty, Length,  } from "class-validator"

export class CreateProductDTO {
    @IsNotEmpty()
    @Length(3, 255)
    nome: string

    @IsNotEmpty()
    @Length(3, 255)
    descricao: string

    @IsNotEmpty()
    peso: number
}

export class UpdateProductDTO extends CreateProductDTO {
    id: string
}