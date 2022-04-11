const mineflayer = require("mineflayer");
const fs = require('fs');
const clpath = "./CustomJoins"
const config = JSON.parse(fs.readFileSync('config.json'));
const ChatParser = require("./libs/Chatparser");
const Permissions = require("./libs/permissions");
const bot = mineflayer.createBot(config.bot);
const {Vec3} = require("vec3");
const PluginManager = require("./libs/PluginManager");
PluginManager.bot = bot;
PluginManager.load();
let alias = [config.bot.username,"биба"]

bot.once('spawn',()=>{preInit()});
bot.once('kicked',console.log);
bot.on('message',(message)=>{console.log(message.toString())});

function preInit(){
    try{
        let cj = require(clpath + "/" + config.bot.host + ".js");
        ChatParser.setEnv(cj.regex,cj.global);
        cj.preInit(bot,()=>{init()});
    }catch(e){
        fs.writeFileSync(clpath + "/" + config.bot.host + ".js", fs.readFileSync(clpath + "/default.js"));
        console.log("Customjoin сервера создан!Настройте его под себя в папке CustomJoins!" + e)
        bot.end();
        process.exit(1);
    }
}


function init(){
    console.log("done")
    PluginManager.add("помощь",(args,bot)=>{
        bot.chat(args.message.GM+PluginManager.gethelp(args.args.slice(2).join(" ")));
    })
    bot.on('message',(message)=>{onChat(message.toString())})
}

function onChat(rawmessage){
    const message = ChatParser.parse(rawmessage);
    if(message == null) return;
    const args = message.MESSAGE.split(" ");
    if(alias.indexOf(args[0]) == -1 || message.NICK==config.bot.username) return;
    const plugin = PluginManager.execute()[args[1]];
    if(plugin !== undefined && Permissions.check(Permissions.readUser(message.NICK),args[1])){
        const out = plugin({message:message,args:args},bot)
        if(out !== undefined)
            bot.chat(out);
    }
}

bot.once("end",()=>{
    bot.off('message',(message)=>{onChat(message.toString())})
})