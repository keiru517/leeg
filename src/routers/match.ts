import { MatchController } from '../controllers';
import { Router } from 'express';
const matchRouter = Router();

// get all matches
// SERVER_URL/api/match/all
matchRouter.get('/all', MatchController.all);

// create a match
// SERVER_URL/api/match/create
matchRouter.post('/create', MatchController.create);

// update a match
// SERVER_URL/api/match/update
matchRouter.post('/update', MatchController.update);

// delete a match
// SERVER_URL/api/match/remove/1
matchRouter.delete('/remove/:id', MatchController.remove);

// get a match
// SERVER_URL/api/match/info/1
matchRouter.get('/info/:id', MatchController.info);

export default matchRouter;