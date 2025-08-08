export const key = {
  // Control characters
  nul: '\u0000',
  soh: '\u0001',
  stx: '\u0002',
  etx: '\u0003',
  eot: '\u0004',
  enq: '\u0005',
  ack: '\u0006',
  bel: '\u0007',
  bs: '\u0008',
  ht: '\u0009',
  lf: '\u000A',
  vt: '\u000B',
  ff: '\u000C',
  cr: '\u000D',
  so: '\u000E',
  si: '\u000F',
  // More control characters
  dle: '\u0010',
  dc1: '\u0011',
  dc2: '\u0012',
  dc3: '\u0013',
  dc4: '\u0014',
  nak: '\u0015',
  syn: '\u0016',
  etb: '\u0017',
  can: '\u0018',
  em: '\u0019',
  sub: '\u001A',
  esc: '\u001B',
  fs: '\u001C',
  gs: '\u001D',
  rs: '\u001E',
  us: '\u001F',
  // Special keys
  del: '\u007F',
  // Arrow keys
  up: '\u001B[A',
  down: '\u001B[B',
  right: '\u001B[C',
  left: '\u001B[D',
  // Function keys
  f1: '\u001BOP',
  f2: '\u001BOQ',
  f3: '\u001BOR',
  f4: '\u001BOS',
  f5: '\u001B[15~',
  f6: '\u001B[17~',
  f7: '\u001B[18~',
  f8: '\u001B[19~',
  f9: '\u001B[20~',
  f10: '\u001B[21~',
  f11: '\u001B[23~',
  f12: '\u001B[24~',
  // Other special keys
  home: '\u001B[H',
  end: '\u001B[F',
  insert: '\u001B[2~',
  delete: '\u001B[3~',
  pageUp: '\u001B[5~',
  pageDown: '\u001B[6~'
};

// // Example usage:
// console.log(ansiKeys.esc); // Outputs the escape character
// console.log(ansiKeys.up);   // Outputs the ANSI code for up arrow