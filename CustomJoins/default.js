const bdj = require("../libs/bdj");
const {Vec3} = require("vec3");

function preInit(bot,success){
    const action = [{message:">> Ожидайте завершения проверки...",action:"rec"},{message:"Авторизация | Войдите в игру, введя пароль /login",action:()=>{bot.chat("/l 12341")}}];
    bdj.check(bot,action);
    
    //bdj.antbotchest(bot)
    console.log("joining")
    bot.once("message",() => {
        bot.setControlState('forward',true);
        bot.lookAt(new Vec3(-4,139,-15));
            setTimeout(() => {
                bot.setControlState('forward', false);
                success();
            },6000);
    });

}

module.exports = preInit