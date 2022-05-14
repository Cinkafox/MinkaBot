const fs = require('fs');
let readFile = () => {
    let obj = JSON.parse(fs.readFileSync('minicommands.json'));
    return obj;
}
let writeFile = (obj) => {
    fs.writeFileSync("minicommands.json",JSON.stringify(obj));
}

const WriteCommand = (name,args)=>{
    let obj = readFile();
    obj[name] = args
    writeFile(obj)
}

const ReadCommands = () =>{
    return readFile()
}


module.exports = {WriteCommand,ReadCommands}