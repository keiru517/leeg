import { TeamController } from '../controllers';
import { Router } from 'express';
import multer from 'multer';
const teamRouter = Router();

const upload = multer({
    limits: {
      fileSize: 50 * 1024 * 1024
    }
  });
// get all teams
// SERVER_URL/api/team/all
teamRouter.get('/all', TeamController.all);

// create a team
// SERVER_URL/api/team/create
teamRouter.post('/create', upload.single('logo'), TeamController.create);

// update a team
// SERVER_URL/api/team/update
teamRouter.post('/update', upload.single('logo'), TeamController.update);

// delete a team
// SERVER_URL/api/team/remove/1
teamRouter.delete('/remove/:id', TeamController.remove);

// send logo
// SERVER_URL/api/team/logo/1
teamRouter.get('/logo/:userId/:id', TeamController.logo);

export default teamRouter;