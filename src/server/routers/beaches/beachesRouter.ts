import { Router } from "express";
import paths from "../../paths/paths.js";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import { getBeaches } from "../../controllers/beachesControllers/beachesControllers.js";

const beachesRouter = Router();

beachesRouter.get(paths.getBeaches, auth, getBeaches);

export default beachesRouter;
