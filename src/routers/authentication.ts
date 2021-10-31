import bcrypt from 'bcrypt';
import {Request, Response, NextFunction, Router} from 'express';
import jwt from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData';
import validationMiddleware from '../middleware/validation.middleware';
import {CreateUserDto, LogInDto} from '../databases/clearvin/users/user.dto';
import {UserInput} from '../databases/clearvin/users/user.interface';
import userController from '../databases/clearvin/users/users.controller';
import AuthenticationService from '../controllers/authentication.service';

class AuthenticationController implements Controller {
    public path = '/auth';
    public router = Router();
    public authenticationService = new AuthenticationService();
    private user = new userController;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         @api {get} /api/v2/auth/register register user
         @apiDescription Registered new user
         @apiName register
         @apiGroup auth
         @apiBody {String} username
         @apiBody {String} password
         @apiBody {String} email
         */
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);

        /**
         @api {get} /api/v2/auth/login login user
         @apiDescription login user and register cookies files
         @apiName login
         @apiGroup auth
         @apiBody {String} password
         @apiBody {String} email
         */
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);

        /**
         @api {get} /api/v2/auth/logout logout
         @apiDescription logout users and delete cookies
         @apiName logout
         @apiGroup auth
         @apiBody {String} password
         @apiBody {String} email
         */
        this.router.post(`${this.path}/logout`, this.loggingOut);
    }

    private registration = async (request: Request, response: Response, next: NextFunction) => {
        const userData: CreateUserDto = request.body;
        try {
            const {
                cookie,
                user,
            } = await this.authenticationService.register(userData)
            response.setHeader('Set-Cookie', [cookie]);
            response.status(200).json({status:"registered", user})
        } catch (error) {
            next(error)
        }
    }

    private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
        const logInData: LogInDto = request.body;
         const user = await this.user.findOneUser({ email: logInData.email});
         if (user) {
              const isPasswordMatching = await bcrypt.compare(
                  logInData.password as string,
                  user.get('password'),
              );
             if (isPasswordMatching) {
                 const tokenData = this.createToken(user);
                 response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                 response.send(user);
             } else {
                 next(new WrongCredentialsException());
             }
         } else {
             next(new WrongCredentialsException());
         }
    }

    private loggingOut = (request: Request, response: Response) => {
            response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
            response.status(200).json({message: "cookies free"});
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    private createToken(user: UserInput): TokenData {
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

export default AuthenticationController;