<!-- markdownlint-disable MD013 MD033 MD045 -->

# cli-loading-indicator [![Test](https://github.com/edisoncks/braille-pattern-cli-loading-indicator/actions/workflows/test.yml/badge.svg)](https://github.com/edisoncks/braille-pattern-cli-loading-indicator/actions/workflows/test.yml) [![NPM Version](http://img.shields.io/npm/v/@edisoncks/cli-loading-indicator.svg?style=flat)](https://www.npmjs.org/package/@edisoncks/cli-loading-indicator)

Animated command line loading indicator using Unicode braille patterns (based on
Heroku CLI).

<table>
  <thead>
    <tr>
      <th>size</th>
      <th>rotation</th>
      <th>preview</th>
      <th>sample code</th>
    </tr>
  </thead>
  <tr>
    <td>large</td>
    <td>cw</td>
    <td>
      <img src="https://raw.githubusercontent.com/edisoncks/braille-pattern-cli-loading-indicator/main/examples/sample.gif" width="177">
    </td>
    <td>
      <a href="https://github.com/edisoncks/braille-pattern-cli-loading-indicator/blob/main/examples/formatted.js">examples/formatted.js</a>
    </td>
  </tr>
  <tr>
    <td>small</td>
    <td>ccw</td>
    <td>
      <img src="https://raw.githubusercontent.com/edisoncks/braille-pattern-cli-loading-indicator/main/examples/sample2.gif" width="177">
    </td>
    <td>
      <a href="https://github.com/edisoncks/braille-pattern-cli-loading-indicator/blob/main/examples/formatted-multicolor.js">examples/formatted-multicolor.js</a>
    </td>
  </tr>
</table>

## Usage

- Use `start()` and `stop()` to enable or disable the loading indicator.
- Optionally specify `rotation` as `cw` (clockwise) or `ccw` (counterclockwise)
- Optionally provide a custom `format` function to add text or colors for the
  loading indicator.

```javascript
// ESM
import LoadingIndicator from "@edisoncks/cli-loading-indicator";

// CommonJS
const LoadingIndicator = require("@edisoncks/cli-loading-indicator").default;

const loader = new LoadingIndicator({
  size: "large",
  rotation: "cw",
  format: (pattern) => `charging plasma cannon ${pattern}`,
});

// Display loading indicator for 5 seconds, and then stop.
loader.start();
setTimeout(() => {
  loader.stop();
}, 5000);
```

## Compatibility

This library uses ANSI escape sequences for cursor control and animation.
Supported terminals include:

- **Linux** — gnome-terminal, konsole, xterm, Alacritty, Kitty, WezTerm
- **macOS** — terminal.app, iTerm2, Alacritty, Kitty
- **Windows** — Windows Terminal

Limited or no support:

- **Legacy Windows Console** — cmd.exe, PowerShell (before Windows 10 1903).
  DEC private modes (`?25l/h`) were not supported in older environments.

## Credits

Heavily inspired by [heroku cli](https://github.com/heroku/heroku) loading
indicator
