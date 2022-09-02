const sleep = ms => new Promise(r => setTimeout(r, ms));
async function waitPlayer(nick){
   console.log("sasa")
   await sleep(1500)
   console.log("baba")
}

waitPlayer("sa")