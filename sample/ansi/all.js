import * as ansi from '../../src/ansi.js';

console.log(`
${ansi.color.green}${ansi.style.bold}SUCCESS:${ansi.style.reset} ${ansi.style.italic}Operation completed
${ansi.bg.brightRed}${ansi.color.white} WARNING ${ansi.style.reset} ${ansi.color.yellow}Proceed with caution
${ansi.extended.bgRgb(30, 30, 30)}${ansi.extended.rgb(255, 255, 0)}Custom RGB Colors${ansi.style.reset}
`);

// Progress indicator using cursor
process.stdout.write('Loading: [          ]');
for (let i = 0; i <= 10; i++) {
  setTimeout(() => {
    process.stdout.write(ansi.cursor.back(11) + '='.repeat(i) + '='.repeat(10-i)+'] ');
    if (i === 10) process.stdout.write(ansi.cursor.down(1) + '\nDone!\n');
  }, i * 200);
}