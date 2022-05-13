const fs = require("fs");
const path = require("path");

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    require(module);
}

class PluginManager{
    bot
    plugins = {}
    onChat = []
    help = {}
    execute(name){
        if(this.plugins[name] != undefined) return this.plugins[name]
        return undefined
    }
    executeChat(message){
        this.onChat.forEach((f)=>{
            f(message)
        })
    }
    /**
     * выполняемая функция
     * @callback functas
     * @param {{args:[String],message:{GM:String,NICK:String,MESSAGE:String}}} args
     * @param {import('mineflayer').Bot} bot 
     */
    /**
     * Добавление функции
     * @param {String} name 
     * @param {functas} funct
     */
    add(name,funct){
        this.plugins[name] = funct
    }
    addhelp(name,text){
        this.help[name]=text;
    }
    /**
     * выполняемая функция
     * @callback functas1
     * @param {{GM:String,NICK:String,MESSAGE:String}} message
     */
    /**
     * выполнение при вводе чата
     * @param {functas1} funct 
     */
    addChat(funct){
        this.onChat.push(funct)
    }
    remove(name){
        if(this.plugins[name])
            delete this.plugins[name]
        else{
            const index = this.onChatT.indexOf(name);
            if (index > -1) {
                this.onChatT.splice(index, 1); 
            }
        }
    }
    loadFromDir(dir){
        this.onChat = []
        const normalizedPath = path.join(__dirname, dir);
        fs.readdirSync(normalizedPath).forEach(function (file) {
            try {
                console.log("Loading " + file)
                requireUncached(dir+"/"+file)
            }catch(e){
                console.log(e)
            }
        });
    }

}

module.exports = new PluginManager()

