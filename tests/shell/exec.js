import shell from 'shelljs';


function ls(path, args = null) {
  var arr = [];
  shell.ls(path).forEach(i=> {
    arr.push(i)
  })
  console.log(arr)
}
ls('~')

// shell.exec(`clear && command git status`)
// console.log(isInstalled('java'))
