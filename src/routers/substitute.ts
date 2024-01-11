import {SubstitutueController} from "../controllers";
import { Router } from 'express';
import multer from 'multer';

const upload = multer({
    limits: {
      fileSize: 50 * 1024 * 1024
    }
  });

const substituteRouter = Router();

// substituteRouter.get("/all", SubstitutueController.all);
substituteRouter.post("/create", upload.none(), SubstitutueController.create);
substituteRouter.post("/remove", upload.none(), SubstitutueController.remove);

export default substituteRouter;