const PluginManager = require("../libs/PluginManager");

const path = require('path')
const fs = require('fs').promises
const Bb = require("../libs/Build")
const { Schematic } = require('prismarine-schematic');
const { Vec3 } = require("vec3");


async function avi(bot,args){
  const schematic = await Schematic.read(await fs.readFile(path.resolve(__dirname, '../schematics/H6.schematic')), bot.version)
  const at = bot.entity.position.floored().offset(schematic.start().x,schematic.start().y,schematic.start().z);
  const sa = new Bb(bot,schematic,at);
  console.log(schematic.start() + " " + schematic.end())
  for(let y = schematic.start().y;y<schematic.end().y;y++)
    for(let x = schematic.start().x;x<schematic.end().x;x++)
      await sa.fr(x,y,async (x,y,z)=>{
        await sa.place(x,y,z)
      })
}

PluginManager.add("строй",(args,bot)=>{
  bot.chat("/gamemode creative");
  avi(bot,args.args);
});
