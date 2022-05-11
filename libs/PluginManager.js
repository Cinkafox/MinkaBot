const fs = require("fs");
const path = require("path");
const plpath = "../plugins"
const normalizedPath = path.join(__dirname, plpath);

let bot = null;
let plugins = {};
let onChatT = [];
let help = {};
function add(name,func){
    plugins[name]=func;
}
function onChat(funct){
    onChatT[onChatT.length] = funct
}
function execute(){
    return plugins;
}
function exchat(message){
    onChatT.forEach((f)=>{
        f(message)
    })
}
function remove(name){
    if(plugins[name])
        delete plugins[name]
    else{
        const index = onChatT.indexOf(5);
        if (index > -1) {
            onChatT.splice(index, 1); 
        }

    }
}
function addhelp(name,text){
    help[name]=text;
}
function gethelp(name){
    let t = help[name];
    if(t == undefined)
        return "Помощь не найдена!";
    return t;
}

function load(){
    fs.readdirSync(normalizedPath).forEach(function (file) {
        try {
            require(plpath+"/"+file)
        }catch(e){
            console.log(e)
        }
    });
}
module.exports = {add,execute,exchat,addhelp,gethelp,bot,load,onChat,remove}
