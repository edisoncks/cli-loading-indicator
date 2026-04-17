"use strict";

import readline from "readline";

class LoadingIndicator {
  // Braille patterns from:
  // http://symbolcodes.tlt.psu.edu/bylanguage/braillechart.html
  static PATTERNS = {
    small: ["⠟", "⠯", "⠷", "⠾", "⠽", "⠻"],
    large: ["⡿", "⣟", "⣯", "⣷", "⣾", "⣽", "⣻", "⢿"],
  };

  // Public properties (required for backwards compatibility)
  size;
  patterns;
  interval;
  format;

  // Private properties
  #readlineInterface;
  #animationInterval;
  #patternIndex = 0;

  constructor(attributes = {}) {
    this.size = attributes.size ?? "large";
    this.patterns = [...LoadingIndicator.PATTERNS[this.size]];
    this.interval = attributes.interval ?? 70;
    this.format = attributes.format ?? ((pattern) => pattern);

    if (attributes.rotation === "cw") {
      this.patterns.reverse();
    }
  }

  start() {
    this.#readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    process.stdout.write("\x1b[?25l");
    this.#patternIndex = 0;
    this.#animationInterval = setInterval(() => this.#animate(), this.interval);
  }

  stop() {
    this.#resetLineAndCursor();
    process.stdout.write("\x1b[?25h");
    this.#readlineInterface.close();
    if (this.#animationInterval) {
      clearInterval(this.#animationInterval);
      this.#animationInterval = null;
    }
  }

  #animate() {
    this.#resetLineAndCursor();
    this.#readlineInterface.output.write(
      this.format(this.patterns[this.#patternIndex], this.#patternIndex),
    );
    this.#patternIndex =
      this.#patternIndex < this.patterns.length - 1
        ? this.#patternIndex + 1
        : 0;
  }

  #resetLineAndCursor() {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
  }
}

export default LoadingIndicator;
