import 'dotenv/config';

import App from './app';
import UserController from './routers/users';
import AuthenticationController from "./routers/authentication";


const app = new App(
    [
        new UserController(),
        new AuthenticationController()
    ]
);

app.listen();