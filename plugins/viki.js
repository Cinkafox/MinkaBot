const PluginManager = require("../libs/PluginManager")
const request = require("request")

PluginManager.add("вики",(args,bot)=>{
	const url = "https://ru.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles="+ encodeURIComponent(args.args[1]) +"&format=json"
	request({
		url: url,
		json: true
	}, function (error, response, body) {

		if (!error && response.statusCode === 200) {
			try{
			let onvet = body.query.pages[Object.keys(body.query.pages)[Object.keys(body.query.pages).length - 1]].revisions[0]['*'].split("—")[1]; //Print the json response
			//bot.chat(args.message.GM + onvet)
			bot.chat(args.message.GM + onvet.split(".")[0].replace(/\[\[.*?\|.*?\]\]/gm,(me)=>{
				return (me.split("|")[1].replace("]]",""))
			}))
			}catch(e){
			
			}
		}
	});

});
