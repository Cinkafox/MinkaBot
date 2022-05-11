const PluginManager = require("../libs/PluginManager");
const permission = require("../libs/permissions")
let code

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


PluginManager.add("код",(args,bot)=>{
	if(args.args[1] == "получить") {
		if(!code) code=makeid(4)
		console.log("КОД!!!:" + code)
		bot.chat(args.message.GM + "гляньте в консоль бота и введите Leofox код *код из консоли*")
	}else{
		if(code){
			if(args.args[1] == code){
				const NICK = args.message.NICK
				console.log("success " + NICK)
				permission.writeUser(NICK,"op",[])
			}
		}
	}


});
