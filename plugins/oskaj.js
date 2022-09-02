const PluginManager = require("../libs/PluginManager");
const request = require("request")

PluginManager.add("оскай",(args,bot)=>{
	
	request({
		url:"https://evilinsult.com/generate_insult.php?lang=ru&_="+Math.random().toString(36).slice(2, 10)
	},function (error, response, body) {
		if (!error && response.statusCode === 200) {
			let txt = body.replace(":","")
			bot.chat(args.message.GM + txt)
			console.log(txt)
			
		}
	})	
});
PluginManager.addChat((message)=>{
	let txt = message.MESSAGE.toLowerCase()
	if(txt.includes("даун")){
		request({
			url:"https://evilinsult.com/generate_insult.php?lang=ru&_="+Math.random().toString(36).slice(2, 10)
		},function (error, response, body) {
			if (!error && response.statusCode === 200) {
				let txt = body.replace(":","")
				PluginManager.bot.chat(message.GM + txt)
				console.log(txt)
				
			}
		})	
	}
})
