import { Request } from 'express';
import {UserInput} from '../databases/clearvin/users/user.interface';

interface RequestWithUser extends Request {
    user: UserInput;
}

export default RequestWithUser;