import { Sequelize } from 'sequelize';

const database = new Sequelize('ts_node_restapi', 'tony', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default database;