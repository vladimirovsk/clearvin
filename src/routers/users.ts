import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller';
import authMiddleware from '../middleware/authMiddleware';

import AuthenticationService from '../controllers/authentication.service';
// import userModel from './user.model';

/**
 * @apiDefine MyError404
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

class UserRouterController implements Controller {
    public path = '/users';
    public router = Router();
    public authenticationService = new AuthenticationService();

    private loggerMiddleware(request: Request, response: Response, next:NextFunction) {
        console.log(`${request.method} ${request.path}`);
        next();
    }

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(this.loggerMiddleware);
        this.router.get(`${this.path}/`, authMiddleware, this.infoFromUsers);
        //TODO add authMiddleware

        //this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        // this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
    }

    /**
     @api {get} /api/v2/users/ fetch users
     @apiDescription Fetch list users add pagination
     @apiName users
     @apiGroup User
     @apiHeader {String} [Authorization]
     @apiUse MyError404
     */
    private infoFromUsers = async (request: Request, response: Response, next: NextFunction)=>{
        try {
            // const {
            //     cookie,
            //     user,
            // } = await this.authenticationService.register(userData);
        }catch (error) {
            next(error)
        }
        //response.send("<h1>Test function from REST API V2</h1>");
    }

    /**
     * @api {get} /user/:id Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} username Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "username": "John",
     *       "email": "Doe@mail.com"
     *       ...
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
     private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    //     const id = request.params.id;
    //     const userQuery = this.user.findById(id);
    //     if (request.query.withPosts === 'true') {
    //         userQuery.populate('posts').exec();
    //     }
    //     const user = await userQuery;
    //     if (user) {
    //         response.send(user);
    //     } else {
    //         next(new UserNotFoundException(id));
    //     }
     }

    // private getAllPostsOfUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    //     const userId = request.params.id;
    //     if (userId === request.user._id.toString()) {
    //         const posts = await this.post.find({ author: userId });
    //         response.send(posts);
    //     }
    //     next(new NotAuthorizedException());
    // }
}

export default UserRouterController;