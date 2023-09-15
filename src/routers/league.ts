import { LeagueController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
import { auth } from '../auth';

const leagueRouter = Router();

const upload = multer();

// get all leagues
// SERVER_URL/api/league/all
leagueRouter.post('/all', auth, LeagueController.all);

// create a league
// SERVER_RUL/api/league/create
leagueRouter.post('/create', upload.single('logo'), LeagueController.create);

// update a league
// SERVER_URL/api/league/update
leagueRouter.post('/update',upload.single('logo'), LeagueController.update);

// delete a league
// SERVER_URL/api/league/remove/1
leagueRouter.delete('/remove/:id', LeagueController.remove);

// SERVER_URL/api/league/2/logo/1
leagueRouter.get('/:userId/logo/:id', LeagueController.getLogo);
// get a league
// SERVER_URL/api/league/info/1
leagueRouter.get('/info/:id', LeagueController.info);
// apply to a league
// SERVER_URL/api/league/apply
leagueRouter.post('/apply', LeagueController.apply);
export default leagueRouter;
