import chalk from "chalk";
import LoadingIndicator from "../src/index.ts";

const colors = ["red", "yellow", "green", "cyan", "blue", "magenta"] as const;

const loader = new LoadingIndicator({
  size: "small",
  rotation: "ccw",
  format: (pattern, i) =>
    chalk.blue("➜") + " connecting " + chalk[colors[i]](pattern),
});
loader.start();
setTimeout(() => loader.stop(), 5000);
