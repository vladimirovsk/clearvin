 import { NextFunction, Response, Request } from 'express';
 import jwt from 'jsonwebtoken';
 import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
 import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
 import DataStoredInToken from '../interfaces/dataStoredInToken';
 import {UserInput} from '../databases/clearvin/users/user.interface';
 import RequestWithUser from '../interfaces/requestWithUser';
 import {Session} from "inspector";
 //import userController from '../databases/stock/users/User.controller';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const cookies = request.cookies;
    const session = request.session;
    //response.send(cookies)
    console.log(session, cookies)
      if (cookies && cookies.Authorization) {
         const secret = process.env.JWT_SECRET as string;
         try {
             const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
             const id = verificationResponse.id;
             console.log(verificationResponse);
             // const user = await userController.findById(id);
             // if (user) {
             //     request.user = user;
                   next();
             // } else {
             //     next(new WrongAuthenticationTokenException());
             // }
         } catch (error) {
             next(new WrongAuthenticationTokenException());
         }
     } else {
         next(new AuthenticationTokenMissingException);
     }
}

export default authMiddleware;