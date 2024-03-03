import { LogController } from '../controllers';
import { Router } from 'express';
const logRouter = Router();

// get all matchups
// SERVER_URL/api/log/all
logRouter.get('/all', LogController.all);

// Add substitute
logRouter.post('/createOne', LogController.createOne);

// create a log
// SERVER_URL/api/log/createOne
logRouter.post('/createOne', LogController.createOne);

// create logs
// SERVER_URL/api/log/create
logRouter.post('/create', LogController.create);

// update a logs
// SERVER_URL/api/log/update
logRouter.post('/update', LogController.update);

// update a log
// SERVER_URL/api/log/updateOne
logRouter.post('/updateOne', LogController.updateOne);

// delete a log
// SERVER_URL/api/log/remove
logRouter.post('/remove', LogController.remove);

// minus a log
// SERVER_URL/api/log/minus
logRouter.post('/minus', LogController.minus);

// get a log
// SERVER_URL/api/log/info/1
logRouter.get('/info/:id', LogController.info);

export default logRouter;