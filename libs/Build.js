const { Vec3 } = require('vec3')
let mcData;
let Item;
class Build{
    bot;
    schematic;
    at;
    constructor(bot,schematic,at){
        this.bot = bot;
        this.schematic = schematic;
        this.at = at;
        mcData = require('minecraft-data')(bot.version);
        Item = require('prismarine-item')(bot.version);
    }

    getPossibleFace(x,y,z){
        if(this.bot.blockAt(this.at.offset(x-1,y,z)).name !== "air") return new Vec3(1,0,0)
        if(this.bot.blockAt(this.at.offset(x+1,y,z)).name !== "air") return new Vec3(-1,0,0)
        if(this.bot.blockAt(this.at.offset(x,y,z-1)).name !== "air") return new Vec3(0,0,1)
        if(this.bot.blockAt(this.at.offset(x,y,z+1)).name !== "air") return new Vec3(0,0,-1)
        return new Vec3(0,1,0)
    }

    async fr (x, y, func){
		if ((x % 2 === 0))
			for (let z = this.schematic.end().z - 1; z >= this.schematic.start().z-1; z--) {
				let o = await func(x,y, z);
				if (o === "obr") z+=(2+erbl)
				if (o === "brk") break;
			}
		else
			for (let z = this.schematic.start().z; z <= this.schematic.end().z - 1; z++) {
				let o = await func(x,y, z);
				if (o === "obr") z-=(2+erbl)
				if (o === "brk") break;
			}
	}

    async equipBlock (blockName) {
        let equipBlock = this.bot.inventory.findInventoryItem(blockName);
        if (!equipBlock) {
            let item = new Item(mcData.itemsByName[blockName].id, 1);
            await this.bot.creative.clearSlot(36)
            await this.bot.creative.setInventorySlot(36, item);
            equipBlock = this.bot.inventory.findInventoryItem(item.name);
        }
        return equipBlock;
    }

    async placeWithFace(x,y,z,face){
        let blck = this.schematic.getBlock(new Vec3(x, y, z)).name
        if(blck == "air") return;
        let equiper = await this.equipBlock(blck);
		await this.bot.equip(equiper, "hand");
        await this.bot.creative.flyTo(this.at.offset(x+face.x+0.5,y+face.y+1,z+face.z+0.5))        
        await this.bot.look((90*face.x + 180*face.z*Number(face.z == -1)) * Math.PI / 180, -2*face.y-Number(face.y == 0))
        await this.bot._genericPlace(this.bot.blockAt(this.at.offset(x-face.x,y-face.y,z-face.z)), face, { swingArm: 'right', forceLook: 'ignore' })
    }

    async place(x,y,z){
        console.log(x, " " , y ," ",z)
        await this.placeWithFace(x,y,z,this.getPossibleFace(x,y,z))
    }
}

module.exports = Build