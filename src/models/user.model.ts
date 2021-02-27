import { DataTypes } from 'sequelize';
import database from '../database/connection';

const User = database.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN },
    createdAt: { type: DataTypes.TIME },
    updatedAt: { type: DataTypes.TIME }
});

export default User;