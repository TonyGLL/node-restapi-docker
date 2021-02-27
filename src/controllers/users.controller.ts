import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    const users = await  User.findAll({
        where: {
            status: true
        }
    });
    res.status(200).json({
        error: false,
        users
    });
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if (user) {
        res.status(200).json({
            id,
            error: false,
            user
        });
    } else {
        res.status(404).json({
            id,
            error: true,
            message: `User with id '${id}' not found`
        });
    }
}

export const postUser = async (req: Request, res: Response): Promise<any> => {
    const { body } = req;
    try {
        const emailExist = await User.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExist) {
            return res.status(400).json({
                error: true,
                message: `User with email '${body.email}' is already exist`
            });
        }
        const user = new User(body);
        await user.save();
        res.json({
            error: false,
            user
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            status: 500,
            message: 'Server error'
        });
    }
}

export const putUser = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    res.status(200).json({message: 'putUser', body, id});
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            id,
            error: true,
            message: `User with id '${id}' not found`
        });
    }
    await user.update({status: false});
    // await user.destroy(); 
    res.status(200).json({
        error: false,
        message: 'User deleted',
        user
    });
}