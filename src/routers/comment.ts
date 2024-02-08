import { CommentController } from '../controllers';
import { Router } from 'express';
const commentRouter = Router();

// create a comment
// SERVER_RUL/api/comment/create
commentRouter.post('/create', CommentController.create);

// update a comment
// SERVER_RUL/api/comment/update
commentRouter.post('/update', CommentController.update);

// remove a comment
// SERVER_RUL/api/comment/remove
commentRouter.post('/remove', CommentController.remove);

export default commentRouter;
