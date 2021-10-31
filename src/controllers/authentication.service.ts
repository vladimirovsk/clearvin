import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData';
import {CreateUserDto} from '../databases/clearvin/users/user.dto';
import {UserAttributes as User} from '../databases/clearvin/users/user.interface';
import userModel from '../databases/clearvin/users/user.model';

class AuthenticationService {
    public user = userModel;

    public async register(userData: CreateUserDto) {
        if (
            await this.user.findOne({where:
                    { email: userData.email }
            })
        ) {
            throw new UserWithThatEmailAlreadyExistsException(userData.email);
        }

        const hashedPassword = await bcrypt.hash(userData.password as string, 10);
        const user = await this.user.create({
            username: userData.username as string,
            email:userData.email as string,
            password: hashedPassword
        });
         const tokenData = this.createToken(user);
         const cookie = this.createCookie(tokenData);

        return {
            cookie,
            user,
        };
    }

    public createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    public createToken(user: User): TokenData {
         const expiresIn = 60 * 60; // an hour
         const secret = process.env.JWT_SECRET as string;
         const dataStoredInToken: DataStoredInToken = {
             id: user.id,
         };
         return {
             expiresIn,
             token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
         };
    }
}

export default AuthenticationService;