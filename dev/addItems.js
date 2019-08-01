// function createItem(name, itemName) {
//  var idRegistry = "IDRegistry.genItemID(\"" + name.replace(" - Copy", '') + "\");" + "\nItem.createItem(\"" + name.replace(" - Copy", '') + "\", \"" + name.replace("_", ' ').replace(" - Copy", '') + " " + itemName + "\", {name: \"" + name + "\"}, {stack: 1});\n\n";
//  return idRegistry;
// }
// var files = FileTools.GetListOfFiles(__dir__ + "assets/items-opaque").sort();
// var dirs = FileTools.GetListOfDirs(__dir__ + "assets/items-opaque");
// FileAPI.create(__dir__, "file.json");
// var json = "";
// for (let i in dirs) {
//   var dir = FileTools.GetListOfFiles(dirs[i]).sort();
//   for (let u in dir) {
//     let name = dir[u].getName().toString().replace('.png', '');
//     let pathname = dir[u].getParent().toString().replace(__dir__ + "assets/items-opaque/", '');
//     json += createItem(name, pathname);
//   }
// }
// for (let i in files) {
//   json += createItem(files[i].toString().replace(__dir__ + "assets/items-opaque/", '').replace('.png', ''));
// }
// FileTools.WriteText(__dir__ + "file.json", json);
// function getFun(fun) {
//   let json = "";
//   for(let i in fun){
//     json += "\ni: "+i+"\n";
//     if (fun.i != undefined) json += "\n fun.i: " + fun.i + "\n";
//     // if (fun. != undefined) json += "\n fun.i: " + fun.i().toString()+"\n";
//   }
//   FileTools.WriteText(__dir__ + "file.json", json);
// }
// getFun(Item);