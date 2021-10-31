import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Controller from './interfaces/controller';
import errorMiddleware from "./middleware/error.middleware";
import stockDatabases from './databases/clearvin/init';
const versionApi :string = '/api/'+(process.env.API_VERSION as string || 'v1')+'/'

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(versionApi, express.static('public'));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use(versionApi, controller.router);
        });
    }

    private async connectToTheDatabase() {
            stockDatabases()
    }
}

export default App;