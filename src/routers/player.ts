import { PlayerController } from '../controllers';
import { Router } from 'express';
const playerRouter = Router();

// get all players
// SERVER_URL/api/player/all
playerRouter.get('/all', PlayerController.all);

// create a player
// SERVER_URL/api/player/create
playerRouter.post('/create', PlayerController.create);

// update a player
// SERVER_URL/api/player/update
playerRouter.post('/update', PlayerController.update);

// delete a player
// SERVER_URL/api/player/remove/1
playerRouter.post('/remove', PlayerController.remove);

// add players
// SERVER_URL/api/player/add
playerRouter.post('/add', PlayerController.add);

// accept players
// SERVER_URL/api/player/accept
playerRouter.post('/accept', PlayerController.accept);

// unaccept players
// SERVER_URL/api/player/unaccept
playerRouter.post('/unaccept', PlayerController.unaccept);

// get a player
// SERVER_URL/api/player/info/1
playerRouter.get('/info/:id', PlayerController.info);

export default playerRouter;