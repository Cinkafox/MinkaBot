const PluginManager = require("../libs/PluginManager");

const path = require('path')
const fs = require('fs').promises
const Bb = require("../libs/Build")
const { Schematic } = require('prismarine-schematic');
const { Vec3 } = require("vec3");


async function avi(bot,args){
  let task = []
  const schematic = await Schematic.read(await fs.readFile(path.resolve(__dirname, '../schematics/small-villa.schematic')), bot.version)
  const at = bot.entity.position.floored().offset(-schematic.start().x,-schematic.start().y,-schematic.start().z);
  const sa = new Bb(bot,schematic,at);
  console.log(schematic.start() + " " + schematic.end())
  for(let y = schematic.start().y;y<schematic.end().y;y++){
    for(let x = schematic.start().x;x<schematic.end().x;x++)
      for(let z = schematic.start().z;z<schematic.end().z;z++)
        task.push({"type":"build","pos":new Vec3(x,y,z)})

    console.log(task.length)
    task.sort((a, b) => {
      const dA = a.pos.offset(0.5, 0.5, 0.5).distanceSquared(bot.entity.position)
      const dB = b.pos.offset(0.5, 0.5, 0.5).distanceSquared(bot.entity.position)
      return dA - dB
    })
    while(task.length !=0){
      const ttsk = task[0];
      if(ttsk.type == "build"){
        await sa.placeV3(ttsk.pos);
        //if(sa.checkV3(ttsk.pos))
          task.splice(0,1);
      }
    }
  }
      
}

PluginManager.add("строй",(args,bot)=>{
  bot.chat("/gamemode creative");
  setTimeout(()=>{
    avi(bot,args.args);
  },300)
  
});
