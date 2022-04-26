const bdj = require("../libs/bdj");
const {Vec3} = require("vec3");
const regex = /«(?<G>.*)» \| (.(.*?).){0,1} .(.*?). (?<Nick>.*?) ➥ (?<Chat>.*)|\[.*? (?<NickL>.*?) -> я\] (?<ChatL>.*)/gm;
let global = "Ⓖ";

function preInit(bot,success){
    const action = [{message:">> Ожидайте завершения проверки...",action:"rec"},{message:"Авторизация | Войдите в игру, введя пароль /login",action:()=>{bot.chat("/l 12341")}}];
    bdj.check(bot,action);
    
    //bdj.antbotchest(bot)
    console.log("joining")
    bot.once("message",() => {
        bot.setControlState('forward',true);
        bot.lookAt(new Vec3(-348,63,440));
            setTimeout(() => {
                bot.setControlState('forward', false);
                success();
            },10000);
    });

}

module.exports = {regex,preInit,global}