const PluginManager = require("../libs/PluginManager");
const rules = require("../libs/rules.json")

PluginManager.add("правила",(args,bot)=>{
	const crul = rules["grand-play.su"]
	console.log(crul[args.args[1]])
	if(crul[args.args[1]]) return args.message.GM + crul[args.args[1]].replace(".",",").replace("обман","о б м а н").replace("сервере","с е р в е р е").replace(":","-")

	let txe = ""
	for(let i = 0;i < Object.keys(crul).length;i++){
		const index = Object.keys(crul)[i]
		const msg = crul[index]
		if(msg.toLowerCase().includes(args.args[1])) txe = txe + index.replace(".","-") + " "
	}
	return args.message.GM + txe
});
