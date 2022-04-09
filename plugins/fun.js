const PluginManager = require("../libs/PluginManager");
let who1 = ["Зеленый","Мудрый","Вкусный","Приятный","Злой","Добрый","Старый","Молодой","Гендерфлюидный","Жирный","Худой","Мелкий","Русский","Украинский"]
let who2 = ["Пацанчик","Эльф","Бутерброд","Хрен","Симпл димпл","Кролик","Инопланетянин","Мадам","Вертосексуал","Боба","Биба","Писькогрыз","Фея","Депутат","Собака","Кальмар","Крыса","Свинья"]
let truefalse = ["Агась!","Неа!","Точно нет!","Наверн да","Естественно!","Ясень пень!","хз лол!","Лучше не!","Ясное дело!","Капец! тычо куку? нет конечн!","Ты чооооо! естественно да!"]
    

PluginManager.add("кто",(args,bot)=>{
	if(args.args[2] == null){
		return (args.message.GM + "Что кто?");	
	}
	let naz = args.args.slice(2).join(" ");
	if(args.args[2].split("?").join("") === "я")
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
		let vibor = args.args.slice(2).join(" ").split("или");
        bot.chat(args.message.GM + "Я выбираю " + vibor[Math.floor(Math.random()*(vibor.length))]);
});
PluginManager.add("правда",(args,bot)=>{
	bot.chat(args.message.GM + truefalse[Math.floor(Math.random()*truefalse.length -1)])
});