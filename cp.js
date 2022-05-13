const permission = require('./libs/permissions')
var fs = require('fs');
function translit(str)
{
  var ru=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
  var en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
 	var res = '';
  for(var i=0, l=str.length; i<l; i++)
  { 
    var s = str.charAt(i), n = ru.indexOf(s); 
    if(n >= 0) { res += en[n]; } 
    else { res += s; } 
    } 
    return res;  
}
console.log(process.argv[2])
permission.addpermGroup(permission.defaultgrp,process.argv[2])
var stream = fs.createWriteStream("plugins/"+translit(process.argv[2])+".js");
stream.once('open', function(fd) {
  stream.write('const PluginManager = require("../libs/PluginManager");\n\nPluginManager.add("'+ process.argv[2] +'",(args,bot)=>{\n\tbot.chat(args.message.NICK);\n});\n');
  stream.end();
});

