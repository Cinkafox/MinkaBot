function check(bot,actions){
    bot.once('message',(message) =>{
        console.log("login:"+message.toString())
        actions.forEach(element => {
            if(message.toString() == element.message){
                if(typeof element.action === 'function'){
                    element.action()
                }else{
                    if(element.action == "rec")
                        return check(bot,actions);
                }
                return message.toString();
            }
        });
    });
}
function ss(bot){
    bot.once('windowOpen', (w) => {
        let ss;
        console.log(w.slots)
        for(let b = 0;b<w.slots.length;b++){
            //console.log(w.slots[b])
            if(w.slots[b] == null){
                ss=b;
                console.log("Find!")
                break;
            }
            if(w.slots[b].name === 'lime_stained_glass_pane'){
                ss=b;
                console.log("Find!")
                break;
            }
        }
        console.log(w.slots[ss])
        if(ss === undefined) return
        //bot.putAway(ss.slot);
        bot.clickWindow(ss,0,0);
        console.log("clicked")
        bot.closeWindow(w)
        
    });
}
function antbotchest(bot){
    let ss;
    let w = bot.currentWindow;
    console.log(w.slots)
    for(let b = 0;b<w.slots.length;b++){
        //console.log(w.slots[b])
        if(w.slots[b] == null){
            ss=b;
            console.log("Find!")
            break;
        }
        if(w.slots[b].name === 'lime_stained_glass_pane'){
            ss=b;
            console.log("Find!")
            break;
        }
    }
    console.log(w.slots[ss])
    if(ss === undefined) return
    //bot.putAway(ss.slot);
    bot.clickWindow(ss,0,0);
    console.log("clicked")
}

module.exports = {check,antbotchest,ss}