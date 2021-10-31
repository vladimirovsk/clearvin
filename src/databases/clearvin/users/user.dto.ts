import { IsString } from 'class-validator';

export class LogInDto {
    constructor() {
    }
    @IsString()
    public email: string | undefined

    @IsString()
    public password: string | undefined
}

export class CreateUserDto {
    @IsString()
    public username: string | undefined

    @IsString()
    public email: string | undefined

    @IsString()
    public password: string | undefined;
}
