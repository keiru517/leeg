import { UserController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
const upload = multer();
const userRouter = Router();

userRouter.post('/signin', UserController.signin);
userRouter.post('/signup', upload.single('avatar'), UserController.signup);
userRouter.post('/verifyEmail', UserController.verifyEmail);
userRouter.post(
  '/updateInfo',
  upload.single('avatar'),
  UserController.updateInfo
);
userRouter.post('/updatePassword', UserController.updatePassword);
userRouter.get('/info/:id', UserController.info);
userRouter.get('/all', UserController.all);
userRouter.get('/avatar/:id', UserController.avatar);
export default userRouter;
