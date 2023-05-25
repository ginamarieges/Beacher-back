import "./loadEnvironment.js";
import createDebug from "debug";
import { app } from "./server/app.js";
import chalk from "chalk";

const debug = createDebug("beaches-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.green(`Listening to port ${port}`));
});
