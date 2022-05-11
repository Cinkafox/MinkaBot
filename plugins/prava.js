const PluginManager = require("../libs/PluginManager");
const permission = require("../libs/permissions")

PluginManager.add("права",(args,bot)=>{
	switch(args.args[1]){
		case "игрок":
			switch(args.args[2]){
				case "список":
						return args.message.GM +"Список пользователей--"+permission.userlist().join(" ");
					break;
				case "добавить":
						if(args.args.length < 4) return args.message.GM +"Недостаточно аргументов!"+args.args.length-3 + " из 2";
						let nick = args.args[3];
						let permissions = []
						try{
							permissions = eval(args.args[4])
						
							if(!Array.isArray(permissions)) return args.message.GM +"Ошибка!";
						}catch{return args.message.GM +"Фатальня ошибка!";}
						if(nick=="себя")
							nick = args.message.NICK
						if(args.args.length < 5)
							permission.writeUser(nick,permission.defaultgrp,permissions)
						else
							permission.writeUser(nick,args.args[5],permissions)
						return args.message.GM +"Успешно добавлено " + nick;
				case "удалить":
						if(args.args.length < 3) return "Недостаточно аргументов!"+args.args.length-3 + " из 1";
						permission.deleteUser(args.args[3])
						return args.message.GM +"Успешно удален игрок " + args.args[3];
					break;
			}
			break;
		case "группа":
			switch(args.args[2]){
				case "список":
						return args.message.GM +"Список групп--"+permission.grouplist().join(" ");
					break;
				case "добавить":
					if(args.args.length < 4) return args.message.GM +"Недостаточно аргументов!"+args.args.length-3 + " из 2";
					let nick = args.args[3];
					let permissions = []
					try{
						permissions = eval(args.args[4])
						if(!Array.isArray(permission)) return args.message.GM +"Ошибка!";
					}catch{return args.message.GM +"Фатальня ошибка!";}
					if(args.args.length < 5)
						permission.writeGroup(nick,permission)
					else
						permission.writeGroup(nick,permission,args.args[5])
					return args.message.GM +"Успешно добавлено " + nick;
				case "удалить":
						if(args.args.length < 3) return args.message.GM +"Недостаточно аргументов!"+args.args.length-3 + " из 1";
						permission.deleteGroup(args.args[3])
						return args.message.GM +"Успешно удалена группа " + args.args[3];
					break;
			}
			break;
	}

});
PluginManager.add("блокировать",(args,bot)=>{
	permission.writeUser(args.args[1],"nil",[])
	return args.message.GM +"Успешно заблокирован " + args.args[1]
});

PluginManager.addhelp("права","игрок,группа");

PluginManager.addhelp("права игрок","список,добавить,удалить");
PluginManager.addhelp("права игрок список","список-список игроков в файле.Принимает ничего");
PluginManager.addhelp("права игрок добавить","добавить-добавить игрока в файл.1 аргумент ник(себя=твой ник).2 права(['biba','boba']),3 группа (см группа список)");
PluginManager.addhelp("права игрок удалить ","удаляет игрока из файла,1 аргумент ник");

PluginManager.addhelp("права группа","игрок,группа");
PluginManager.addhelp("права группа список","список-список групп в файле.Принимает ничего");
PluginManager.addhelp("права группа добавить","добавить-добавить группу в файл.1 аргумент название.2 права(['biba','boba']),3 родитель (см группа список)");
PluginManager.addhelp("права группа удалить ","удаляет группу из файла,1 аргумент название");
