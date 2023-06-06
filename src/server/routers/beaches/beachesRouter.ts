import { Router } from "express";
import {
  deleteBeach,
  getBeaches,
} from "../../controllers/beachesControllers/beachesControllers.js";
import paths from "../../paths/paths.js";

const beachesRouter = Router();

beachesRouter.get("/", getBeaches);

beachesRouter.delete(paths.delete, deleteBeach);

export default beachesRouter;
