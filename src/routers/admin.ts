import { AdminController } from '../controllers';
import { Router } from 'express';
const adminRouter = Router();

// get all leagues
// SERVER_URL/api/admin/all
adminRouter.get('/all', AdminController.all);

// create a admin
// SERVER_RUL/api/admin/create
adminRouter.post('/create', AdminController.create);

// invite an admin
// SERVER_URL/api/admn/invite
adminRouter.post('/invite', AdminController.invite);
// update a admin
// SERVER_URL/api/admin/update
// adminRouter.post('/update', AdminController.update);

// // delete a admin
// // SERVER_URL/api/admin/remove/1
// adminRouter.delete('/remove/:id', AdminController.remove);

// // get a admin
// // SERVER_URL/api/admin/info/1
// adminRouter.get('/info/:id', AdminController.info);

export default adminRouter;
