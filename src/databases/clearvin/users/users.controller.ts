import Users from './user.model';
import userModel from "./user.model";

class userController  {
    constructor(){

    }

    public findOneUser = async (payload: { email: string | undefined }) :Promise<userModel | null> => {
        const user =  await Users.findOne(
            {
                where:{email: payload.email}
            });
         return user;
    }


}

export default userController;