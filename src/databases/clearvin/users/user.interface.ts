import {Optional} from "sequelize";

export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {
}

export interface UserEmail extends Optional<UserAttributes, 'email'> {
}


export interface UserOutput extends Required<UserAttributes> {
}

