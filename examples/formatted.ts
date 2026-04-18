import chalk from "chalk";
import LoadingIndicator from "../src/index.ts";

const loader = new LoadingIndicator({
  size: "large",
  rotation: "cw",
  format: (pattern) => chalk.blue("➜") + " connecting " + chalk.green(pattern),
});
loader.start();
setTimeout(() => loader.stop(), 5000);
