import dotenv from 'dotenv';
import Server from './server';
import morgan from 'morgan';

// dotenv config
dotenv.config();
morgan('short');

// start server
const server = new Server();
server.listen();