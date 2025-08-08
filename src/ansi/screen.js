export const screen = {
  clear: '\x1b[2J',
  clearLine: '\x1b[2K',
  clearToEnd: '\x1b[0J',
  clearToEndOfLine: '\x1b[0K',
  clearToStart: '\x1b[1J',
  clearToStartOfLine: '\x1b[1K',
  scrollUp: (lines = 1) => `\x1b[${lines}S`,
  scrollDown: (lines = 1) => `\x1b[${lines}T`,
  save: '\x1b[?47h',
  restore: '\x1b[?47l'
}