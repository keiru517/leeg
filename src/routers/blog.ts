import { BlogController } from '../controllers';
import { Router } from 'express';
const blogRouter = Router();

// get all blogs
// SERVER_URL/api/blog/all
blogRouter.post('/all', BlogController.all);

// create a blog
// SERVER_RUL/api/blog/create
blogRouter.post('/create', BlogController.create);

// update a blog
// SERVER_RUL/api/blog/update
blogRouter.post('/update', BlogController.update);

// remove a blog
// SERVER_RUL/api/blog/remove
blogRouter.post('/remove', BlogController.remove);

export default blogRouter;
