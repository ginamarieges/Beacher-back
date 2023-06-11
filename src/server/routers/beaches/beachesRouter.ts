import { Router } from "express";
import {
  addBeach,
  deleteBeach,
  filterBeaches,
  getBeaches,
} from "../../controllers/beachesControllers/beachesControllers.js";
import paths from "../../paths/paths.js";
import { validate } from "express-validation";
import addBeachSchema from "../../../utils/Schemas/addBeachSchema.js";

const beachesRouter = Router();

beachesRouter.get("/", getBeaches);

beachesRouter.get(paths.filter, filterBeaches);

beachesRouter.delete(paths.delete, deleteBeach);

beachesRouter.post(
  "/",
  validate(addBeachSchema, {}, { abortEarly: false }),
  addBeach
);

export default beachesRouter;
