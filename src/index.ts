import * as readline from "readline";

export interface LoadingIndicatorOptions {
  size?: "small" | "large";
  rotation?: "cw" | "ccw";
  interval?: number;
  format?: (pattern: string, index: number) => string;
}

export class LoadingIndicator {
  static PATTERNS = {
    small: ["⠟", "⠯", "⠷", "⠾", "⠽", "⠻"],
    large: ["⡿", "⣟", "⣯", "⣷", "⣾", "⣽", "⣻", "⢿"],
  };

  size: string;
  patterns: string[];
  interval: number;
  format: (pattern: string, index: number) => string;

  #readlineInterface: readline.Interface | null = null;
  #animationInterval: ReturnType<typeof setInterval> | null = null;
  #patternIndex: number = 0;
  #outputStream: NodeJS.WriteStream | null = null;

  constructor(attributes: LoadingIndicatorOptions = {}) {
    this.size = attributes.size ?? "large";
    this.patterns = [
      ...LoadingIndicator.PATTERNS[
        this.size as keyof typeof LoadingIndicator.PATTERNS
      ],
    ];
    this.interval = attributes.interval ?? 70;
    this.format = attributes.format ?? ((pattern: string) => pattern);

    if (attributes.rotation === "cw") {
      this.patterns.reverse();
    }
  }

  start(): void {
    this.#readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.#outputStream = process.stdout;
    process.stdout.write("\x1b[?25l");
    this.#patternIndex = 0;
    this.#animationInterval = setInterval(() => this.#animate(), this.interval);
  }

  stop(): void {
    this.#resetLineAndCursor();
    process.stdout.write("\x1b[?25h");
    this.#readlineInterface?.close();
    if (this.#animationInterval) {
      clearInterval(this.#animationInterval);
      this.#animationInterval = null;
    }
  }

  #animate(): void {
    this.#resetLineAndCursor();
    this.#outputStream?.write(
      this.format(this.patterns[this.#patternIndex], this.#patternIndex),
    );
    this.#patternIndex =
      this.#patternIndex < this.patterns.length - 1
        ? this.#patternIndex + 1
        : 0;
  }

  #resetLineAndCursor(): void {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
  }
}

export default LoadingIndicator;
