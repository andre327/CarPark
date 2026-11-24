import { IsNotEmpty, IsString } from "class-validator";

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    plate:string;

    @IsString()
    @IsNotEmpty()
    model:string;

    @IsString()
    @IsNotEmpty()
    client:string;
}
