const PluginManager = require("../libs/PluginManager");

PluginManager.add("секс",(args,bot)=>{
	bot.chat("ЯМАДЕКУНАСАЙ АХ АХАХАХ")
	
	for(let i = 0;i<20;i++){
		console.log("sss")
		bot.setControlState('sneak', true)
		for(let j = 0;j<400;j++){console.log("")}
		bot.setControlState('sneak', false)
		for(let j = 0;j<400;j++){console.log("")}
	}
});
