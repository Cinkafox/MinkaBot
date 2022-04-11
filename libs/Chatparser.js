let regex = /«(?<G>.*)» \| (.(.*?).){0,1} .(.*?). (?<Nick>.*?) ➥ (?<Chat>.*)|\[.*? (?<NickL>.*?) -> я\] (?<ChatL>.*)/gm;
let global = "Ⓖ";

let setEnv = (regex1,global1)=>{
    regex = regex1
    global = global1
}
let parse = (rawtext) => {
    
    let m = rawtext.matchAll(regex)
    m = Array.from(m)[0];
    if(m == null) return;
    switch(m.groups["G"]){
        case undefined:
        case null:
            return {NICK:m.groups["NickL"],MESSAGE:m.groups["ChatL"],GM:'/er '}
        case global:
            return {NICK:m.groups["Nick"],MESSAGE:m.groups["Chat"].trim(),GM:"!"}  
        default:
            return {NICK:m.groups["Nick"],MESSAGE:m.groups["Chat"].trim(),GM:""}
    }
}

module.exports={parse,setEnv};