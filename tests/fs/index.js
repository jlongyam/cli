import fs from 'fs-extra'
import cfg from 'home-config'

var zshrc = cfg.load('.zshrc');
// console.log(zshrc)
// zshrc.section = {
//   'export FOO': 'x'
// };
// zshrc.save()
// console.log(zshrc)
console.log(zshrc.section)
// fs.readFileSync('~/.zshrc',( err, data) => {
//   console.log(data)
// })
