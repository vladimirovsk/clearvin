import User from './users/user.model'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    User.sync({ alter: isDev }).catch(err=>{
        throw err;
    })
 }

export default dbInit;