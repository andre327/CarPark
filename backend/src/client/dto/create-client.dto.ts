import { IsString } from "class-validator";

export class CreateClientDto {
    @IsString()
    documentNumber: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    telephone: string;

    @IsString()
    addres: string;
}
