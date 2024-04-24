import { Router } from 'express';
import UserController from '../../controller/UserController';
import { middlewareAuth } from '../../middleware/jwt';

export const userRouter = Router();

userRouter.get('/api', UserController.getAllUsers);
userRouter.post('/api-auth', middlewareAuth, UserController.getCurrentUser);
userRouter.get('/api/:id', UserController.getUserById);
userRouter.get('/api-get-email', UserController.getUserByEmail);
userRouter.post('/api-login', UserController.userLogin);
userRouter.post('/api-register', UserController.userRegister);
userRouter.put('/api/:id', UserController.updateUser);
userRouter.delete('/api', UserController.deleteUser);
