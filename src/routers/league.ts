import { LeagueController } from '../controllers';
import { Router } from 'express';
const leagueRouter = Router();

// get all leagues
// SERVER_URL/api/league/all
leagueRouter.get('/all', LeagueController.all);

// create a league
// SERVER_RUL/api/league/create
leagueRouter.post('/create', LeagueController.create);

// update a league
// SERVER_URL/api/league/update
leagueRouter.post('/update', LeagueController.update);

// delete a league
// SERVER_URL/api/league/remove/1
leagueRouter.delete('/remove/:id', LeagueController.remove);

// get a league
// SERVER_URL/api/league/info/1
leagueRouter.get('/info/:id', LeagueController.info);

export default leagueRouter;
