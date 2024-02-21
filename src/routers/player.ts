import { PlayerController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
const upload = multer();
const playerRouter = Router();

// get all players
// SERVER_URL/api/player/all
playerRouter.get('/all', PlayerController.all);

// create a player
// SERVER_URL/api/player/create
playerRouter.post('/create', PlayerController.create);

// update a player
// SERVER_URL/api/player/update
playerRouter.post('/update', upload.single('avatar'), PlayerController.update);

// Update the player avatar
playerRouter.post('/uploadPlayerAvatar', upload.single('avatar'), PlayerController.uploadPlayerAvatar);

// update a points
// SERVER_URL/api/player/updatePoints
playerRouter.post('/updatePoints', PlayerController.updatePoints);

// remove a player from a team and put him in accepted list
// SERVER_URL/api/player/remove/1
playerRouter.post('/removeFromTeam', PlayerController.removeFromTeam);

// remove a substitute player from a team on matchup page
// playerRouter.post('/removeSubstitute', PlayerController.removeSubstitute);
// add players
// SERVER_URL/api/player/add
playerRouter.post('/add', PlayerController.add);

// accept players
// SERVER_URL/api/player/accept
playerRouter.post('/accept', PlayerController.accept);

// unaccept players
// SERVER_URL/api/player/unaccept
playerRouter.post('/unaccept', PlayerController.unaccept);

// invite player
playerRouter.post('/invite', PlayerController.invite);

// remove a player from league
playerRouter.post('/removeFromLeague', PlayerController.removeFromLeague);
// get a player
// SERVER_URL/api/player/info/1
playerRouter.get('/info/:id', PlayerController.info);

// get player's avatar
playerRouter.get('/avatar/:id', PlayerController.avatar);
export default playerRouter;