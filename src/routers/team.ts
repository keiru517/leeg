import { TeamController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
const teamRouter = Router();

const upload = multer();
// get all teams
// SERVER_URL/api/team/all
teamRouter.get('/all', TeamController.all);

// create a team
// SERVER_URL/api/team/create
teamRouter.post('/create', upload.single('logo'), TeamController.create);

// update a team
// SERVER_URL/api/team/update
teamRouter.post('/update', TeamController.update);

// delete a team
// SERVER_URL/api/team/remove/1
teamRouter.delete('/remove/:id', TeamController.remove);

// get a team
// SERVER_URL/api/team/info/1
teamRouter.get('/info/:id', TeamController.info);

export default teamRouter;