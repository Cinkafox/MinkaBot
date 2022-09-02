const readlineSync = require('readline-sync');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const print = (obj) => {console.log("Out:"+obj)}
let lets = {}
const regex = /\[(?<Pas>.*)\]:((\[(?<Sa>.*)\];(?<Me>.*))|(?<Sav>.*))/gm;
const str = `[start]:sap
             [start]:[stope];lets.name = readlineSync.question('May I have your name? ')
             [stope]:[start];(lets.name!=='sim') ? 'stop' : 'pip'
             [stope]:[printout];(lets.name!=='sim') ? 'pip' : 'stop'
             [printout]:GOOD BYE`;
let m = str.matchAll(regex)

let obje = {}

function append(name,obj,command = null){
    let appojb = obj
    if(command) appojb = {name:obj,args:command}
    if(!obje[name]) obje[name] = appojb
    else if(!Array.isArray(obje[name])){
        let tempname = obje[name]
        obje[name] = []
        obje[name].push(tempname)
        obje[name].push(appojb)
    }else obje[name].push(appojb)
}

async function comp(obj,name,root = false){
    let returnable;
    let obindex = obj[name];
    if(root) obindex = obje[name]
    if(Array.isArray(obindex)){
        returnable = []
        for (let index = 0; index < obindex.length; index++) {
            const rapa = await comp(obindex,index)
            if(Array.isArray(rapa)) returnable = returnable.concat(rapa)
            else returnable.push(rapa)
        }
    }
    else if(obindex?.name){
        let out = await eval(obindex.args)
        if(out !== "stop") returnable = await comp(obj,obindex.name,true)
    }
    else print(obindex)
    return returnable;
}

Array.from(m).forEach(m => {
    console.log(m.groups.Pas + " " + (m.groups.Sa ? (m.groups.Sa + " " + m.groups.Me) : m.groups.Sav))
    append(m.groups.Pas,m.groups.Sa ? m.groups.Sa : m.groups.Sav,m.groups.Me)
})

//comp(obje,"start")
let mik = {name:"Senko",time:"15:00"}
let pip = "hello %name %time"

function parsePlHolders(inp,obj){
    let parsed = inp
    while(parsed.split("%").length !=1){
        let sep = parsed.split("%")
        let index = sep[1].split(" ")[0]
        parsed = parsed.replace("%"+index,obj[index])
    }
    return parsed
}

parsePlHolders(pip,mik)


