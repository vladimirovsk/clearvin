import HttpException from './HttpException';

class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email: string | undefined) {
        super(400, `User with email ${email} already exists`);
    }
}

export default UserWithThatEmailAlreadyExistsException;