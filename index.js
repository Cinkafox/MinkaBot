const mineflayer = require("mineflayer");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));
const bdj = require("./libs/bdj");
const ChatParser = require("./libs/Chatparser");
const Permissions = require("./libs/permissions");
const bot = mineflayer.createBot(config.bot);
const {Vec3} = require("vec3");
const PluginManager = require("./libs/PluginManager");
PluginManager.bot = bot;
PluginManager.load();
const actions = [{message:">> Ожидайте завершения проверки...",action:"rec"},{message:"Авторизация | Войдите в игру, введя пароль /login",action:()=>{bot.chat("/l 12341")}}]
let alias = [config.bot.username,"биба"]

bot.once('spawn',()=>{preInit()});
bot.once('kicked',console.log);
bot.on('message',(message)=>{console.log(message.toString())});

function preInit(){
    bdj.check(bot,actions);
    
    //bdj.antbotchest(bot)
    bot.once("message",() => {
        bot.setControlState('forward',true);
        bot.lookAt(new Vec3(-4,139,-15));5
            setTimeout(() => {
                bot.setControlState('forward', false);
                init();
            },6000);
    });


}
/*

*/

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