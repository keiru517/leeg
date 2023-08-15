import { LeagueController } from '../controllers';
import { Router } from 'express';
const leagueRouter = Router();

// get all leagues
leagueRouter.get('/all', LeagueController.all);
// create a league
leagueRouter.post('/create', LeagueController.create);
// update a league
leagueRouter.post('/update', LeagueController.update);
// delete a league
leagueRouter.delete('/remove/:id', LeagueController.remove);
// get a league
leagueRouter.get('/info/:id', LeagueController.info);

export default leagueRouter;
