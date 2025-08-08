//import { fg, bg, style, extended} from '../../src/ansi/color.js';
import { color } from "../../src/ansi/index.js";

let end = color.style.reset;
let color_fg = Object.keys(color.fg);

color_fg.forEach((c) => {
  console.log(`fg ${color.fg[c]}${c}${end} end`)  
})
