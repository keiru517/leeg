import { MatchController } from '../controllers';
import { Router } from 'express';
const matchRouter = Router();

// SERVER_URL/api/match/all
matchRouter.get('/all', MatchController.all);

// SERVER_URL/api/match/create
matchRouter.post('/create', MatchController.create);

// SERVER_URL/api/match/update
matchRouter.post('/update', MatchController.update);

// SERVER_URL/api/match/updateResult
matchRouter.post('/updateResult', MatchController.updateResult);

// SERVER_URL/api/match/updateSettings
matchRouter.post('/updateSettings', MatchController.updateSettings);

// SERVER_URL/api/match/remove/1
matchRouter.delete('/remove/:id', MatchController.remove);

// SERVER_URL/api/match/info/1
matchRouter.get('/info/:id', MatchController.info);

export default matchRouter;