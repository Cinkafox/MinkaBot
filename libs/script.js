class Script{
    variables = {};
    actions = {};
    regex = /\[(?<Pas>.*)\]\|((\[(?<Sa>.*)\];(?<Me>.*))|(?<Sav>.*))/gm;
    text = ""
    print;
    sleep = ms => new Promise(r => setTimeout(r, ms));


    constructor(text = null,variables = {},print = console.log){
        this.variables = variables;
        this.print = print
        if(text) this.parseTextCommand(text)
    }

    parseTextCommand(text){
        let m = text.matchAll(this.regex)
        Array.from(m).forEach(m => {
            this.append(m.groups.Pas,m.groups.Sa ? m.groups.Sa : m.groups.Sav,m.groups.Me)
        })
        this.text = this.text + text + "\n"
    }
    append(name,obj,command = null){
        let secondobj = obj
        if(command) secondobj = {name:obj,args:command}
        if(!this.actions[name]) this.actions[name] = secondobj
        else if(!Array.isArray(this.actions[name])){
            let tempname = this.actions[name]
            this.actions[name] = []
            this.actions[name].push(tempname)
            this.actions[name].push(secondobj)
        }else this.actions[name].push(secondobj)
    }
    async run(){
        await this._run(this.actions,"start")
    }
    
    async _run(obj,name,root = false){
        let actionIndex = obj[name];
        if(root) actionIndex = this.actions[name]
        if(Array.isArray(actionIndex)){
            for (let index = 0; index < actionIndex.length; index++) {
                await this._run(actionIndex,index)
            }
        }
        else if(actionIndex?.name){
            let out = await eval(this.parsePlHolders(this.pasteHolder(actionIndex.args)))
            if(typeof out == "string") this.print(out)
            if(out !== "stop") await this._run(obj,actionIndex.name,true)
        }
        else{
            if(!actionIndex) throw (name + " is undefined!")
            let pas = this.parsePlHolders(this.pasteHolder(actionIndex))
            console.log(pas)
            let out = await eval(pas)
            if(typeof out == "string") this.print(out)
        }
    }
    parsePlHolders(inp){
        let parsed = inp
        while(parsed.split("%").length !=1){
            let sep = parsed.split("%")
            let index = sep[1].split(" ")[0]
            parsed = parsed.replace("%"+index,this.variables[index])
        }
        return parsed
    }
    pasteHolder(inp){
        let parsed = inp
        while(parsed.split("$").length !=1){
            let sep = parsed.split("$")
            let index = sep[1].split(" ")[0]
            parsed = parsed.replace("$"+index,"this.variables."+ index +"")
        }
        return parsed
    }
}
module.exports = Script;