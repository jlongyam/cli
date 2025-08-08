export const fg = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightBlack: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
  default: '\x1b[39m' // Reset to default foreground color
}
// Background colors
export const bg = {
  black: '\x1b[40m',
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  blue: '\x1b[44m',
  magenta: '\x1b[45m',
  cyan: '\x1b[46m',
  white: '\x1b[47m',
  brightBlack: '\x1b[100m',
  brightRed: '\x1b[101m',
  brightGreen: '\x1b[102m',
  brightYellow: '\x1b[103m',
  brightBlue: '\x1b[104m',
  brightMagenta: '\x1b[105m',
  brightCyan: '\x1b[106m',
  brightWhite: '\x1b[107m',
  default: '\x1b[49m' // Reset to default background color
}
// Text styling
export const style = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  inverse: '\x1b[7m',
  hidden: '\x1b[8m',
  strikethrough: '\x1b[9m',
  // Resets for specific styles
  resetBold: '\x1b[22m', // Also resets dim
  resetItalic: '\x1b[23m',
  resetUnderline: '\x1b[24m',
  resetBlink: '\x1b[25m',
  resetInverse: '\x1b[27m',
  resetHidden: '\x1b[28m',
  resetStrikethrough: '\x1b[29m'
}
// Extended colors (8-bit and RGB)
export const extended = {
  // 8-bit color (256 colors)
  color8: (code) => `\x1b[38;5;${code}m`,
  bgColor8: (code) => `\x1b[48;5;${code}m`,
  // Truecolor (RGB)
  rgb: (r, g, b) => `\x1b[38;2;${r};${g};${b}m`,
  bgRgb: (r, g, b) => `\x1b[48;2;${r};${g};${b}m`
}