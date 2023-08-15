import { UserController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
const upload = multer();
const userRouter = Router();

userRouter.post('/sign-up', upload.single('image'), UserController.create);
export default userRouter;
