const PluginManager = require("../libs/PluginManager")
const permission = require("../libs/permissions")
const minicommands = require("../libs/MCommands")
const sab = minicommands.ReadCommands()

function replacment(text,obj){
    const indexes = Object.keys(obj)
    indexes.forEach(element => {text = text.replace(element,obj[element])});
    return text
}


function addCommand(name,msg){
	PluginManager.add(name,(args,bot)=>{
		const obj = {"%nick%":args.message.NICK,"%random%":bot.players[Object.keys(bot.players)[Math.floor(Math.random()*Object.keys(bot.players).length)]].username}
		for (let i = 0; i < args.args.length; i++) {
			const element = args.args[i];
			obj["%"+i+"%"] = element
		}
		return(args.message.GM + replacment(msg,obj))
	})
}

for(let i = 0;i < Object.keys(sab).length;i++){
    console.log("added mimicomand:"+Object.keys(sab)[i])
	let msg = sab[Object.keys(sab)[i]]
	addCommand(Object.keys(sab)[i],msg)
}

PluginManager.add("миникоманда",(args1,bot)=>{
	if(!args1.args[2]) return "Недостаточно аргументов!"
	if(args1.args[2].split("")[0] === "/" && !permission.check(permission.readUser(args1.message.NICK),"м_слеш")) return "Запрещенно команды!"
	permission.addpermGroup(permission.defaultgrp,args1.args[1])
	let msg = args1.args.slice(2).join(" ")
	minicommands.WriteCommand(args1.args[1],msg)
	addCommand(args1.args[1],msg)
	return (args1.message.GM + "Добавлен " + args1.args[1])
});

PluginManager.addhelp("миникоманда","добавим миникоманды! 1)название 2)действие в чате")
