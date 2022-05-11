const PluginManager = require("../libs/PluginManager");
let who1 = ["Зеленый","Мудрый","Вкусный","Приятный","Злой","Добрый","Старый","Молодой","Гендерфлюидный","Жирный","Худой","Мелкий","Русский","Украинский"]
let who2 = ["Пацанчик","Эльф","Бутерброд","Пипяу","Симпл димпл","Кролик","Инопланетянин","Мадам","Вертосексуал","Боба","Биба","Магамет","Магазин","Депутат","Кабель","Кальмар","биба","Автор","Телевизор"]
let truefalse = ["Агась!","Неа!","Точно нет!","Наверн да","Естественно!","Ясень пень!","хз лол!","Лучше не!","Ясное дело!","Капец! тычо куку? нет конечн!","Ты чооооо! естественно да!"]
    

PluginManager.add("кто",(args,bot)=>{
	if(args.args[1] == null){
		return (args.message.GM + "Что кто?");	
	}
	let naz = args.args.slice(1).join(" ");
	if(args.args[1].split("?").join("") === "я")
		naz = "ты"
	if(bot.players[naz] != null || naz === "ты")
		return (args.message.GM + "Я думаю что " + naz + " " + who1[Math.floor(Math.random()*who1.length)] + " " + who2[Math.floor(Math.random()*who2.length)])
	else
		return (args.message.GM + "Думаю что " + naz + " у нас " + bot.players[Object.keys(bot.players)[Math.floor(Math.random()*Object.keys(bot.players).length)]].username)

});
PluginManager.add("инфа",(args,bot)=>{
	return (args.message.GM + "Где то " + Math.floor(Math.random()*100) + "%")
});

PluginManager.add("выбери",(args,bot)=>{
		let vibor = args.args.slice(1).join(" ").split("или");
        bot.chat(args.message.GM + "Я выбираю " + vibor[Math.floor(Math.random()*(vibor.length))]);
});
PluginManager.add("правда",(args,bot)=>{
	bot.chat(args.message.GM + truefalse[Math.floor(Math.random()*truefalse.length -1)])
});

PluginManager.add("напиши",(args,bot)=>{
	return args.args.slice(1).join(" ")
});
PluginManager.add("тп",(args,bot)=>{
	return "/tpa " + args.message.NICK
});
PluginManager.add("женись",(args,bot)=>{
	return "/marry " + args.args[2]
});

let bark = false

PluginManager.add("ищейка",(args,bot)=>{
	bark = !bark
	if(bark) bot.chat(args.message.GM + "Гавкаю!")
	else bot.chat(args.message.GM + "Не гавкаю!")
})

PluginManager.onChat((message)=>{
	if(bark){
		let nick = message.NICK
		if(nick == "❖") nick="КиноЛисПрод"
		if(message.MESSAGE.split(" ").indexOf("ищу") >= 0)
		PluginManager.bot.chat(message.GM + "ДА ДА Бл*ть ищи ищи всем похрен на тебя " + nick)
	}
})