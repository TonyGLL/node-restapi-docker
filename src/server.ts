import express, { Application } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/users.route';
import database from './database/connection';

class Server {
    private app: Application;
    private port = String(process.env.PORT || 3000);
    private apiPaths = {
        users: '/api/users'
    };
    constructor() {
        this.app = express();
        this.dbConnection();
        // Server config
        this.midddlewares();
        // Routes
        this.routes();
    }
    public midddlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/public', express.static(path.resolve('public')));
    }
    public listen(): void {
        this.app.listen(this.port, () => {
            console.log('Server running at PORT:', this.port);
        });
    }
    public routes(): void {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    public async dbConnection(): Promise<any> {
        try {
            await database.authenticate();
            console.log('Database connected');
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default Server;