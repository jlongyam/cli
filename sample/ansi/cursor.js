// import {cursor} from '../../src/ansi/cursor.js';
import {cursor} from "../../src/ansi/index.js";

const out = process.stdout; 

out.write('First line');
out.write(cursor.down(1) + 'Second line');
out.write(cursor.up(1) + 'Overwritten first line');
out.write(cursor.moveTo(3, 1) + 'Third line, column 1');
