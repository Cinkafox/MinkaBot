const PluginManager = require("../libs/PluginManager");
const path = require('path');
const fs = require('fs').promises;
const fss = require('fs');
const { Schematic } = require('prismarine-schematic');
const { Vec3 } = require('vec3');
const http = require('https');
const mcData = require('minecraft-data')(PluginManager.bot.version);
const Item = require('prismarine-item')(PluginManager.bot.version);
const registry = require('prismarine-registry')(PluginManager.bot.version);
const Block = require('prismarine-block')(registry);
const size = { x: 128, z: 128 };
const normalizedPath = path.join(__dirname, "../schematics");
const erbl = 6;


let equip = async (blockName, bot) => {
	switch (blockName) {
		case "air":
			blockName = "glass";
			break;
		case "brewing_stand":
			blockName = "stone";
			break;
		case "ice":
			blockName = "stone";
			break;
	}
	let equipBlock = bot.inventory.findInventoryItem(blockName);
	if (!equipBlock) {
		let item = new Item(mcData.itemsByName[blockName].id, 1);
		await bot.creative.clearSlot(36)
		await bot.creative.setInventorySlot(36, item);
		equipBlock = bot.inventory.findInventoryItem(item.name);
	}
	return equipBlock;
}

let b = async (bot,ictl,name) => {
	let schematic ;
	try{
		schematic = await Schematic.read(await fs.readFile(path.resolve(__dirname, '../schematics/' + name + '.schematic')), bot.version);
	}catch{
		bot.chat("Не найдена схема!");
		return "Не найдена схема!";
	}
	const ta = bot.entity.position.floored();
	const at = ta.offset(0.5, 0, 0.5);



	let dd = async (x,zz, func) => {
		if (!(x % 2 === 0))
			for (let z = size.z - 1 - zz; z >= 0; z--) {
				let o = await func(x, z);
				if(o){
					if (o[0] === "obr") z+=(2+o[1])
					if (o[0] === "brk") break;
				}
			}
		else
			for (let z = 1 + zz; z <= size.z - 1; z++) {
				let o = await func(x, z);
				if(o){
					if (o[0] === "obr") z-=(2+o[1])
					if (o[0] === "brk") break;
				}
			}
	}
	
	for (let x = ictl; x < size.x; x++) {
		let bool = (x % 2 === 0);
		let num = Number(!bool);
		let ber = Number(bool);
		let funct = async (x, z) => {
			let equiper = await equip(schematic.getBlock(new Vec3(x + 1, 2, z + 1)).name, bot);
			await bot.equip(equiper, "hand");
			let face = new Vec3(0, 0, (1 - 2 * num));
			let px = x;
			let fl = 'ignore'
			let refpos = ta.offset(px, 1, z - (1 - 2 * num))
			//let refblock = bot.blockAt(refpos);
			let refblock = bot.world.getBlock(refpos)
			if((z*ber+(size.z-z)*num)>erbl && (bot.blockAt(ta.offset(x, 1, z - (1 - 2 * num)*erbl)) != undefined && bot.blockAt(ta.offset(x, 1, z - (1 - 2 * num)*erbl)).name === "air")){
				console.log("proebanno,nazad")
				return ["obr",erbl]
			}
			
			console.log("Placepos:"+refpos + " BotPos:"+ bot.entity.position + " " + refblock.name)
			await bot._genericPlace(refblock, face, { swingArm: 'right', forceLook: fl })
			await bot.creative.flyTo(at.offset(x, 0, z + (2 - 4 * num)))
	
		}

		await bot.creative.flyTo(at.offset(1 + x + 0.1, 0, (size.z - 1) * num + (2 - 4 * num)))
		await bot.look((45 + 90 * num) * Math.PI / 180, 0)
		let equiper = await equip(schematic.getBlock(new Vec3(x + 1, 2, (size.z - 1) * num + 1)).name, bot);
		await bot.equip(equiper, "hand");
		await bot._genericPlace(bot.blockAt(ta.offset(x - 1, 1, (size.z - 1) * num)), new Vec3(1, 0, 0), { swingArm: 'right', forceLook: 'ignore' })
		console.log(bot.blockAt(ta.offset(x - 1, 1, (size.z - 1) * num)).name + " " + ta.offset(x - 1, 1, size.z * num))
		if(bot.blockAt(ta.offset(x-1, 1, (size.z - 1) * num)).name == "air"){
			x-=1;
			await bot._genericPlace(bot.blockAt(ta.offset(x - 1, 1, (size.z - 1) * num)), new Vec3(1, 0, 0), { swingArm: 'right', forceLook: 'ignore' })
			continue;
		}
		vb = 0;
		await bot.creative.flyTo(at.offset(x, 0, (size.z - 1) * num + (2 - 4 * num)))
		await bot.look(180 * num * Math.PI / 180, 0)
		await dd(x,0, funct)
		//console.log(at.offset(x + 1, 0, size.z * Number(bool) - (1 - 2 * Number(bool)) * 2) + bool)
		await bot.creative.flyTo((at.offset(x + 1, 0, size.z * Number(bool) - (1 - 2 * Number(bool)) * 2)))
	}
}

PluginManager.add("арт", (args, bot) => {
	bot.chat("/gamemode creative");
	let num = 0
	if(args.args[2] == undefined) return args.message.GM + "Недостаточно аргументов!"
	if(args.args[3]!== undefined)
	num = Number(args.args[3])
	b(bot,num,args.args[2])
	
});
PluginManager.addhelp("арт","Строим арты! 1) название схемы 2)с какого блока начать (необязательно)");

PluginManager.add("схема",(args, bot) => {
	switch(args.args[2]){
		case "список":
			let output = "";
			fs.readdirSync(normalizedPath).forEach(function (file) {
				output = output + file + " и ";
			});
			bot.chat(args.message.GM+ "Файлы в схемах - " + output);
			break;
		case "скачать":
			console.log(args.args[3] + args.args[4])
			var file = fss.createWriteStream(normalizedPath + "/" + args.args[3] + ".schematic");
			var request = http.get(args.args[4], function(response) {
				response.pipe(file);
				file.on('finish', function() {
					bot.chat(args.message.GM + "Готово");
					file.close();
				  });

			});
		
			break;
	}
})
PluginManager.addhelp("схема","список,скачать");
PluginManager.addhelp("схема список","Выводит список схематик,не требует аргументов");
PluginManager.addhelp("схема скачать","скачивает схематику и сохраняет в файл.1)название схемы 2) ссылка")


