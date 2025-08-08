export const cursor = {
  up: (lines = 1) => `\x1b[${lines}A`,
  down: (lines = 1) => `\x1b[${lines}B`,
  forward: (cols = 1) => `\x1b[${cols}C`,
  back: (cols = 1) => `\x1b[${cols}D`,
  nextLine: (lines = 1) => `\x1b[${lines}E`,
  prevLine: (lines = 1) => `\x1b[${lines}F`,
  moveTo: (row, col) => `\x1b[${row};${col}H`,
  savePosition: '\x1b[s',
  restorePosition: '\x1b[u',
  hide: '\x1b[?25l',
  show: '\x1b[?25h'
}