import { MatchupController } from '../controllers';
import { Router } from 'express';
const matchupRouter = Router();

// get all matchups
// SERVER_URL/api/matchup/all
matchupRouter.get('/all', MatchupController.all);

// create a matchup
// SERVER_URL/api/matchup/create
matchupRouter.post('/create', MatchupController.create);

// update a matchup
// SERVER_URL/api/matchup/update
matchupRouter.post('/update', MatchupController.update);

// delete a matchup
// SERVER_URL/api/matchup/remove/1
matchupRouter.post('/remove/:id', MatchupController.remove);

// get a matchup
// SERVER_URL/api/matchup/info/1
matchupRouter.get('/info/:id', MatchupController.info);

export default matchupRouter;