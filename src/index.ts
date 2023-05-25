import "./loadEnvironment.js";
import createDebug from "debug";
import { app } from "./server/app.js";
import chalk from "chalk";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("beacher-api:root");

const port = process.env.PORT ?? 4000;
const mongodbConnect = process.env.MONGODB_CONNECTION;

if (!mongodbConnect) {
  debug(chalk.red("Missing environment variables"));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.green(`Listening to port ${port}`));
});

try {
  await connectToDatabase(mongodbConnect);
  debug(chalk.green("Connected to database"));
} catch (error) {
  debug(chalk.red(`Error connecting to database: ${(error as Error).message}`));
}
