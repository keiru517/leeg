import { LogController } from '../controllers';
import { Router } from 'express';
const logRouter = Router();

// get all matchups
// SERVER_URL/api/log/all
logRouter.get('/all', LogController.all);

// Add substitute
logRouter.post('/createOne', LogController.createOne);

// create a log
// SERVER_URL/api/log/create
logRouter.post('/create', LogController.create);

// update a log
// SERVER_URL/api/log/update
logRouter.post('/update', LogController.update);

// delete a log
// SERVER_URL/api/log/remove/1
logRouter.delete('/remove/:id', LogController.remove);

// get a log
// SERVER_URL/api/log/info/1
logRouter.get('/info/:id', LogController.info);

export default logRouter;