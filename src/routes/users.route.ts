import {Router} from 'express';
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers/users.controller';

const router = Router();

router
    .get('/', getUsers)
    .get('/:id', getUser)
    .post('/', postUser)
    .put('/:id', putUser)
    .delete('/:id', deleteUser);

export default router;