const fs = require('fs');
const defaultusr = "default";
const defaultgrp = "users"
//опа права епта!
let readFile = () => {
    let obj = JSON.parse(fs.readFileSync('permission.json'));
    return obj;
}
let writeFile = (obj) => {
    fs.writeFileSync("permission.json",JSON.stringify(obj));
}
let readUser = (nick) => {
    let obj = readFile();
    let player = obj.users[nick];
    if(player == null) player = obj.users.default;
    return player.perms.concat(readGroup(player.group).perms);
}
let readGroup = (group) => {
    let obj = readFile();
    let Grp = obj.groups[group];
    if(Grp == null) Grp = obj.groups.nil
    if(Grp.parent !=null)
    Grp.perms = Grp.perms.concat(readGroup(Grp.parent).perms);
    return Grp;
}

let writeUser = (nick,perms = [],group = defaultgrp) => {
    let obj = readFile();
    obj.users[nick] = {group,perms}
    writeFile(obj)
}

let writeGroup = (group,perms = [],parent = "") =>{
    let obj = readFile();
    obj.groups[group] = {parent,perms}
    writeFile(obj)
}

let userlist = ()=>{
    let obj = readFile();
    return Object.keys(obj.users)
}

let grouplist = ()=>{
    let obj = readFile();
    return Object.keys(obj.groups)
}

let deleteGroup = (group) => {
    let obj = readFile();
    delete obj.groups[group]
    writeFile(obj)
}

let deleteUser = (user) => {
    let obj = readFile();
    delete obj.users[user]
    writeFile(obj)
}

let addpermGroup = (group,perm)=>{
    let obj = readFile();
    if(obj.groups[group].perms.indexOf(perm) == -1){
        obj.groups[group].perms.push(perm)
        writeFile(obj)
    }
}

let addpermUser = (nick,perm)=>{
    let obj = readFile();
    if(obj.users[nick].perms.indexOf(perm) == -1){
        obj.users[nick].perms.push(perm)
        writeFile(obj)
    }
}

let check = (arr,elem) =>{
    return (arr.indexOf(elem) !== -1);
}
module.exports = {check,writeGroup,writeUser,readGroup,readUser,userlist,grouplist,deleteUser,deleteGroup,addpermGroup,addpermUser,defaultgrp,defaultusr}