const mineflayer = require("mineflayer");
const fs = require('fs');
const clpath = "./CustomJoins"
const config = require("./config.json");
const ChatParser = require("./libs/Chatparser");
const Permissions = require("./libs/permissions");
const bot = mineflayer.createBot(config.bot);
const {Vec3} = require("vec3");
const PluginManager = require("./libs/PluginManager");

PluginManager.bot = bot;
let alias = [config.bot.username,"биба","настя","саня","саша"]


bot.once('spawn',()=>{preInit()});
bot.once('kicked',console.log);

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
    PluginManager.loadFromDir("../plugins");
    console.log("Модули загруженны!Действительный список:" + Object.keys(PluginManager.plugins))
    PluginManager.add("помощь",(args,bot)=>{
        let t = PluginManager.help[args.args.slice(1).join(" ")];
        if(t == undefined) t = "Помощь не найдена!"
        bot.chat(args.message.GM+t);
    })
    PluginManager.add("рестарт",(args,bot)=>{
        bot.chat("Перезапускаюсь!")
        bot.removeAllListeners()
        init();
    })
    bot.on('message',(message)=>{onChat(message.toString())})
}

function onChat(rawmessage){
    const message = ChatParser.parse(rawmessage);
    if(message == null) return;
    const args = message.MESSAGE.split(" ");
    PluginManager.executeChat(message)
    if(message.GM !== "/er"){
        if(alias.indexOf(args[0]) == -1 || message.NICK==config.bot.username) return;
        args.shift()
    }
    const plugin = PluginManager.execute(args[0]);
    if(plugin !== undefined && Permissions.check(Permissions.readUser(message.NICK),args[0])){
        console.log(message.NICK + " ввел:" + message.MESSAGE)
        let out;
        try{
            out = plugin({message:message,args:args},bot);
        }catch(e){
            out =  message.GM + "Какая то ошибка при выполнении!"
            console.log(e.message);
        }
        if(out !== undefined)
            bot.chat(out);
    }
}

bot.once("end",()=>{
    bot.removeAllListeners()
})