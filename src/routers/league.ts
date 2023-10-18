import { LeagueController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
import { auth } from '../auth';

const leagueRouter = Router();

const upload = multer({
    limits: {
      fileSize: 50 * 1024 * 1024
    }
  });
// get all leagues
// SERVER_URL/api/league/all
leagueRouter.get('/all', auth, LeagueController.all);

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

// Allow fan view of a league
leagueRouter.post('/allowFan', LeagueController.allowFan);


// Toggle Position
leagueRouter.post('/togglePosition', LeagueController.togglePosition);

// Toggle 3 points attempts
leagueRouter.post('/toggleAttempts3', LeagueController.toggleAttempts3);

// Toggle 2 points attempts
leagueRouter.post('/toggleAttempts2', LeagueController.toggleAttempts2);

// Toggle 2 points attempts
leagueRouter.post('/toggleAttempts1', LeagueController.toggleAttempts1);

// Toggle Blocks
leagueRouter.post('/toggleBlocks', LeagueController.toggleBlocks);

// Toggle Rebounds
leagueRouter.post('/toggleRebounds', LeagueController.toggleRebounds);

// Toggle Assists
leagueRouter.post('/toggleAssists', LeagueController.toggleAssists);

// Toggle Fouls
leagueRouter.post('/toggleFouls', LeagueController.toggleFouls);

// Toggle Fouls
leagueRouter.post('/toggleSteals', LeagueController.toggleSteals);

// Toggle Turnovers
leagueRouter.post('/toggleTurnovers', LeagueController.toggleTurnovers);

// Toggle Password
leagueRouter.post('/togglePassword', LeagueController.togglePassword);

export default leagueRouter;
