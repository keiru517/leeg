import { UserController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
const upload = multer();
const userRouter = Router();

userRouter.post('/signup', upload.single('avatar'), UserController.create);
export default userRouter;
