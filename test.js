const path = require('path')
const fs = require('fs').promises
const { Schematic } = require('prismarine-schematic')
const { Vec3 } = require('vec3')
const size = {x:8,z:8}
let a = async()=>{
    //const schematic = await Schematic.read(await fs.readFile(path.resolve(__dirname, './schematics/' + "section.0.0" + '.schematic')));
    let dd = async (x,func)=>{
        if(x % 2 === 0)
            for(let z=size.z;z>=1;z--) func(x,z)
        else
            for(let z=1;z<=size.z;z++) func(x,z)
    }
    for (let x = 1; x <= size.x; x++) { 
        let b = "";
        dd(x,(x,z)=>{
            b+=z + " ";
            
        })
        console.log(b)
    }
}


let b = (action)=>{
    if(action === 1){
        return;
    }
}
console.log(b(2))
console.log(b(1))