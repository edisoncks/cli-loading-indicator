import LoadingIndicator from "../src/index.ts";

const loader = new LoadingIndicator({ size: "large" });
loader.start();
setTimeout(() => loader.stop(), 5000);
