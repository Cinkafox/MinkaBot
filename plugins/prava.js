const PluginManager = require("../libs/PluginManager");
const permission = require("../libs/permissions")

PluginManager.add("права",(args,bot)=>{
	switch(args.args[1]){
		case "игрок":
			switch(args.args[2]){
				case "список":
					return args.message.GM +"Список пользователей--"+permission.userlist().join(" ");
				case "добавить":
					try{
						let nick = args.args[3]
						if(nick == "себя") nick = args.message.NICK
 						const perms = eval(args.args[4])
						const group = args.args[5]
						if(!nick || !perms) return "недостаточно аргументов!"
						if(!Array.isArray(perms)) return args.message.GM + "Неверно введено массив!"
						permission.writeUser(nick,perms,group)
						return args.message.GM +"Успешно добавлено " + nick;
					}catch{
						return args.message.GM + "Ошибка!"
					}
				case "удалить":
						permission.deleteUser(args.args[3])
						return args.message.GM +"Успешно удален игрок " + args.args[3];
			}
			break;
		case "группа":
			switch(args.args[2]){
				case "список":
					return args.message.GM +"Список групп--"+permission.grouplist().join(" ");
				case "добавить":
					try{
						const group = args.args[3]
						const perms = eval(args.args[4])
						const parent = args.args[5]
						if(!group || !perms) return "недостаточно аргументов!"
						if(!Array.isArray(perms)) return args.message.GM + "Неверно введено массив!"
						permission.writeGroup(group,perms,parent)
						return args.message.GM +"Успешно добавлено " + group;
					}catch{
						return args.message.GM + "Ошибка!"
					}
				case "удалить":
					permission.deleteGroup(args.args[3])
					return args.message.GM +"Успешно удалена группа " + args.args[3];
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
