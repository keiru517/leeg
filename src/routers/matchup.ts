import { MatchupController } from '../controllers';
import { Router } from 'express';
const matchupRouter = Router();

// get all matchups
// SERVER_URL/api/matchup/all
matchupRouter.get('/all', MatchupController.all);

// Add substitute
matchupRouter.post('/createOne', MatchupController.createOne);

// create a matchup
// SERVER_URL/api/matchup/create
matchupRouter.post('/create', MatchupController.create);

// update a matchup
// SERVER_URL/api/matchup/update
matchupRouter.post('/update', MatchupController.update);

// delete a matchup
// SERVER_URL/api/matchup/remove/1
matchupRouter.delete('/remove/:id', MatchupController.remove);

matchupRouter.post('/editLineups', MatchupController.editLineups);
// get a matchup
// SERVER_URL/api/matchup/info/1
matchupRouter.get('/info/:id', MatchupController.info);

export default matchupRouter;