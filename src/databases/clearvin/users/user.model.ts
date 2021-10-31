import {DataTypes, Model, Optional} from 'sequelize';
import sequelizeConnection from '../config';
import {UserAttributes, UserInput} from './user.interface';

class userModel extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id !: number
    public username !: string
    public email !: string
    public password!: string
    public status?: number
    // timestamps!
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

userModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1

    },
}, {
    tableName:'users',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});

export default userModel;
