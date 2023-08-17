import { TeamController } from '../controllers';
import { Router } from 'express';
const teamRouter = Router();

// get all teams
// SERVER_URL/api/team/all
teamRouter.get('/all', TeamController.all);

// create a team
// SERVER_URL/api/team/create
teamRouter.post('/create', TeamController.create);

// update a team
// SERVER_URL/api/team/update
teamRouter.post('/update', TeamController.update);

// delete a team
// SERVER_URL/api/team/remove/1
teamRouter.post('/remove/:id', TeamController.remove);

// get a team
// SERVER_URL/api/team/info/1
teamRouter.get('/info/:id', TeamController.info);