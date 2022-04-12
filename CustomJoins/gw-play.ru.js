const bdj = require("../libs/bdj");
const {Vec3} = require("vec3");
const regex = /\[(?<G>.*)\] (.(.*?).){0,1} .*\| .(.*?). (?<Nick>.*?) (➥|➦) (?<Chat>.*)|\[(?<NickL>.*?) -> Я\] (?<ChatL>.*)/gm;
let global = "G";

function preInit(bot,success){
    const action = [{message:"GreenWorld>> Ожидайте завершения проверки...",action:"rec"},{message:"[GREENWORLD] Сессия недействительна.",action:()=>{bot.chat("/l 12341")}},{message:"Для авторизации пиши - /login [пароль]",action:()=>{bot.chat("/l 12341")}}];
    bdj.check(bot,action);
    
    //bdj.antbotchest(bot)
    console.log("joining")
    bot.once("message",() => {
        bot.setControlState('forward',true);
        bot.lookAt(new Vec3(22,37,-3));
        bot.once('windowOpen', (w) => {
            bot.clickWindow(3,0,0);
            bot.setControlState('forward', false);
            success();
        })
    });

}

module.exports = {regex,preInit,global}