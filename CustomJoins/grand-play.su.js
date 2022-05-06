const bdj = require("../libs/bdj");
const {Vec3} = require("vec3");
const regex = /«(?<G>.*)» \| (.(.*?).){0,1} .(.*?). (?<Nick>.*?) ➥ (?<Chat>.*)|\[.*? (?<NickL>.*?) -> я\] (?<ChatL>.*)/gm;
let global = "Ⓖ";

let ch = 0;
function onStart(bot,success){
    console.log("Dab")
    bot.once("message",(m) => {
        let ac = m.toString();
        console.log("ssfafa:"+ac)
        if(ac === "Авторизация | Войдите в игру, введя пароль /login" || ac==="Авторизация | Авторизация успешно пройдена" || ac===""){
            return onStart(bot,success);
        }
        if(ac === "➣ Выберите портал для игры"){
            if(ch<4){
                console.log("SFfaf")
                ch++;
                return onStart(bot,success);
            }
            console.log("dond" + ch)
            success();
            return "donre"
        }
        if(ac === "АНТИ БОТ ≫ Пройди капчу перед тем как двигаться!"){
            ch = 0
            console.log("prepare")
            bdj.antbotchest(bot)
            console.log("Fig" + bot.currentWindow)
            return onStart(bot,success);
        }   
    });
}

function preInit(bot,success){
    const action = [{message:">> Ожидайте завершения проверки...",action:"rec"},{message:"Авторизация | Войдите в игру, введя пароль /login",action:()=>{bot.chat("/l 12341")}}];
    bdj.check(bot,action);
    
    //bdj.antbotchest(bot)
    onStart(bot,()=>{
        bot.setControlState('forward',true);
        bot.lookAt(new Vec3(-348,63,440));
            setTimeout(() => {
                bot.setControlState('forward', false);
                success();
            },10000);
    })
    
}

module.exports = {regex,preInit,global}