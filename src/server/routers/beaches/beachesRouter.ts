import { Router } from "express";
import { getBeaches } from "../../controllers/beachesControllers/beachesControllers.js";

const beachesRouter = Router();

beachesRouter.get("/", getBeaches);

export default beachesRouter;
