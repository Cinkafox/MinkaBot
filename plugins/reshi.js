const PluginManager = require("../libs/PluginManager");

PluginManager.add("реши",(args,bot)=>{
	try{
		return args.message.GM + "Думаю ответ " + eval(args.args[1])
	}catch{
		return args.message.GM + "Что то неправильно ввел!";
	}
});
