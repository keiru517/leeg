import { LeagueController } from '../controllers';
import { Router } from 'express';
const leagueRouter = Router();

leagueRouter.get('/all', LeagueController.all);
leagueRouter.post('/create', LeagueController.create);
leagueRouter.get('/info/:id', LeagueController.info);
export default leagueRouter;
