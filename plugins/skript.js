const PluginManager = require("../libs/PluginManager");
const Script = require("../libs/script")
let Scripts = {}
let currentScript = ""
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitPlayer(nick){
	while (PluginManager.bot.players[nick].entity.position.distanceTo(PluginManager.bot.entity.position) > 4) {
		await sleep(250)	
	}
}

PluginManager.add("скрипт",(args,bot)=>{
	const fn = (message) => {
		bot.chat(args.message.GM + message)
	}
	switch(args.args[1]){
		case "очистить":
			delete Scripts[args.args[2]]
			fn("Удален " + args.args[2])
			break
		case "добавить":
			Scripts[args.args[2]] = new Script(null,{args,bot,waitPlayer},fn)
		case "изменить":
			currentScript = args.args[2]
			fn("В данный момент скрипт - "+currentScript)
			break;
		case "запуск":
			let c = currentScript
			if(args.args[2]) c = args.args[2]
			Scripts[c].run().catch(e=>{
				fn("Пук срыньк я обосрался((")
				console.log(e)
			})
			break;
		default:
			Scripts[currentScript].parseTextCommand(args.args.slice(1).join(" "))
			break;
	}
	
});
