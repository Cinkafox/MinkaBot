const PluginManager = require("../libs/PluginManager");

const path = require('path')
const fs = require('fs').promises
const Build = require("../libs/Build")
const { Schematic } = require('prismarine-schematic');
const interactable = require('../libs/interactable.json')
const facingData = require('../libs/facingData.json')
const forbitten = require('../libs/forbittenitems.json')
const { Vec3 } = require("vec3");
const Block = require('prismarine-block')(PluginManager.bot.version)
const mcData = require('minecraft-data')(PluginManager.bot.version)
const Item = require('prismarine-item')(PluginManager.bot.version);

function getObjFace(obj){
  if(obj.west){
    return "west"
  }
  if(obj.south){
    return "south"
  }
  if(obj.north){
    return "north"
  }
  if(obj.east){
    return "east"
  }
  if(obj.up){
    return "up"
  }
  if(obj.down){
    return "down"
  }
  return undefined
}

function FaceFromP(facing){
  if (facing === 'north') return new Vec3(0, 0, 1);
  else if (facing === 'south') return new Vec3(0, 0, -1);
  else if (facing === 'west') return new Vec3(1, 0, 0);
  else if (facing === 'east') return new Vec3(-1, 0, 0);
  else if (facing === 'up') return new Vec3(0, -1, 0);
  else if (facing === 'down') return new Vec3(0, 1, 0);
  else if (facing === null) return null;
}

async function equipItem (bot,id) {
  if (bot.inventory.items().length > 30) {
    await bot.creative.clearInventory();
  }
  if (!bot.inventory.items().find(x => x.type === id)) {
    const slot = bot.inventory.firstEmptyInventorySlot()
    await bot.creative.setInventorySlot(slot !== null ? slot : 36, new Item(id, 1))
  }
  const item = bot.inventory.items().find(x => x.type === id)
  await bot.equip(item, 'hand')
}

async function avi(bot,name){
  let schematic ;
	try{
		schematic = await Schematic.read(await fs.readFile(path.resolve(__dirname, '../schematics/' + name + '.schematic')), bot.version);
	}catch{
		return "Не найдена схема!";
	}
  const at = bot.entity.position.floored().offset(-schematic.start().x,-schematic.start().y,-schematic.start().z)
  const build = new Build(schematic, bot.world, at)
  let lasty = 0
  let success = true
  while (build.actions.length > 0) {
    const actions = build.getAvailableActions()
    if (actions.length === 0) {
      console.log('Ааа блять нихуя нема')
      break
    }
    actions.sort((a, b) => {
      if (a.pos.y !== b.pos.y) {
        return a.pos.y > b.pos.y ? 1 : -1
      } else {
        if(build.properties[a.state]?.face){
           return 1
        }
        const p = bot.entity.position.offset(-0.5, 0, -0.5)
        return p.distanceTo(a.pos) > p.distanceTo(b.pos) ? 1 : -1
      }
    })
    const action = actions[0]
    try {
      if (action.type === 'place') {
        if(bot.world.getBlock(action.pos).name !== "air" && false) {
          build.removeAction(action)
          continue;
        }
        if(action.pos.y < lasty){
          build.removeAction(action)
          continue;
        }
        const item = build.getItemForState(action.state)
        const properties = build.properties[action.state]
        console.log('Selecting ' + item?.displayName + " " + action.state)
        if(item == undefined || (forbitten.indexOf(item.name) > 0) || (properties.part == "head")) {
          build.removeAction(action)
          continue;
        }
        const half = properties.half ? properties.half : properties.type
        let face = new Vec3(0,-1,0);
        const faces = build.getPossibleDirections(action.state, action.pos)
        
        rfc = FaceFromP(properties.facing);
        let sabam = FaceFromP(getObjFace(properties))?.scaled(-1)
        rfc = rfc ? rfc : sabam
        const blockin = build.blocks[action.state]
        const data = facingData[blockin.name]
        face = faces[0]

        if(data?.inverted){
          rfc = rfc.scaled(-1);
        }
       /*
        for (const fc of faces) {
          if(properties.face == "wall")
          if(fc.y == 0){
            face = fc
          }
        }
        */

        flyface = rfc ? rfc : faces[0]
        if(properties.face == "wall" || properties.west !== undefined)
        face=flyface
        

        await equipItem(bot,item.id)
        const mans = 1
        const to = action.pos
        let bpos = to.minus(new Vec3(flyface.x*mans,flyface.y-1,flyface.z*mans))
        if(face.y == 1){
          bpos = bpos.offset(0,-3,0)
        }

        const ref = to.plus(face)
        const refBlock = bot.blockAt(ref)


        if(refBlock.name == "air"){
          build.removeAction(action)
          continue;
        }
        console.log(refBlock.name)
        const sneak = interactable.indexOf(refBlock.name) > 0
        const delta = to.minus(ref)
        console.log("-------------------"," ",rfc," ",face," ",data?.faceDirection," ",data?.inverted)
        console.log("-=-=-="+action.pos.y," ",lasty)
        //if(action.pos.y < lasty) await bot.chat("/gamemode 3")
        await bot.creative.flyTo(bpos.offset(0.5,0.5,0.5))
        //if(action.pos.y < lasty) await bot.chat("/gamemode 1")

        if (sneak) bot.setControlState('sneak', true)
        console.log(success + "-======================" + JSON.stringify(properties))
        await bot._placeBlockWithOptions(refBlock, face.scaled(-1), { half , swingArm: 'right', forceLook:(properties.facing==undefined)})
        if (sneak) bot.setControlState('sneak', false)

        const block = bot.world.getBlock(action.pos)
        if(properties.open){
          bot.activateBlock(block)
        }

        if (block.stateId !== action.state) {
          console.log('Ждали', properties)
          console.log('Пососали', block.getProperties())
        }
        blprop = block.getProperties()
        if(properties.facing != blprop.facing){
          console.log("РЕАЛЬНА ПОПОСАЛИ ЫЫ")
          success = false
          continue
        }
        console.log("to",to," ref",ref," bpos",bpos," refblock",refBlock," sneak",sneak," delta",delta," face",face)
        build.removeAction(action)
        lasty = action.pos.y;

        success = true
      }else{
        console.log("dig")
        if(bot.world.getBlock(action.pos).name != "air")
        await bot.dig(bot.world.getBlock(action.pos))
        build.removeAction(action)
      }
    } catch (e) {
      success = false
      if(bot.world.getBlock(action.pos).name != "air" && bot.world.getBlock(action.pos).name != "red_bed")
      await bot.dig(bot.world.getBlock(action.pos))
      console.log(e)
    }

  }
}
  
PluginManager.add("строй",(args,bot)=>{
  bot.chat("/gamemode creative");
  if(args.args[1] == undefined) return args.message.GM + "Недостаточно аргументов!"
  setTimeout(()=>{
    avi(bot,args.args[1]);
  },300)
  
  
});
