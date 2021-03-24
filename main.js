/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 23
*/



// file: Api/Logger_2.0.js

var Str = java.lang.String,
	firstStart = __config__.getBool("firstStart");
function endFont() {
	return "</font>";
}
function font(color, size) {
	return "<font size='" + size + "' color='" + color + "'>"
}
Logger.nativeLogger = java.lang.Class.forName("zhekasmirnov.launcher.api.log.DialogHelper", true, UI.getContext().getClass().getClassLoader()),
	Logger.formateLog = Logger.nativeLogger.getMethod("getFormattedLog");
Logger.showLog = function (type) {
	Logger.nativeLogger.getMethod("openFormattedDialog", Str, Str).invoke(null, Logger.formateLog.invoke(null), (type == 'error' ? 'Mod ERROR' : "Full InnerCore Log:"));
}
function Log(message, prefix, color1, color2) {
	var p = '', m = '', color = [
		(endFont() + font("#777777")),
		(color1 ? endFont() + font(color1) : ''),
		(color2 ? endFont() + font(color2, 5) : '')
	];
	if (Array.isArray(message))
		for (let i in message)
			m += message[i] + (i != (message.length - 1) ?
				(color[0] + ', ' + color[1]) : (color[0] + ';'));
	else m = message;

	if (Array.isArray(prefix))
		for (let i in prefix)
			p += ' ' + prefix[i] + (i != (prefix.length - 1) ?
				(color[0] + " ] -•- [ " + color[2]) : ' ');
	else p = ' ' + prefix + ' ';

	Logger.Log(color[1] + (m ? m : "Log Message"), color[2] + (p ? p : "Log Prefix") + color[0]);
}
function LogWarning(err, message, prefix, line) {
	if (line && err) prefix.push(err.fileName + '#' + err.lineNumber)
	Log(message, prefix, '#f9A602', '#f9A602')
}
function LogError(err, prefix, line) {
	Log(line ? [err.fileName + '#' + err.lineNumber, err.message] : err.message, prefix, '#ff0000', '#ff0000')
	Logger.showLog('error');
}
var log = Log;
Callback.addCallback("NativeCommand", function (str) {
	if (str == '/log') {
		Game.prevent()
		Logger.showLog()
	}
});
// Debug.debugThis(function(){
	// Log(['Message 1', 'Message 2', 'Message 3'], ['Prefix 1', 'Prefix 2', 'Prefix 3'], '#ffaa00', '#376e75');
	// Log(null, null, 'ffaa00', '#376e75')
// });
// Logger.showLog();




// file: Api/AndroidCore.js





// file: header.js

IMPORT("Translate")
importLib("CIM", '*')
IMPORT("Inventory")
IMPORT("Bow")
importLib("EffectAPI", '*')
IMPORT("EntityState")
IMPORT("NativeAPI")
IMPORT("TileRender")
IMPORT("Vector", "*")
IMPORT("StructuresAPI")
//Added colors

function WIP() {
	Game.message(Translate("Work in Progress"));
}
var t = Translate;
t('assets/translations/other.json', true);
t('assets/translations/ingredients.json', true);
function getInformation() {
	return {
		name: "Divine Favor",
		author: "TooManyMods",
		version: "0.6.3",
		description: "Magic, spirits and other..."
	};
};

var NetworkReader = {
	readText: function (url) {
		var reader = new java.io.BufferedReader(new java.io.InputStreamReader(java.net.URL(url).openStream(), "UTF-8"));
		var text = "";
		var temp = "";
		while ((temp = reader.readLine()) != null) {
			text += temp;
		}
		reader.close();
		return text;
	}
};
function getEntityInRad(x, y, z, radius, entityID) {
	let entities = Entity.getAll();
	for (let i in entities) {
		let ent = entities[i];
		if (Entity.getType(ent) == entityID) {
			let c = Entity.getPosition(ent);
			let xx = Math.abs(x - c.x), yy = Math.abs(y - c.y), zz = Math.abs(z - c.z);
			if (Math.sqrt(xx * xx + yy * yy + zz * zz) <= radius) {
				return true;
			}
		}
	}
}
function getBlockInRad(x, y, z, radius, id, data) {
	for (var x1 = -radius; radius >= x1; x1++)
		for (var y1 = -radius; radius >= y1; y1++)
			for (var block, z1 = -radius; radius >= z1; z1++) {
				block = (World.getBlock(x + x1, y + y1, z + z1).id == id && World.getBlock(x + x1, y + y1, z + z1).data == data);
				if (block) return block;
			}
}

new java.lang.Thread(new java.lang.Runnable({
	run: function () {
		try {
			var githubVer = NetworkReader.readText("https://raw.githubusercontent.com/ToxesFoxes/DivineFavor/master/mod.info"), // Client side info
				curVer = getInformation().version,
				obj = eval('var ver=' + githubVer);
			version = ver["version"];
			if (curVer === version) obj = t("No update found");
			else obj = t("Please update to new version - ") + endFont() + font("#000000") + obj;
			Log(obj, [__name__, 'Updater'], "#66ff00", "#0066ff");
		} catch (error) {
			var re = /No address associated with hostname/g;
			if (re.exec(error))
				LogWarning(error, t("Can't connect to the internet, check your Internet connection"), __name__, false)
			else
				LogError(error, [__name__, 'Updater', 'Error'])
			// for(let i in error)Log([i, error[i]], 'Text');
			// error return lineNumber - fileName - message - забыл
		}
	}
})).start();




// file: Api/FileApi.js

/*
	(╯°□°）╯︵ ┻━┻
*/
var File = java.io.File;
var FileReader = java.io.FileReader;
var BufferedReader = java.io.BufferedReader;
var FOS = java.io.FileOutputStream;
var String = java.lang.String;
var StringBuilder = java.lang.StringBuilder;
var sdcard = android.os.Environment.getExternalStorageDirectory();
var FileAPI = {
	getName: function(dir) {
		let name = new File(dir).name;
		return (name.replace('.png', ''));
	},
	select: function(dir, Name) {
		return (new File(dir, Name));
	},
	createNewDir: function(dir, newDirName) {
		return (new File(dir, newDirName).mkdir());
	},
	exists: function(file) {
		return file.exist();
	},
	create: function(path, name) {
		new File(path, name).createNewFile();
		return File;
	},
	deleteF: function(path) {
		try {
			var filed = new java.io.File(path);
			if(filed.isDirectory()) {
				var directoryFiles = filed.listFiles();
				for(var i in directoryFiles) {
					FileAPI.deleteF(directoryFiles[i].getAbsolutePath());
				}
				filed.deleteF();
			}
			if(filed.isFile()) {
				filed.deleteF();
			}
		} catch(e) {
			print(e);
		}
	},
	read: function(selectedFile) {
		var readed = (new BufferedReader(new FileReader(selectedFile)));
		var data = new StringBuilder();
		var string;
		while((string = readed.readLine()) != null) {
			data.append(string);
			data.append('\n');
		}

		return data.toString();
	},
	readLine: function(selectedFile, line) {
		var readT = new FileAPI.read(selectedFile);
		var lineArray = readT.split('\n');
		return lineArray[line - 1];
	},
	write: function(selectedFile, text) {
		FileAPI.rewrite(selectedFile, (new FileAPI.read(selectedFile)) + text);
	},
	rewrite: function(selectedFile, text) {
		var writeFOS = new FOS(selectedFile);
		writeFOS.write(new String(text).getBytes());
	},
	getFilesList: function(path, endsWith) {
		var c = [], d = (new java.io.File(path)).listFiles();
		for(var e = 0; e < d.length; e++) {
			var f = d[e];
			f.isDirectory() || endsWith && !f.getName().endsWith(endsWith) || c.push(f.getName())
		}
		return c
	},
	//my
	filesIfIsDirectory: function(path) {
		var files = new java.io.File(path);
		if(files.isDirectory()) {
			return files.listFiles();
		}
	},
	checkDir: function(name) {
		for(let i in name) {
			if(FileTools.isExists(__dir__ + name[i]) == false)
				FileAPI.createNewDir(__dir__, name[i]);
		}
	},
	list: function(dir) {
		let list = [];
		for(let i in dir) {
			list.push(FileTools.GetListOfFiles(__dir__ + dir[i]));
		}
		return list;
	},
	getFilesCount: function(list) {
		let count = 0;
		for(let i in list) count++;
		return count;
	},
	getGuiItems: function(gui) {
		let count = 0;
		for(let i in gui.elements) {
			if(gui.elements[i] != null) { count++; }
		}
		if(count > 0) return true; else return false;
	}
};
/*
	┬─┬ノ( º _ ºノ)
*/




// file: Api/SpiritTradeTalisman.js

var Spirit = {
	creatve: false,
	TYPE: {
		"ARBOW": 0, 0: "ARBOW",
		"BLIZRABI": 1, 1: "BLIZRABI",
		"ENDERERER": 2, 2: "ENDERERER",
		"LOON": 3, 3: "LOON",
		"MATERIA": 4, 4: "MATERIA",
		"NEBLAZE": 5, 5: "NEBLAZE",
		"REDWIND": 6, 6: "REDWIND",
		"ROMOL": 7, 7: "ROMOL",
		"SQUAREFURY": 8, 8: "SQUAREFURY",
		"TIMBER": 9, 9: "TIMBER"
	},
	CALLING_STONES: {
		"calling_stone_arbow": 0, 0: "calling_stone_arbow",
		"calling_stone_blizrabi": 1, 1: "calling_stone_blizrabi",
		"calling_stone_endererer": 2, 2: "calling_stone_endererer",
		"calling_stone_loon": 3, 3: "calling_stone_loon",
		"calling_stone_materia": 4, 4: "calling_stone_materia",
		"calling_stone_neblaze": 5, 5: "calling_stone_neblaze",
		"calling_stone_redwind": 6, 6: "calling_stone_redwind",
		"calling_stone_romol": 7, 7: "calling_stone_romol",
		"calling_stone_squarefury": 8, 8: "calling_stone_squarefury",
		"calling_stone_timber": 9, 9: "calling_stone_timber"
	},
	MEDIUMS: {
		0: "medium_gold",
		1: "medium_lapis",
		2: "medium_iron",
		3: "medium_gold",
		4: "medium_gold",
		5: "medium_obsidian",
		6: "medium_redstone",
		7: "medium_iron",
		8: "medium_gold",
		9: "medium_log"
	},
	RECIPES: {},
	INFO: [// time [start, end], status[builded, trading, active], energy[current, max]
	/*0*/	{ time: [11, 15], status: [false, false, false], energy: [50, 50] },
	/*1*/	{ time: [14, 18], status: [false, false, false], energy: [50, 50] },
	/*2*/	{ time: [19, 23], status: [false, false, false], energy: [50, 50] },
	/*3*/	{ time: [1, 4], status: [false, false, false], energy: [50, 50] },
	/*4*/	{ time: [5, 9], status: [false, false, false], energy: [50, 50] },
	/*5*/	{ time: [10, 14], status: [false, false, false], energy: [50, 50] },
	/*6*/	{ time: [9, 12], status: [false, false, false], energy: [50, 50] },
	/*7*/	{ time: [7, 10], status: [false, false, false], energy: [50, 50] },
	/*8*/	{ time: [22, 2], status: [false, false, false], energy: [50, 50] },
	/*9*/	{ time: [18, 22], status: [false, false, false], energy: [50, 50] }
	],
	set: {
		Creative(bool) {
			if (bool)
				for (let index in Spirit.INFO) {
					let sp = Spirit.INFO[index];
					sp.energy[0] = 200000;
					sp.energy[1] = 200000;
					sp.status = [true, true, true]
					Spirit.creatve = true;
				}
		},
		Active(id) {
			try {
				var prop = Spirit.get.Info(id),
					energy = prop.energy;
				if (prop.active == false && prop.builded == true) {
					if (energy[0] > energy[1]) energy[0] = 0; else energy[0] = energy[1];
					prop.active = true;
					Spirit.Informate(id)
					Callback.invokeCallback("SpiritActive", prop, id)
				}
			} catch (e) {
				LogError(e, ['Spirit', 'get', 'Name'], true)
			}
		},
		Inactive(id) {
			if (Spirit.get.Active(id) == true && Spirit.get.Builded(id) == true) {
				Spirit.get.Info(id).active = false;
				Spirit.informate(id);
				Callback.invokeCallback("SpiritInActive");
			}
		},
		Energy(id, value, minus) {
			var energy = Spirit.get.Energy(id);
			if (minus) {
				if (value <= energy[0] && energy[0] - value > 0) energy[0] -= value;
				Callback.invokeCallback("SpiritEnergyGiven", id, value, energy);
			} else {
				if (energy[0] < value && energy[0] + value < energy[1]) energy[0] += value;
				Callback.invokeCallback("SpiritEnergyRecieved", id, value, energy);
			}
		},
		EnergyMax(id, value) {
			return Spirit.get.Energy(id)[1] += value
		}
	},
	get: {
		Info(id) {
			return Spirit.INFO[this.Id(id)]
		},
		Name(p) {
			return (typeof p == 'string') ? p : Spirit.TYPE[p]
		},
		Id(p) {
			return (typeof p == 'number') ? p : Spirit.TYPE[p]
		},
		Active(id) {
			return this.Info(id).status[2]
		},
		Builded(id) {
			return this.Info(id).status[0]
		},
		Energy(id) {
			return this.Info(id).energy
		},
		EnergyMax(id) {
			return this.Energy(id)[0]
		},
		EnergyCurrent(id) {
			return this.Energy(id)[1]
		},
		CallingStoneById(id) {
			return (typeof id == 'string') ? Spirit.CALLING_STONES[id] : id
		},
		IdByCallingStone(str) {
			return (typeof str == 'number') ? p : Spirit.CALLING_STONES[str]
		},
		IdByCallingStoneItemID(id) {
			for (let i in Spirit.CALLING_STONES)
				if ((typeof i == 'string') && ItemID[i] == id) Spirit.get.IdByCallingStone(i)
			// return (typeof str == 'number') ? p : Spirit.CALLING_STONES[str]
		},
		IsCallingStone(id) {
			for (let i in Spirit.CALLING_STONES)
				if ((typeof i == 'string') && ItemID[i] == id) return true
			return false
		},
		Medium(id) {
			return Spirit.MEDIUMS[id]
		}
	},
	Informate(id) {
		var name = Spirit.get.Name(id);
		if (Spirit.get.Active(id)) Game.message(t("Spirit: ") + name + t(" is active"));
		else Game.message(t("Spirit: ") + name + t(" is inactive"));
		Callback.invokeCallback("SpiritInformated", id, prop);
	}
}

var Trade = {
	LIST: {},
	RECIPES: {},
	set: {
		Recipe(id, recipe, SPID) {
			Trade.RECIPES[id] = [Trade.get.Normalize(recipe), SPID];
		},
	},
	get: {
		Recipe(id) {
			return Trade.RECIPES[id]
		},
		Items(id) {
			if (id in Trade.RECIPES)
				return [{
					input: Trade.RECIPES[id][0],
					output: [{ id: id, data: 0, count: 1 }]
				}];
			return [];
		},
		Result(slots, SPID) {
			for (let id in Trade.LIST) {
				let c = 0, recipe = Trade.LIST[id][0];
				recipeCheck: for (let i in recipe) {
					let item = Trade.get.Item(recipe[i]),
						slot = slots[c];// alert(slots[counter].id)
					if (!(slot.id == item.id && slot.data == item.data)) break recipeCheck;
					if ((++c) == recipe.length && Talisman.get.Spirit(id) == SPID) {
						alert('Found recipe for id: ' + id);
						return id;
					}
				} c = 0;
			}
		},
		Item(id) {
			return (Array.isArray(id)) ? { id: id[0], data: id[1], count: 1 } : { id: id, data: 0, count: 1 };
		},
		Normalize(recipe) {
			var list = [];
			for (let i in recipe) list.push(Trade.get.Item(recipe[i]));
			return list;
		}
	},
}

var Talisman = {
	LIST: { /*...*/ },
	TYPE: {
		"arrow": 0, 0: "arrow",
		"blade": 1, 1: "blade",
		"spell": 2, 2: "spell",
		"tool": 3, 3: "tool",
		"dev": 4, 4: "dev"
	},
	set: {
		New(p) {
			var id = regItem(p.texture + '_' + (Talisman.TYPE[p.type]) + "_talisman", p.name, 1);
			Talisman.LIST[id] = p;
			Item.registerNameOverrideFunction(id, function (i, n) {
				return Talisman.set.Tooltip(n, p)
			});
			Trade.set.Recipe(id, p.recipe)
		},
		Tooltip(n, p) {
			return n + ("\n" + t("Spirit: ") + Spirit.get.Name(p.spirit[0]) + "\n" + t("Favor cost: ") + p.spirit[1]);
		}
	},
	get: {
		Info(id) {
			return Talisman.LIST[id] || null;
		},
		Spirit(id) {
			return Talisman.get.Info(id).spirit[0]
		},
		UseMana(id) {
			return Talisman.get.Info(id).spirit[1]
		},
		UseFunc(id) {
			return Talisman.get.Info(id).use
		},
		Recipe(id) {
			return Talisman.get.Info(id).recipe
		},
		Texture(id) {
			return Talisman.get.Info(id).texture
		},
		Name(id) {
			return Talisman.get.Info(id).name
		},
		Type(id) {
			return Talisman.get.Info(id).type
		},
		Valid(id, types) {
			var valid = (id in Talisman.LIST);
			if (!types) return valid;
			var type = Talisman.get.Type(id);
			if (valid) {
				return (!types[1]) ? (type === types[0]) : (type === types[2] || type === types[1])
			} else return false;
		},
		isCarriedID() {
			var item = Player.getCarriedItem();
			return this.Valid(item.id) ? item.id : null
		},
		IdInCurrentItem(slotID) {
			var item = Player.getCarriedItem();
			if (item.extra) {
				var container = CIM.containers["e" + item.extra.getInt("extraCount")];
				if (container !== undefined) {
					return container.getSlot("slot_" + slotID).id || null;
				}
			}
		},
		InCurrentItem(slotID) {
			var id = this.IdInCurrentItem(slotID);
			return this.Valid(id) ? Talisman.get.Info(id) : null;
		}
	},
	Use(props, id) {
		if (!id) id = Talisman.get.isCarriedID();
		var cTalisman = Talisman.get.Info(id);
		// alert("Current: "+current)
		if (cTalisman) {
			var energy = Spirit.get.Energy(cTalisman.spirit[0]);
			// alert('Start USE. Energy: '+energy[0]+'/'+current.spirit[1])
			if (energy[0] >= cTalisman.spirit[1]) {
				Spirit.set.Energy(cTalisman.spirit[0], cTalisman.spirit[1], true)
				cTalisman.use(props)
				// alert('USE FINISHED.'+current.use)
			}
		}
	}
};

function ArrowTalisman(enabled, p) {
	if (enabled) {
		p.name += ' arrow talisman'
		p.type = Talisman.TYPE.arrow
		return Talisman.set.New(p)
	}
}
function BladeTalisman(enabled, p) {
	if (enabled) {
		p.name += ' blade talisman'
		p.type = Talisman.TYPE.blade
		return Talisman.set.New(p)
	}
}
function SpellTalisman(enabled, p) {
	if (enabled) {
		p.name += ' spell talisman'
		p.type = Talisman.TYPE.spell
		return Talisman.set.New(p)
	}
}
function ToolTalisman(enabled, p) {
	if (enabled) {
		p.name += ' tool talisman'
		p.type = Talisman.TYPE.tool
		return Talisman.set.New(p)
	}
}
Spirit.set.Creative(true);
// new ArrowTalisman(true, {
// 	name: "Cripple talisman", texture: "cripple",
// 	spirit: [9, 100], recipe: [339, [351, 12], 372, 309],
// 	use: function (obj) {
// 		if (63 != Entity.getType(obj.Entity))
// 			Entity.addEffect(obj.Entity, 2, 500, 1, 2, true)
// 	}
// });
// var structures = [
// 	'arbow1', 'arbow2',
// 	'blizrabi1', 'blizrabi2',
// 	'endererer1', 'endererer2',
// 	'loon1', 'loon2',
// 	'materia1', 'materia2',
// 	'neblaze1', 'neblaze2',
// 	'redwind1', 'redwind2',
// 	'romol1', 'romol2',
// 	'squarefury1', 'squarefury2',
// 	'timber1', 'timber2'
// ];

// function addStructureButtons(remove) {
// 	var buttons = [], i = 0;
// 	while (i<10) {
// 		alert(structures[i] + "/" + structures[i+10])
// 		var o = i;
// 		buttons.push(new Button().setText(structures[i] + "/" + structures[i+10]).setLayoutParams(A.WRAP, A.WRAP)
// 			.setOnClickListener(function (v) {
// 				StructuresAPI.set(structures[o], ItemUseCoords.x, ItemUseCoords.y, ItemUseCoords.z, remove || false)
// 			})
// 			.setOnLongClickListener(function (v) {
// 				StructuresAPI.set(structures[o+10], ItemUseCoords.x, ItemUseCoords.y, ItemUseCoords.z, remove || false)
// 				return true
// 			})
// 		)
// 		i++;
// 	}
// 	return buttons
// }




// file: mod/gui/guis.js

function validateGuiSlot(gui, validator) {
	for (let i in gui.getContent().elements) {
		gui.getContent().elements[i].isValid = validator;
	};
}

var pouch = new UI.StandartWindow({
	standart: {header: {text: {text: t("Ritual pouch")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 490, y: 270, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_1": {type: "slot", x: 550, y: 270, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_2": {type: "slot", x: 610, y: 270, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_3": {type: "slot", x: 550, y: 210, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_4": {type: "slot", x: 490, y: 150, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_5": {type: "slot", x: 550, y: 150, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_6": {type: "slot", x: 610, y: 150, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
	}
});
validateGuiSlot(pouch, function(){
	return CIM.nonCIM(ItemID.ritual_pouch);
});

var bowInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Spell Bow Book")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_18": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 570, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_25": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_26": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},
		
		"slot_27": {type: "slot", x: 570, y: 250, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(bowInv, function(id, count, data){
	return Talisman.get.Valid(id, [0]);
});

var greenBladeInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Green Spell Blade book")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_18": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 570, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_25": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_26": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},

		"slot_27": {type: "slot", x: 570, y: 250, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(greenBladeInv, function(id, count, data){
	return Talisman.get.Valid(id, [1,2]);
});

var redBladeInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Red Spell Blade book")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_18": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 570, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_25": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_26": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},

		"slot_27": {type: "slot", x: 570, y: 250, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(redBladeInv, function(id, count, data){
	return Talisman.get.Valid(id, [1,2]);
});

var bluePickInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Blue Spell Pickaxe book")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},

		"slot_18": {type: "slot", x: 570, y: 180, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(bluePickInv, function(id, count, data){
	return Talisman.get.Valid(id, [2,3]);
});

var orangePickInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Orange Spell Pickaxe book")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},

		"slot_18": {type: "slot", x: 570, y: 180, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(orangePickInv, function(id, count, data){
	return Talisman.get.Valid(id, [2,3]);
});

var grimoireInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Orange Spell Pickaxe book")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},

		"slot_18": {type: "slot", x: 570, y: 180, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(grimoireInv, function(id, count, data){
	return Talisman.get.Valid(id, [2]);
});

var contractInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Contract binder book")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
	}
});
validateGuiSlot(contractInv, function(){
	return CIM.nonCIM(ItemID.contract_binder);
});

var mediumInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Medium")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		//recipes
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		//crystall
		"slot_9": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		//results
		"slot_10": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_18": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},
	}
});
var lecternInv = new UI.StandartWindow({
	standart: {header: {text: {text: t("Soulblound lectern")}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_8":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_9":  {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"}, //soul shard slot
		"slot_13": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_17": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_18": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},
	}
});







// file: mod/items/regItems.js

function translateRu(name, ru) {
	return Translation.addTranslation(name, { ru: ru });
}
function regItem(texture, name, stack, cr) {
	IDRegistry.genItemID(texture);
	Item.createItem(texture, name, { name: texture }, { isTech: cr, stack: stack });
	return ItemID[texture];
}

function AddTalismanInfo(id){
	(typeof id === 'string')? id=ItemID[id]: null;
	Item.registerNameOverrideFunction(id, function (item, ItemName) {
		var info = Talisman.get.InCurrentItem(27);
		if (info) {
			var SpiritName = Spirit.get.Name(info.spirit[0])
			SpiritEnergy = Spirit.get.Energy(info.spirit[0]);
			return ItemName + "\n" + t("Spirit: ") + SpiritName +
				"\n" + t("Favor cost: ") + info.spirit[1] +
				"\n" + SpiritEnergy[0] + "/" + SpiritEnergy[1];
		}
		return ItemName;
	});
}
regItem("ice_arrow", "Ice arrow", 64);
regItem("memory_drop", "Memory drop", 64);
regItem("blade_green", "Green Spell blade", 1);
regItem("blade_red", "Red Spell blade", 1);
regItem("pick_blue", "Blue Spell pickaxe", 1);
regItem("pick_orange", "Orange Spell pickaxe", 1);
regItem("banishing_wand", "Banishing wand", 1);
regItem("paint", "Paint Ethereal Brush", 1);
regItem("big_vial", "Big Goo vial", 64);
Item.registerIconOverrideFunction(ItemID.big_vial, function (item, name) {
	return { name: "big_vial", meta: item.data }
});
regItem("medium_vial", "Medium Goo vial", 1);
Item.registerIconOverrideFunction(ItemID.medium_vial, function (item, name) {
	return { name: "medium_vial", meta: item.data }
});
regItem("small_vial", "Small Goo vial", 1);
Item.registerIconOverrideFunction(ItemID.small_vial, function (item, name) {
	return { name: "small_vial", meta: item.data }
});
regItem("mystic_architect_stick", "Mystic architect stick", 1);
regItem("contract_binder", "Contract binder", 1);
regItem("grimoire", "Grimoire", 1);
regItem("memory_pouch", "Memory pouch", 1);
regItem("capacity_major", "Capacity major contract", 1);
regItem("capacity_minor", "Capacity minor contract", 1);
regItem("creative", "Creative contract", 1);
regItem("inform", "Inform contract", 1);
regItem("regen_major", "Regen major contract", 1);
regItem("regen_minor", "Regen minor contract", 1);
regItem("milky_apple", "Milky apple", 1);
regItem("ritual_pouch", "Ritual pouch", 1);
regItem("stone_ball", "Stone ball", 1);
// regItem("roots", "Roots Cursed Arrow", 1);

regItem("book_green", "Green Spell Blade book", 1, true);
regItem("book_red", "Red Spell Blade book", 1, true);
regItem("book_blue", "Blue Spell Pickaxe book", 1, true);
regItem("book_orange", "Orange Spell Pickaxe book", 1, true);
regItem("book_bow", "Spell bow book", 1, true);

// regItem("hand_swap", "Hand swap Spell arrow", 1);
regItem("bone_key", "Bone key", 1);
regItem("caving_rope", "Caving rope", 1);
// regItem("clock", "Clock", 1);
regItem("immaterial_guide", "Immaterial guide", 1);
regItem("invite_gem", "Invite gem", 1);
regItem("invite_pebble", "Invite pebble", 1);
regItem("marked_glass", "Marked glass", 1);
regItem("storage_gem", "Storage gem", 1);
regItem("warp_gem", "Warp gem", 1);
regItem("warp_pebble", "Warp pebble", 1);

AddTalismanInfo("book_green");
AddTalismanInfo("book_red");
AddTalismanInfo("book_blue");
AddTalismanInfo("book_orange");
AddTalismanInfo("book_bow");

AddTalismanInfo("blade_green");
AddTalismanInfo("blade_red");
AddTalismanInfo("pick_blue");
AddTalismanInfo("pick_orange");




// file: mod/blocks/regBlock.js

var t_int = java.lang.Integer.TYPE;
var t_float = java.lang.Float.TYPE;
var block_api = java.lang.Class.forName("zhekasmirnov.launcher.api.NativeBlock", true, UI.getContext().getClass().getClassLoader());
var setFriction = block_api.getMethod("setFriction", t_int, t_float);

BlockFriction = function (id, friction) {
	if(id<256)
		try {
			setFriction.invoke(null, new java.lang.Integer(id), new java.lang.Float(friction));
		}catch(e){
			LogError(e, 'Block Friction', true)
		}
	else LogWarning(null, "Cannot works with non Vanilla blocks, caused by InnerCore :D", 'Block Friction')
};

function regBlock(id, name, texture, inCreative, rotation) {
	IDRegistry.genBlockID(id);
	rotation ? Block.createBlock(id, [{name: name, texture: texture, inCreative: inCreative || true }]) : Block.createBlockWithRotation(id, [{name: name,texture: texture, inCreative: inCreative || true}]);
	return BlockID[id];
}




// file: mod/blocks/blocks.js

//? Lecterns
regBlock("lectern_coal", "Soulbound lectern Coal", [
	["coal_block", 0], ["coal_block", 0], ["coal_block", 0],  ["lectern_coal_inactive", 0], ["coal_block", 0], ["coal_block", 0]], true);

regBlock("lectern_gold", "Soulbound lectern Gold", [
	["gold_block", 0], ["gold_block", 0], ["gold_block", 0], ["lectern_gold_inactive", 0], ["gold_block", 0], ["gold_block", 0]], true);

regBlock("lectern_iron", "Soulbound lectern Iron", [
	["iron_block", 0], ["iron_block", 0], ["iron_block", 0], ["lectern_iron_inactive", 0], ["iron_block", 0], ["iron_block", 0]], true);

regBlock("lectern_log", "Soulbound lectern Log", [
	["log_top", 0], ["log_top", 0], ["log", 0], ["lectern_log_inactive", 0], ["log", 0], ["log", 0]], true);

regBlock("lectern_obsidian", "Soulbound lectern Obsidian", [
	["obsidian", 0], ["obsidian", 0], ["obsidian", 0], ["lectern_obsidian_inactive", 0], ["obsidian", 0], ["obsidian", 0]], true);

regBlock("lectern_snow", "Soulbound lectern Snow", [
	["snow", 0], ["snow", 0], ["snow", 0], ["lectern_snow_inactive", 0], ["snow", 0], ["snow", 0]], true);

regBlock("lectern_stone", "Soulbound lectern Stone", [
	["stone", 0], ["stone", 0], ["stone", 0], ["lectern_stone_inactive", 0], ["stone", 0], ["stone", 0]], true);

regBlock("lectern_wood", "Soulbound lectern Wood", [
	["wood", 0], ["wood", 0], ["wood", 0], ["lectern_wood_inactive", 0], ["wood", 0], ["wood", 0]], true);




// file: mod/blocks/models.js

function createMultiModel(texture, type) {
	var textures1, textures2;
	if (type == 0) {
		textures1  = [[texture[1], 0], [texture[0] + "_active", 0]];
		textures2  = [[texture[1], 0], [texture[0] + "_active_" + (texture[2] || ""), 0]];
		TileRenderer.registerFullRotationModel(texture[0] + "_active", 0, textures1);
		TileRenderer.registerFullRotationModel(texture[0] + "_active_" + (texture[2] || ""), 0, textures2);
		return [(texture[0] + "_active"), (texture[0] + "_active_" + (texture[2] || ""))];
	}	else {
		textures1  = [[texture[1], 0], [texture[0]+"_active", 0]];
		TileRenderer.registerFullRotationModel(texture[0]+"_active", 0, textures1);
	}
}
//? Mediums
//* Base
//* Creating materials for another spirits
//* Spirits
var model_medium_arbow = createMultiModel(["medium_arbow", "gold_block", "trading"], 0);
var model_medium_blizrabi = createMultiModel(["medium_blizrabi", "lapis_block", "trading"], 0);
var model_medium_endererer = createMultiModel(["medium_endererer", "iron_block", "trading"], 0);
var model_medium_loon = createMultiModel(["medium_loon", "gold_block", "trading"], 0);
var model_medium_materia = createMultiModel(["medium_materia", "gold_block", "trading"], 0);
var model_medium_neblaze = createMultiModel(["medium_neblaze", "obsidian", "trading"], 0);
var model_medium_redwind = createMultiModel(["medium_redwind", "redstone_block", "trading"], 0);
var model_medium_romol = createMultiModel(["medium_romol", "iron_block", "trading"], 0);
var model_medium_squarefury = createMultiModel(["medium_squarefury", "gold_block", "trading"], 0);
var model_medium_timber = createMultiModel(["medium_timber", "log", "trading"], 0);

//? Soulbound lecterns
createMultiModel(["lectern_coal", "coal_block"], 1);
createMultiModel(["lectern_gold", "gold_block"], 1);
createMultiModel(["lectern_iron", "iron_block"], 1);
createMultiModel(["lectern_log", "log",], 1);
createMultiModel(["lectern_obsidian", "obsidian"], 1);
createMultiModel(["lectern_snow", "snow"], 1);
createMultiModel(["lectern_stone", "stone"], 1);
createMultiModel(["lectern_wood", "wood"], 1);





// file: mod/blocks/medium.js

var medium_models = [model_medium_arbow, model_medium_blizrabi, model_medium_endererer, model_medium_loon, model_medium_materia, model_medium_neblaze, model_medium_redwind, model_medium_romol, model_medium_squarefury, model_medium_timber];
var medium_Prototype = {
	// list: {},
	// addItem(id, recipe, spiritID) {
	// 	this.list[id] = [this.normalizeRecipe(recipe), spiritID];
	// },
	// normalizeRecipe(recipe){
	//   var list = [];
	//   for(let i in recipe) list.push(spirit.getIdData(recipe[i]));
	//   return list;
	// },
	// getItemList(id){
	// 	if(id in medium_Prototype.list){
	// 		let list = [];
	// 		list.push({
	// 			input: medium_Prototype.list[id][0],
	// 			output: [
	// 				{id: id, data:0, count: 1}
	// 			]
	// 		});
	// 		return list;
	// 	}
	// 	return [];
	// },
	addMedium(texture_name, name, texture, CIDs) {
		var id = regBlock(texture_name, name, texture, true);
		TileRenderer.setStandartModel(id, texture);
		TileRenderer.registerFullRotationModel(id, 0, texture);
		TileEntity.registerPrototype(id, {
			defaultValues: {
				state: "none",
				spiritID: null,
				model: null,
				spirits: CIDs,
				meta: 0,
			},
			setModelBySpirit: function () {
				if (this.data.spiritID)
					for (let i in this.data.spirits)
						if (this.data.spirits[i] == this.data.spiritID)
							this.data.model = medium_models[this.data.spiritID];
			},
			getInputSlot: function (all, num) {
				let slots = [];
				if (all) {
					for (let i = 0; i < 9; i++) {
						slots[i] = this.container.getSlot("input_" + i);
					}
					return slots;
				} else if (num) {
					return this.container.getSlot("input_" + num);
				}
			},
			getOutputSlot: function (all, num) {
				let slots = [];
				if (all) {
					for (let i = 0; i < 9; i++) {
						slots[i] = this.container.getSlot("output_" + i);
					}
					return slots;
				} else if (num) {
					return this.container.getSlot("output_" + num);
				}
			},
			init: function () {
				// var Window = this.getGuiScreen();
				// Window.content.elements["spirit"].visual = false;
				// Window.content.elements["spirit"].bitmap = "slot_default";
			},
			getGuiScreen: function () {
				if (this.data.state != "trade")
					return new UI.StandartWindow({
						standart: {
							header: { text: { text: t("Created With UIEditor") } },
							background: { color: android.graphics.Color.parseColor("#C6C6C6") }, inventory: { standart: true }
						},
						drawing: [],
						elements: {
							"input0": { type: "slot", x: 370, y: 80, size: 60, bitmap: "slot_default" },
							"input1": { type: "slot", x: 430, y: 80, size: 60, bitmap: "slot_default" },
							"input2": { type: "slot", x: 490, y: 80, size: 60, bitmap: "slot_default" },
							"input3": { type: "slot", x: 370, y: 140, size: 60, bitmap: "slot_default" },
							"input4": { type: "slot", x: 430, y: 140, size: 60, bitmap: "slot_default" },
							"input5": { type: "slot", x: 490, y: 140, size: 60, bitmap: "slot_default" },
							"input6": { type: "slot", x: 370, y: 200, size: 60, bitmap: "slot_default" },
							"input7": { type: "slot", x: 430, y: 200, size: 60, bitmap: "slot_default" },
							"input8": { type: "slot", x: 490, y: 200, size: 60, bitmap: "slot_default" },
							"spirit": {
								type: "slot", x: 610, y: 140, size: 60, bitmap: "slot_default", isValid: function (id) {
									for (let i in CIDs) {
										var stone = Spirit.get.CallingStoneById(CIDs[i])
										alert(id + "|" + ItemID[stone]);
										let item = (id == ItemID[stone]);
										return item;
									}
								}
							},
							"output0": { type: "slot", x: 730, y: 80, size: 60, bitmap: "slot_default" },
							"output1": { type: "slot", x: 790, y: 80, size: 60, bitmap: "slot_default" },
							"output2": { type: "slot", x: 850, y: 80, size: 60, bitmap: "slot_default" },
							"output3": { type: "slot", x: 730, y: 140, size: 60, bitmap: "slot_default" },
							"output4": { type: "slot", x: 790, y: 140, size: 60, bitmap: "slot_default" },
							"output5": { type: "slot", x: 850, y: 140, size: 60, bitmap: "slot_default" },
							"output6": { type: "slot", x: 730, y: 200, size: 60, bitmap: "slot_default" },
							"output7": { type: "slot", x: 790, y: 200, size: 60, bitmap: "slot_default" },
							"output8": { type: "slot", x: 850, y: 200, size: 60, bitmap: "slot_default" },
						}
					});
			},
			setSpirit() {
				this.data.spiritID = Spirit.get.IdByCallingStoneItemID(this.container.getSlot("spirit").id)
			},
			setState(state) {
				this.data.state = state;
			},
			getState() {
				return this.data.state;
			},
			getTradeItem() {
				return Trade.get.Result(this.getInputSlot(true), this.data.spiritID)
				// spirit.getTrade(this.getInputSlot(true), this.data.spiritID)
			},
			// getTrading(){
			// 	return spirit.tradeCheck(this.getInputSlot(true), this.data.spiritID)
			// },
			mapRender: function () {
				if (this.getTradeItem())
					TileRenderer.mapAtCoords(this.x, this.y, this.z, this.data.model[1], this.data.meta), this.setState("trade");
				else
					TileRenderer.mapAtCoords(this.x, this.y, this.z, this.data.model[0], this.data.meta), this.setState("active");
				return this.getState();
			},
			unMapRender() {
				// if(this.getState() != "none")BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
				TileRenderer.mapAtCoords(this.x, this.y, this.z, id, this.data.meta);
				this.setState("none");
			},
			tick: function () {
				let ticks = World.getThreadTime();
				if (ticks % 100 == 0) {
					this.setSpirit();
					this.setModelBySpirit();// Game.message("SpiritID: " + this.data.spiritID + ", active: " + (this.data.spiritID ? (spirit.getActive(this.data.spiritID) + ", "): "false, ") + (this.data.model ? "Model: ok" : "Model: " + this.data.model) + ", gb.data: " + gb.data)
					if (this.data.spiritID && this.data.model)
						if (Spirit.get.Active(this.data.spiritID))
							this.mapRender(); else this.unMapRender();
				}
			},
			destroy: function () {
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			}
		});
		TileRenderer.setRotationPlaceFunction(texture_name, true);
	},
	addMediumRecipes(name) {
		ModAPI.addAPICallback("RecipeViewer", function (api) {
			let RecipeViewer = api.Core, specID = 0;
			RecipeViewer.registerRecipeType(name, {
				contents: {
					icon: BlockID.medium_gold,
					description: name,
					elements: {
						input0: { type: "slot", x: 90, y: 80, size: 100 },
						input1: { type: "slot", x: 190, y: 80, size: 100 },
						input2: { type: "slot", x: 290, y: 80, size: 100 },
						input3: { type: "slot", x: 90, y: 180, size: 100 },
						input4: { type: "slot", x: 190, y: 180, size: 100 },
						input5: { type: "slot", x: 290, y: 180, size: 100 },
						input6: { type: "slot", x: 90, y: 280, size: 100 },
						input7: { type: "slot", x: 190, y: 280, size: 100 },
						input8: { type: "slot", x: 290, y: 280, size: 100 },
						spirit: { type: "slot", x: 490, y: 130, size: 100, visual: true },
						medium: { type: "slot", x: 490, y: 230, size: 100, visual: true },
						output0: { type: "slot", x: 690, y: 180, size: 100 },
					}
				},
				getList: function (id, data, isUsage) {
					specID = id;
					if (isUsage) return [];
					// return medium_Prototype.getItemList(id);
					return Trade.get.Items(id);
				},
				onOpen: function (elements, data) {//Talisman.get.Recipe(specID)
					// elements.get("spirit").onBindingUpdated("source", {id: ItemID[spirit.callingStone[medium_Prototype.list[specID][1]]], data:-1, count:1})
					elements.get("spirit").onBindingUpdated("source", { id: ItemID[Spirit.get.ByCallingStone(Talisman.get.Spirit(specID))], data: 0, count: 1 })
					// elements.get("medium").onBindingUpdated("source", {id: BlockID[spirit.mediums[medium_Prototype.list[specID][1]]], data:0, count:1})
					elements.get("medium").onBindingUpdated("source", { id: BlockID[Spirit.get.Medium(Talisman.get.Spirit(specID))], data: 0, count: 1 })
				}
			});
		});
	}
}
// medium_Prototype.addMedium("medium_gold", "Gold Medium", [
// 	["debug", 0],["debug", 1],["debug", 2],["debug", 3],["debug", 4],["debug", 5]], [0,3,4,8]);
medium_Prototype.addMedium("medium_gold", "Gold Medium", [
	["gold_block", 0], ["gold_block", 0], ["gold_block", 0], ["medium_gold_inactive", 0], ["gold_block", 0], ["gold_block", 0]], [0, 3, 4, 8]);

medium_Prototype.addMedium("medium_iron", "Iron Medium", [
	["iron_block", 0], ["iron_block", 0], ["iron_block", 0], ["medium_iron_inactive", 0], ["iron_block", 0], ["iron_block", 0]], [2, 7]);

medium_Prototype.addMedium("medium_lapis", "Lapis Medium", [
	["lapis_block", 0], ["lapis_block", 0], ["lapis_block", 0], ["medium_lapis_inactive", 0], ["lapis_block", 0], ["lapis_block", 0]], [1]);

medium_Prototype.addMedium("medium_log", "Log Medium", [
	["log_top", 0], ["log_top", 0], ["log", 0], ["medium_log_inactive", 0], ["log", 0], ["log", 0]], [9]);

medium_Prototype.addMedium("medium_obsidian", "Obsidian Medium", [
	["obsidian", 0], ["obsidian", 0], ["obsidian", 0], ["medium_obsidian_inactive", 0], ["obsidian", 0], ["obsidian", 0]], [5]);

medium_Prototype.addMedium("medium_redstone", "Redstone Medium", [
	["redstone_block", 0], ["redstone_block", 0], ["redstone_block", 0], ["medium_redstone_inactive", 0], ["redstone_block", 0], ["redstone_block", 0]], [6]);

medium_Prototype.addMediumRecipes("Medium");




// file: mod/items/Bow.js

IDRegistry.genItemID("spell_bow");
Item.createItem("spell_bow", "Spell bow", { name: "spell_bow", meta: 0 }, { stack: 1 });
Item.describeItem(ItemID.spell_bow, {
	toolRender: true,
	maxDamage: 385,
	useAnimation: 4
});

var spellBow = new Bow();
spellBow.set({
	id: ItemID.spell_bow,
	texture: "spell_bow",
	bullets: [262],
	skin: "entity/projectiles/arrow.png",
	speed: 2,
	damage: 1.5,
	variations: 3,
});
AddTalismanInfo("spell_bow");
Callback.addCallback("BowArrowHit", function (p, i, t) {// ProjectileHit
	var id = Talisman.get.IdInCurrentItem(27);
	// alert("Talisman ID: "+id)
	Talisman.Use({
		x: t.x, y: t.y, z: t.z,
		Entity: t.entity,
		block: World.getBlock(t.x, t.y, t.z)
	}, id);
});
// Callback.addCallback("BowArrowHit", function(){
// 	alert("BowArrowHit")
// });
// Callback.addCallback("BowOnShot", function(){
// 	alert("BowOnShot")
// });
// Callback.addCallback("BowStateChange", function(){
// 	alert("BowStateChange")
// });
//BowArrowEntityDamage, atacker, victim, damage
//BowArrowHit, projectile, item, target
//BowOnShot, bow
//BowStateChange




// file: mod/items/ropes.js

regItem("barrier_rope", "Barrier rope", 64);
regItem("explosive_rope", "Explosive rope", 64);
regItem("glowing_rope", "Glowing rope", 64);
regItem("guide_rope", "Guide rope", 64);
regItem("inert_rope", "Inert rope", 64);
regItem("luminous_rope", "Luminous rope", 64);
regItem("teleporting_rope", "Teleporting rope", 64);




// file: mod/items/Ingredients.js


/*
 * CALLING STONES
 */

regItem("calling_stone_arbow",      "Arbow Calling Stone", 1);
regItem("calling_stone_blizrabi",   "Blizrabi Calling Stone", 1);
regItem("calling_stone_endererer",  "Endererer Calling Stone", 1);
regItem("calling_stone_loon",       "Loon Calling Stone", 1);
regItem("calling_stone_materia",    "Materia Calling Stone", 1);
regItem("calling_stone_neblaze",    "Neblaze Calling Stone", 1);
regItem("calling_stone_redwind",    "Redwind Calling Stone", 1);
regItem("calling_stone_romol",      "Romol Calling Stone", 1);
regItem("calling_stone_squarefury", "Squarefury Calling Stone", 1);
regItem("calling_stone_timber",     "Timber Calling Stone", 1);

/*
 * FAVOR MARKS
 */

regItem("arbow_favor_mark",      "Arbow Favor mark", 1);
regItem("blizrabi_favor_mark",   "Blizrabi Favor mark", 1);
regItem("endererer_favor_mark",  "Endererer Favor mark", 1);
regItem("loon_favor_mark",       "Loon Favor mark", 1);
regItem("materia_favor_mark",    "Materia Favor mark", 1);
regItem("neblaze_favor_mark",    "Neblaze Favor mark", 1);
regItem("redwind_favor_mark",    "Redwind Favor mark", 1);
regItem("romol_favor_mark",      "Romol Favor mark", 1);
regItem("squarefury_favor_mark", "Squarefury Favor mark", 1);
regItem("timber_favor_mark",     "Timber Favor mark", 1);

/*
 * MARKED GLASS
 */

regItem("arbow_marked_glass",      "Arbow Marked glass", 1);
regItem("blizrabi_marked_glass",   "Blizrabi Marked glass", 1);
regItem("endererer_marked_glass",  "Endererer Marked glass", 1);
regItem("loon_marked_glass",       "Loon Marked glass", 1);
regItem("materia_marked_glass",    "Materia Marked glass", 1);
regItem("neblaze_marked_glass",    "Neblaze Marked glass", 1);
regItem("redwind_marked_glass",    "Redwind Marked glass", 1);
regItem("romol_marked_glass",      "Romol Marked glass", 1);
regItem("squarefury_marked_glass", "Squarefury Marked glass", 1);
regItem("timber_marked_glass",     "Timber Marked glass", 1);

/*
 * SOUL SHARDS
 */

regItem("end_soul_shard",     "End Soul shard", 64);
regItem("mind_soul_shard",    "Mind Soul shard", 64);
regItem("nether_soul_shard",  "Nether Soul shard", 64);
regItem("peace_soul_shard",   "Peace Soul shard", 64);
regItem("undeath_soul_shard", "Undeath Soul shard", 64);
regItem("water_soul_shard",   "Water Soul shard", 64);
regItem("wild_soul_shard",    "Wild Soul shard", 64);
regItem("will_soul_shard",    "Will Soul shard", 64);
regItem("wither_soul_shard",  "Wither Soul shard", 64);

/*
 * WICHING STONES
 */

regItem("arbow_wishing_stone",      "Arbow Wishing stone", 64);
regItem("blizrabi_wishing_stone",   "Blizrabi Wishing stone", 64);
regItem("endererer_wishing_stone",  "Endererer Wishing stone", 64);
regItem("loon_wishing_stone",       "Loon Wishing stone", 64);
regItem("materia_wishing_stone",    "Materia Wishing stone", 64);
regItem("neblaze_wishing_stone",    "Neblaze Wishing stone", 64);
regItem("redwind_wishing_stone",    "Redwind Wishing stone", 64);
regItem("romol_wishing_stone",      "Romol Wishing stone", 64);
regItem("squarefury_wishing_stone", "Squarefury Wishing stone", 64);
regItem("timber_wishing_stone",     "Timber Wishing stone", 64);




// file: mod/items/Talisman/Arrow.js


// new ArrowTalisman(true, {
// 	name: "Cripple talisman", texture: "cripple",
// 	spirit: [Spirit.TYPE.TIMBER, 100], recipe: [339, [351, 12], 372, 309],
// 	use: function (obj) {
// 		if (63 != Entity.getType(obj.Entity))
// 			Entity.addEffect(obj.Entity, 2, 500, 1, 2, true)
// 	}
// });

ArrowTalisman(false, {
	name: "Anti gravity", texture: "anti_gravity", spirit: [Spirit.TYPE.ARBOW, 5],
	recipe: [339, 264, 262, 368], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Armor corrosion", texture: "armor_corrosion", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 9], 341, 314], use: function (obj) {
		Game.message(t("Not working, this is multiplayer item..."))
	}
});
ArrowTalisman(true, {
	name: "Blast", texture: "blast", spirit: [Spirit.TYPE.NEBLAZE, 30],
	recipe: [339, [351, 11], 262, 46], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, 0.24, false)
	}
});
ArrowTalisman(true, {
	name: "Blink", texture: "blink", spirit: [Spirit.TYPE.ENDERERER, 10],
	recipe: [339, [351, 2], 262, 368, 266], use: function (obj) {
		Player.setPosition(obj.x, obj.y + 1.60, obj.z)
	}
});
ArrowTalisman(false, {
	name: "Climbing", texture: "climbing", spirit: [Spirit.TYPE.ARBOW, 10],
	recipe: [339, [351, 3], 262, 65], use: function (obj) {
		Game.message(t("Climbing"))
	}
});
ArrowTalisman(false, {
	name: "Crawling Mist", texture: "crawling_mist", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 7], 262, 35, 40], use: function (obj) {
		Game.message(t("Works on player"))
	}
});
ArrowTalisman(true, {
	name: "Cripple", texture: "cripple", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 12], 372, 309], use: function (obj) {
		if (63 != Entity.getType(obj.Entity))
			Entity.addEffect(obj.Entity, 2, 500, 1, 2, true)
	}
});
ArrowTalisman(false, {
	name: "Destructive I", texture: "destructive_1", spirit: [Spirit.TYPE.ARBOW, 10],
	recipe: [339, [351, 0], 262, 274], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Destructive II", texture: "destructive_2", spirit: [Spirit.TYPE.ARBOW, 100],
	recipe: [339, [351, 12], 262, 257], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Destructive III", texture: "destructive_3", spirit: [Spirit.TYPE.ARBOW, 300],
	recipe: [339, [351, 1], 262, 278], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Disarm", texture: "disarm", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, [351, 7], 262, 35, 40], use: function (obj) {
		Game.message(t("Not working, this is multiplayer item..."))
	}
});
ArrowTalisman(true, {
	name: "Explosive", texture: "explosive", spirit: [Spirit.TYPE.NEBLAZE, 120],
	recipe: [339, 264, 262, 46, 347], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, 1, false)
	}
});
ArrowTalisman(false, {
	name: "Extinguish Fire", texture: "extinguish", spirit: [Spirit.TYPE.BLIZRABI, 10],
	recipe: [339, 264, 262, 326], use: function (obj) {
		Game.message(t("Removes all fire in 7x7x7"))
	}
});
ArrowTalisman(false, {
	name: "Fiery mark", texture: "fiery_mark", spirit: [Spirit.TYPE.TIMBER, 120],
	recipe: [339, [351, 1], 262, 385, 289, 259], use: function (obj) {
		Game.message(t("Explodes entity after 10 seconds"))
	}
});
ArrowTalisman(false, {
	name: "Fill Lungs", texture: "fill_lungs", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, 264, 262, 338, 287, 326], use: function (obj) {
		Game.message(t("Damage entity every 3 second 6HP"))
	}
});
ArrowTalisman(true, {
	name: "Flak", texture: "flak", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, 264, 262, 46, 347], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, 1, false)
	}
});
ArrowTalisman(true, {
	name: "Force", texture: "force", spirit: [Spirit.TYPE.ARBOW, 120],
	recipe: [339, [351, 3], 262, 42], use: function (obj) {
		if (obj.Entity) {
			let l = 0, def = { x: 0, y: 0, z: 0 };
			for (let i = 0; i < 100; i++) {
				l = Entity.getLookVector(Player.get());
				if (l != def) break;
			}
			Entity.moveToLook(obj.Entity, { speed: 20, jumpVel: 2 })
		}
	}
});
ArrowTalisman(true, {
	name: "Gamble", texture: "gamble", spirit: [Spirit.TYPE.ARBOW, 5],
	recipe: [339, [351, 2], 262, 280, 280, 280, 264], use: function (obj) {
		if (obj.Entity && random(0, 10) == 5)
			Entity.damageEntity(obj.Entity, 40);
		else
			Entity.damageEntity(obj.Entity, 10)
	}
});
ArrowTalisman(false, {
	name: "Hand swap", texture: "hand_swap", spirit: [Spirit.TYPE.ARBOW, 60],
	recipe: [339, 264, 262, 287], use: function (obj) {
		Game.message(t("Works on player, swaps items from one hand to second"))
	}
});
ArrowTalisman(true, {
	name: "High speed", texture: "high_speed", spirit: [Spirit.TYPE.ARBOW, 40],
	recipe: [339, [351, 12], 262, 46, 331], use: function (obj) {
		if (obj.Arrow) {
			obj.Arrow.speed = 10;
		}
	}
});
ArrowTalisman(false, {
	name: "Hollow leg", texture: "hollow_leg", spirit: [Spirit.TYPE.TIMBER, 40],
	recipe: [339, 264, 297, 325], use: function (obj) {
		Game.message(t("Works on Players, adds infinity hunger"))
	}
});
ArrowTalisman(false, {
	name: "Hover Bubble", texture: "hover_bubble", spirit: [Spirit.TYPE.ARBOW, 150],
	recipe: [339, [351, 13], 262, 288], use: function (obj) {
		Game.message(t("Works if player sitting and walking in 13x13x13 zone like hovering"))
	}
});
ArrowTalisman(true, {
	name: "Hyper Speed", texture: "hyper_speed", spirit: [Spirit.TYPE.ARBOW, 400],
	recipe: [339, [351, 12], 262, 46, 152], use: function (obj) {
		if (obj.Arrow) {
			obj.Arrow.speed = 10;
		}
	}
});
ArrowTalisman(false, {
	name: "Ice Breaker", texture: "ice_breaker", spirit: [Spirit.TYPE.BLIZRABI, 60],
	recipe: [339, [351, 6], 262, 79, 285], use: function (obj) {
		Game.message(t("Breaks all ice in 65x4x65"))
	}
});
ArrowTalisman(false, {
	name: "Ice Sphere", texture: "ice_sphere", spirit: [Spirit.TYPE.BLIZRABI, 60],
	recipe: [339, [351, 4], 326, 326, 79], use: function (obj) {
		Game.message(t("Creates an ice sphere r=6 + r=7"))
	}
});
ArrowTalisman(true, {
	name: "Impulse", texture: "impulse", spirit: [Spirit.TYPE.ARBOW, 30],
	recipe: [339, [351, 3], 262, 265], use: function (obj) {
		if (obj.Entity) {
			let l = 0, def = { x: 0, y: 0, z: 0 };
			for (let i = 0; i < 100; i++) {
				l = Entity.getLookVector(Player.get());
				if (l != def) break;
			}
			Entity.moveToLook(obj.Entity, { speed: 5, jumpVel: 2 })
		}
	}
});
ArrowTalisman(true, {
	name: "Incendiary", texture: "incendiary", spirit: [Spirit.TYPE.ARBOW, 40],
	recipe: [339, [351, 1], 262, 377], use: function (obj) {
		for (let i in fire) {
			var coord = fire[i];
			var coords = { x: coord.x + Math.floor(obj.x), y: Math.floor(obj.y), z: coord.z + Math.floor(obj.z) }
			if (World.getBlock(coords.x, coords.y, coords.z) != 0) {
				if (World.getBlock(coords.x, coords.y, coords.z).id == 0) World.setBlock(coords.x, coords.y, coords.z, 51);
				if (World.getBlock(coords.x, coords.y + 1, coords.z).id == 0) World.setBlock(coords.x, coords.y + 1, coords.z, 51);
				else if (World.getBlock(coords.x, coords.y + 2, coords.z).id == 0) World.setBlock(coords.x, coords.y + 2, coords.z, 51);
				if (World.getBlock(coords.x, coords.y - 1, coords.z).id == 0) World.setBlock(coords.x, coords.y - 1, coords.z, 51);
				else if (World.getBlock(coords.x, coords.y - 2, coords.z).id == 0) World.setBlock(coords.x, coords.y - 2, coords.z, 51);
			}
		}
	}
});
ArrowTalisman(true, {
	name: "Life Steal", texture: "life_steal", spirit: [Spirit.TYPE.LOON, 20],
	recipe: [339, [351, 9], 262, 322], use: function (obj) {
		if (obj.Entity != -1) {
			Entity.healEntity(Player.get(), 3)
			Entity.damageEntity(obj.Entity, 9)
		}
	}
});
ArrowTalisman(false, {
	name: "Limp leg", texture: "limp_leg", spirit: [Spirit.TYPE.TIMBER, 120],
	recipe: [339, [351, 8], 352, 40, 309], use: function (obj) {
		Player.addVelocity(0, -1, 0)
	}
});
ArrowTalisman(false, {
	name: "Lucky", texture: "lucky", spirit: [Spirit.TYPE.LOON, 30],
	recipe: [339, [351, 1], 262, 41], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Mine", texture: "mine", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, 264, 262, 46, 70], use: function (obj) {
		var data = [];
		Callback.addCallback("tick", function () {
			var c = Player.getPosition();
			if (Math.floor(c.x) == data[0] && Math.floor(c.y) == data[1] && Math.floor(c.z) == data[2])
				World.explode(c.x, c.y, c.z, 5, false);
		});
	}
});
ArrowTalisman(true, {
	name: "Nuke", texture: "nuke", spirit: [Spirit.TYPE.NEBLAZE, 400],
	recipe: [339, [351, 1], 262, 46, 46, 46], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, random(10, 20), true);
	}
});
ArrowTalisman(false, {
	name: "Petrification", texture: "petrification", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 13], 1, 219], use: function (obj) {
		Game.message(t("Add hunger to creature, when moving, to lift - stand several seconds"))
	}
});
ArrowTalisman(true, {
	name: "Piercing", texture: "piercing", spirit: [Spirit.TYPE.ARBOW, 40],
	recipe: [339, 264, 262, 388], use: function (obj) {
		if (obj.Entity) {
			Entity.damageEntity(obj.Entity, 1)
			Entity.healEntity(obj.Entity, 3)
		}
	}
});
ArrowTalisman(true, {
	name: "Reinforced I", texture: "reinforced_1", spirit: [Spirit.TYPE.SQUAREFURY, 10],
	recipe: [339, [351, 11], 262, 265], use: function (obj) {
		if (obj.Entity) Entity.damageEntity(obj.Entity, 4)
	}
});
ArrowTalisman(true, {
	name: "Reinforced II", texture: "reinforced_2", spirit: [Spirit.TYPE.SQUAREFURY, 100],
	recipe: [339, [351, 4], 262, 266], use: function (obj) {
		if (obj.Entity) Entity.damageEntity(obj.Entity, 8)
	}
});
ArrowTalisman(true, {
	name: "Reinforced III", texture: "reinforced_3", spirit: [Spirit.TYPE.SQUAREFURY, 400],
	recipe: [339, [351, 1], 262, 264], use: function (obj) {
		if (obj.Entity) Entity.damageEntity(obj.Entity, 16)
	}
});
ArrowTalisman(false, {
	name: "Ricochet", texture: "ricochet", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, 264, 262, 341], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Roots", texture: "roots", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 3], 32], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Skyfall", texture: "skyfall", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 15], 262, 288, 287], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Sniper", texture: "sniper", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, [351, 14], 262, 381], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Spooky", texture: "spooky", spirit: [Spirit.TYPE.LOON, 30],
	recipe: [339, 264, 262, 397], use: function (obj) {

	}
});
ArrowTalisman(true, {
	name: "Stasis", texture: "stasis", spirit: [Spirit.TYPE.LOON, 80],
	recipe: [339, [351, 4], 262, 406], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "suffocating_fumes", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 8], 262, 88, 367], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "tracer", spirit: [Spirit.TYPE.ARBOW, 10],
	recipe: [339, [351, 4], 262, 348], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "vacuum", spirit: [Spirit.TYPE.LOON, 80],
	recipe: [339, [351, 5], 262, 49], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "wind", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 8], 262, 331, 420], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "yummy", spirit: [Spirit.TYPE.TIMBER, 140],
	recipe: [339, [351, 3], 262, 319, 363, 365, 349], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "zero", spirit: [Spirit.TYPE.ARBOW, 30],
	recipe: [339, 264, 262, 368], use: function (obj) {

	}
});
// ArrowTalisman(true, {
// 	name: "", texture: "", spirit: [],
// 	recipe: , use: function (obj) {

// 	}
// });




// file: mod/items/Talisman/Blade.js

BladeTalisman(false, {
	name: "Blade of snow", texture: "blade_of_snow", spirit: [1, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Butchering strike", texture: "butchering_strike", spirit: [8, 20],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Confusion", texture: "confusion", spirit: [8, 20],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Corrosion", texture: "corrosion", spirit: [8, 30],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Crawling mist", texture: "crawling_mist", spirit: [9, 80],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Fiery mark", texture: "fiery_mark", spirit: [5, 120],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Fill lungs", texture: "fill_lungs", spirit: [9, 100],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Gamble", texture: "gamble", spirit: [8, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Hand swap", texture: "hand_swap", spirit: [8, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Heavy blade", texture: "heavy", spirit: [8, 30],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Holy blade", texture: "holy", spirit: [8, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Hungry blade", texture: "hungry", spirit: [8, 10],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Inflame", texture: "inflame", spirit: [5, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Lucky strike", texture: "lucky_strike", spirit: [8, 10],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Memory blade", texture: "memory", spirit: [8, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Obliteration", texture: "obliteration", spirit: [8, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Poison coating", texture: "poison_coating", spirit: [8, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Rain sword", texture: "rain_sword", spirit: [1, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Skyfall", texture: "skyfall", spirit: [9, 80],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Suffocating fumes", texture: "suffocating_fumes", spirit: [9, 100],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Vengeful blade", texture: "vengeful", spirit: [8, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Wind leash", texture: "wind_leash", spirit: [9, 80],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Wither coating", texture: "wither_coating", spirit: [9, 5],
	recipe: [], use: function (obj) {

	}
});
BladeTalisman(false, {
	name: "Yummy smell", texture: "yummy_smell", spirit: [9, 140],
	recipe: [], use: function (obj) {

	}
});




// file: mod/items/Talisman/Spell.js

SpellTalisman(false, {
	name: "Armor of pacifist", texture: "armor_of_pacifist", spirit: [1, 80000],
	recipe: [], use: function (obj) {
		
	}
});
SpellTalisman(false, {
	name: "Arrow deflection", texture: "arrow_deflection", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Arrow throw", texture: "arrow_throw", spirit: [0, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Bind ice arrows", texture: "bind_ice_arrows", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Blade of grass", texture: "blade_of_grass", spirit: [9, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Blazing palm", texture: "blazing_palm", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Blink", texture: "blink", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Blood of grass", texture: "blood_of_grass", spirit: [9, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Bonemeal", texture: "bonemeal", spirit: [9, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build column", texture: "build_column", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build cylinder", texture: "build_cylinder", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build extrusion", texture: "build_extrusion", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build floor", texture: "build_floor", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build from surface", texture: "build_from_surface", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build hollow sphere", texture: "build_hollow_sphere", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build horizontal line", texture: "build_horizontal_line", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build sphere", texture: "build_sphere", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build square floor", texture: "build_square_floor", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build square wall", texture: "build_square_wall", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build template", texture: "build_template", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Build wall", texture: "build_wall", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Clock", texture: "clock", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Combustion", texture: "combustion", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Consuming fury", texture: "consuming_fury", spirit: [8, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Copy area", texture: "copy_area", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Copy blocks", texture: "copy_blocks", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Copy cuboid", texture: "copy_cuboid", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Crushing palm", texture: "crushing_palm", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Crystalline road", texture: "crystalline_road", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Crystallize memory", texture: "crystallize_memory", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Deserialize memory", texture: "deserialize_memory", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Destroy cuboid remotely", texture: "destroy_cuboid_remotely", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Distant spark", texture: "distant_spark", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Earthen dive", texture: "earthen_dive", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Empower axe", texture: "empower_axe", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Empower pickaxe", texture: "empower_pickaxe", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Escape plan", texture: "escape_plan", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Ethereal flash", texture: "ethereal_flash", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Ethereal light", texture: "ethereal_light", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Evil eye", texture: "evil_eye", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Extreme buoyancy", texture: "extreme_buoyancy", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Fall negation", texture: "fall_negation", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Fins", texture: "fins", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Flood", texture: "flood", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Focused fury", texture: "focused_fury", spirit: [8, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Follow", texture: "follow", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Frost wave", texture: "frost_wave", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Gills", texture: "gills", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Green cycle", texture: "green_cycle", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Ground flow", texture: "ground_flow", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Grudge", texture: "grudge", spirit: [8, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Harvest", texture: "harvest", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Heat wave", texture: "heat_wave", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Hellisphere", texture: "hellisphere", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Hovering", texture: "hovering", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Ice bubble", texture: "ice_bubble", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Ice surface", texture: "ice_surface", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Ignition", texture: "ignition", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Infernal touch", texture: "infernal_touch", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Instant dive", texture: "instant_dive", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Invite gem", texture: "invite_gem", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Invite pebble", texture: "invite_pebble", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Lake thawing", texture: "lake_thawing", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Miners focus", texture: "miners_focus", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Mist blade", texture: "mist_blade", spirit: [8, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Molten skin", texture: "molten_skin", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Nether surge", texture: "nether_surge", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Night eye", texture: "night_eye", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Obsidian bubble", texture: "obsidian_bubble", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Obsidian road", texture: "obsidian_road", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Pearl crumbs", texture: "pearl_crumbs", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Piercing inferno", texture: "piercing_inferno", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Ping", texture: "ping", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Place block", texture: "place_block", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Place torch", texture: "place_torch", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Prismatic eyes", texture: "prismatic_eyes", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Pull side", texture: "pull_side", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Push side", texture: "push_side", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Red pulse", texture: "red_pulse", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Red signal", texture: "red_signal", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Redo", texture: "redo", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Remote chest", texture: "remote_chest", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Replace blocks", texture: "replace_blocks", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Replace cuboid", texture: "replace_cuboid", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Replace side", texture: "replace_side", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Replace surface", texture: "replace_surface", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Rotten might", texture: "rotten_might", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Searing pulse", texture: "searing_pulse", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Serialize memory", texture: "serialize_memory", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Small fireball throw", texture: "small_fireball_throw", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Snowball throw", texture: "snowball_throw", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Spider might", texture: "spider_might", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Starvation", texture: "starvation", spirit: [9, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Stone fever", texture: "stone_fever", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Stoneball throw", texture: "stoneball_throw", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon blaze", texture: "summon_blaze", spirit: [5, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon cave spider", texture: "summon_cave_spider", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon creeper", texture: "summon_creeper", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon husk", texture: "summon_husk", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon skeleton", texture: "summon_skeleton", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon spider", texture: "summon_spider", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon stray", texture: "summon_stray", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Summon zombie", texture: "summon_zombie", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Surface blink", texture: "surface_blink", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Surface shift", texture: "surface_shift", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Target", texture: "target", spirit: [3, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Toadic jump", texture: "toadic_jump", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Undo", texture: "undo", spirit: [4, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Vitalize", texture: "vitalize", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Wall slip", texture: "wall_slip", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Warp", texture: "warp", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Warp gem", texture: "warp_gem", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Warp pebble", texture: "warp_pebble", spirit: [2, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Wild sprint", texture: "wild_sprint", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Wind step", texture: "wind_step", spirit: [6, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Winter breath", texture: "winter_breath", spirit: [1, 80000],
	recipe: [], use: function (obj) {

	}
});
SpellTalisman(false, {
	name: "Wooden punch", texture: "wooden_punch", spirit: [7, 80000],
	recipe: [], use: function (obj) {

	}
});




// file: mod/items/Talisman/Tool.js

ToolTalisman(false, {
	name: "Aquatic", texture: "aquatic", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Break blocks", texture: "break_blocks", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Break radius", texture: "break_radius", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Break side", texture: "break_side", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Break surface", texture: "break_surface", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Destroy blocks", texture: "destroy_blocks", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Destroy cuboid", texture: "destroy_cuboid", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Destroy side", texture: "destroy_side", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Destroy surface", texture: "destroy_surface", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Fell tree", texture: "fell_tree", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Ground pick", texture: "ground_pick", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Ice carving", texture: "ice_carving", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Memory tool", texture: "memory_tool", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Molten tool", texture: "molten_tool", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Obsidian carving", texture: "obsidian_carving", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Void tool", texture: "void_tool", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Volcanic glass cutter", texture: "volcanic_glass_cutter", spirit: [],
	recipe: [], use: function (obj) {

	}
});
ToolTalisman(false, {
	name: "Wood peck", texture: "wood_peck", spirit: [],
	recipe: [], use: function (obj) {

	}
});




// file: mod/items/Bone_Dagger.js

function random(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}
regItem("bone_dagger", "Bone Dagger", 1)
regItem("bone_dagger_awakened", "Bone Dagger Awakened", 1)

Recipes.addShaped({ id: ItemID.bone_dagger, count: 1, data: 0 },
	["  a", "bc ", "db "], ['a', 352, 0, 'b', 1, 0, 'c', 264, 0, 'd', 280, 0]);

function DropShard(v, isCarriedBDA) {
	var rand = (random(0, 3) == 1), drop=0, pos = Entity.getPosition(v);
	switch (Entity.getType(v)) {
		/*Enderman*/ 
		case 38: drop = ItemID.end_soul_shard; break; 
		/*Villager*/
		case 15: drop = ItemID.mind_soul_shard; break;
		/*LAVA SLIME|BLAZE|GHAST|PIGMAN|WITHER SKELETON*/
		case 38: case 41: case 42: case 43: case 48: drop = ItemID.nether_soul_shard; break;
		/*COW|CHICKEN|MUSHROOM COW|OCELOT|PIG|RABBIT|SHEEP*/
		case 10: case 11: case 12: case 13: case 16: case 18: case 22: drop = ItemID.peace_soul_shard; break;
		/*ZOMBIE|SKELETON*/
		case 32: case 34: drop = ItemID.undeath_soul_shard; break;
		/*SQUID|GUARDIANS*/
		case 17: case 49: drop = ItemID.water_soul_shard; break;
		/*SLIME|CREEPER|SPIDER*/
		case 33: case 35: case 37: drop = ItemID.wild_soul_shard; break;
		/*None*/
		default: drop = 0; break;
	}
	(rand && isCarriedBDA && drop!=0) ? World.drop(pos.x, pos.y, pos.z, drop, 1, 1) : null;
}
Callback.addCallback("PlayerAttack", function (p, v) {
	var rand = random(0, 10), daggerAw = ItemID.bone_dagger_awakened,
		isCarriedBD = (Player.getCarriedItem().id === ItemID.bone_dagger);
		isCarriedBDA = (Player.getCarriedItem().id === ItemID.bone_dagger_awakened);
	if (rand == 10 && isCarriedBD) {
		Player.setCarriedItem(daggerAw, 1, 0);
	}
	DropShard(v, isCarriedBDA);
});




// file: mod/items/CIM Items.js

CIM.reg(ItemID.ritual_pouch, { gui: pouch, name: "Ritual Pouch" }, false, false);
CIM.reg(ItemID.book_green, { gui: greenBladeInv, name: "Green Spell Blade book" }, true, true);
CIM.reg(ItemID.book_red, { gui: redBladeInv, name: "Red Spell Blade book" }, true, true);
CIM.reg(ItemID.book_blue, { gui: bluePickInv, name: "Blue Spell Pickaxe book" }, true, true);
CIM.reg(ItemID.book_orange, { gui: orangePickInv, name: "Orange Spell Pickaxe book" }, true, true);
CIM.reg(ItemID.book_bow, { gui: bowInv, name: "Spell bow book" }, true, true);
CIM.reg(ItemID.grimoire, { gui: grimoireInv, name: "Grimoire" }, true, true);
CIM.reg(ItemID.contract_binder, { gui: contractInv, name: "Contract binder" }, true, true);
var invItems = [
	[ItemID.blade_green, ItemID.book_green],
	[ItemID.blade_red, ItemID.book_red],
	[ItemID.pick_blue, ItemID.book_blue],
	[ItemID.pick_orange, ItemID.book_orange],
	[ItemID.spell_bow, ItemID.book_bow],
	[ItemID.grimoire, ItemID.grimoire],
	[ItemID.contract_binder],
]
function ItemInv() {
	var item = Player.getCarriedItem(),
		id = item.id, data = item.data, extra = item.extra,
		sneaking = Entity.getSneaking(Player.get());
	for (var i in invItems) {
		var t = invItems[i];
		if (sneaking && id == t[0] && t[0] !== t[1]) Player.setCarriedItem(t[1], 1, data, extra);
		if (sneaking && id == t[1] && t[0] !== t[1]) Player.setCarriedItem(t[0], 1, data, extra);
		if ((!sneaking && id == t[1] && t[0] !== t[1]) || (sneaking && id == t[0] && t[0] == t[1]) || (!sneaking && id == t[0] && !t[1]))
			CIM.openGuiFor(id, data, extra, true);
		// if (sneaking == false && item.id == temp[1]) alert(CIM.containers["e" + item.extra.getInt("extraCount")].getSlot("slot_27").id);
	}
}
Callback.addCallback("ItemUse", function (coords, item, block) {
	ItemInv();
});




// file: mod/blocks/bath_heater.js

regBlock("bath_heater", "Bath Heater", [
	["bath_heater_bottom", 0],
	["bath_heater_top_inactive", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0]
], true);
Recipes.addShaped({
	id: BlockID.bath_heater,
	count: 1,
	data: 0
}, ["aba", "cdc", "aaa"], ['a', 1, 0, 'b', 61, 0, 'c', 4, 0, 'd', 54, 0]);

var staticModel_inactive = new BlockRenderer.Model([
	["bath_heater_bottom", 0],
	["bath_heater_top_inactive", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0]
]); // модификация модели staticModel 
var icRenderModel_inactive = new ICRender.Model();
icRenderModel_inactive.addEntry(staticModel_inactive);
BlockRenderer.enableCoordMapping(BlockID.bath_heater, -1, icRenderModel_inactive)

var staticModel_active = new BlockRenderer.Model([
	["bath_heater_bottom", 0],
	["bath_heater_top_active", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0],
	["bath_heater_side", 0]
]); // модификация модели staticModel 
var icRenderModel_active = new ICRender.Model();
icRenderModel_active.addEntry(staticModel_active);
// BlockRenderer.setStaticICRender(BlockID.testRenderBlock, -1, icRenderModel);

var Bubble = Particles.registerParticleType({
	type: 1,
	texture: "bubble",
	size: [0.4, 0.7],
	lifetime: [20, 60],
	velocity: [0, 0.005, 0]
});

var emitter = new Particles.ParticleEmitter(0, 0, 0);
var Emit = function (x, y, z) {
	var vy = Math.random();
	if (vy < 0.5) vy = 0.7;
	emitter.emit(Native.ParticleType.bubble, 0, x + Math.random(), y + vy, z + Math.random())
}

var blend = {
	list: {},
	effects: {},
	reg: function (texture, name, ingredients, spiritID) {
		regItem(texture, name, 64);
		this.list[ItemID[texture]] = spiritID;
		if (ingredients) Recipes.addShaped({ id: ItemID[texture], count: 1, data: 0 }, ["aaa", "aba", "aaa"], ingredients);
		// if (spiritID === 0 || spiritID) this.addBlendEffect(ItemID[texture], spiritID);
		EffectAPI.getEffect(spiritID);
	},
	isValid: function (id) {
		if (id in this.list) return true;
		else return false;
	}
}

EffectAPI.addEffect({
	effectID: 0, name: "Hunters aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.arbow_marked_glass, 0);
		if (Spirit.get.Active(0) && slot) {
			Callback.invokeCallback("ArbowSpirit", slot);
		}
	}
});
EffectAPI.addEffect({
	effectID: 1, name: "Frosty aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.blizrabi_marked_glass, 0);
		if (Spirit.get.Active(1) && slot) {
			Callback.invokeCallback("BlizrabiSpirit", slot);
		}
	}
});

let da = [false, false];
EffectAPI.addEffect({
	effectID: 2, name: "Distorted aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.endererer_marked_glass, 0);
		if (Spirit.get.Active(2) && slot) {
			Callback.invokeCallback("EnderererSpirit", slot, da);
		}
	}
});
EffectAPI.addEffect({
	effectID: 3, name: "Calling aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.loon_marked_glass, 0);
		if (Spirit.get.Active(3) && slot) {
			Callback.invokeCallback("LoonSpirit", slot);
		}
	}
});
EffectAPI.addEffect({
	effectID: 5, name: "Charred aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.neblaze_marked_glass, 0);
		if (Spirit.get.Active(5) && slot) {
			Callback.invokeCallback("NeblazeSpirit", slot);
		}
	}
	//TODO: replace id 9 to fire block id
});
EffectAPI.addEffect({
	effectID: 6, name: "Energetic aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.redwind_marked_glass, 0);
		if (Spirit.get.Active(6) && slot) {
			Callback.invokeCallback("RedwindSpirit", slot);
		}
	}
});
EffectAPI.addEffect({
	effectID: 7, name: "Mineral aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.romol_marked_glass, 0);
		if (Spirit.get.Active(7) && slot) {
			Callback.invokeCallback("RomolSpirit", slot);
		}
	}
});
EffectAPI.addEffect({
	effectID: 8, name: "Visceral aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.squarefury_marked_glass, 0);
		if (Spirit.get.Active(8) && slot) {
			Callback.invokeCallback("SquarefurySpirit", slot);
		}
	}
});
EffectAPI.addEffect({
	effectID: 9, name: "Arboreal aura", type: 1,
	func: function () {
		let slot = Inventory.getItemSlot(ItemID.timber_marked_glass, 0);
		if (Spirit.get.Active(9) && slot) {
			Callback.invokeCallback("TimberSpirit", slot);
		}
	}
	//TODO: replace id 9 to any wood
});

blend.reg("feathers_blend", "Calm feather blend", ['a', ItemID.peace_soul_shard, 0, 'b', 288, 0], 0);
blend.reg("snow_blend", "Evercold snow blend", ['a', ItemID.water_soul_shard, 0, 'b', 332, 0], 1);
blend.reg("ender_pearl_blend", "Distorted pearl blend", ['a', ItemID.end_soul_shard, 0, 'b', 368, 0], 2);
blend.reg("lapis_blend", "Undead lapis blend", ['a', ItemID.undeath_soul_shard, 0, 'b', 351, 4], 3);
blend.reg("charcoal_blend", "Nether Charcoal blend", ['a', ItemID.nether_soul_shard, 0, 'b', 263, 1], 5);
blend.reg("redstone_blend", "Mystic redstone blend", ['a', ItemID.will_soul_shard, 0, 'b', 331, 0], 6);
blend.reg("flint_blend", "Tool flint blend", ['a', ItemID.mind_soul_shard, 0, 'b', 318, 0], 7);
blend.reg("fleshy_blend", "Wild flesh blend", ['a', ItemID.wild_soul_shard, 0, 'b', 319, 0], 8);
blend.reg("wood_blend", "Cursed wood blend", ['a', ItemID.wither_soul_shard, 0, 'b', 5, -1], 9);
blend.reg("ethereal_goo_blend", "Ethereal goo blend");

var bathHeater_UI = new UI.StandartWindow({
	standart: {
		header: { text: { text: "Created With UIEditor" } },
		background: { color: android.graphics.Color.parseColor("#C6C6C6") }, inventory: { standart: true }
	},
	drawing: [],
	elements: {
		"image_0": { type: "image", x: 380, y: 120, bitmap: "bath.bath_heater", scale: 3.2 },
		"debug": { type: "text", x: 380, y: 80, width: 1e3, height: 20, text: "текст", font: { size: 8 } },
		"blend": {
			type: "slot", x: 479, y: 120, size: 58, bitmap: "bath.slot_default", isValid: function (id, count, data) {
				return blend.isValid(id);
			}
		},
		"fuel": {
			type: "slot", x: 479, y: 231, size: 58, bitmap: "bath.slot_default", isValid: function (id, count, data) {
				return Recipes.getFuelBurnDuration(id, data) > 0;
			}
		},
		"burn": { type: "scale", x: 486, y: 184, direction: 1, bitmap: "bath.burn", scale: 3.15, value: 0 }, //burn
		"scale_0": { type: "scale", x: 547, y: 129, direction: 0, bitmap: "bath.scale_toLeft", scale: 3.2, value: 0 }, //right bubble
		"scale_1": { type: "scale", x: 377, y: 129, direction: 2, bitmap: "bath.scale_toRight", scale: 3.2, value: 0 }, //left bubble
	}
});
TileEntity.registerPrototype(BlockID.bath_heater, {
	defaultValues: {
		work: false,
		item: false,
		id: null,
		progressItem: 0,
		burn: 0,
		burnMax: 0
	},
	getFuel: function (slotName) {
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0) {
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				return burn;
			}
		}
		return 0;
	},//eff +25s every 5 secs, burns 1 minute
	genBubbles: function (x, y, z) {
		for (var x1 = -3; 3 >= x1; x1++)
			for (var block, z1 = -3; 3 >= z1; z1++)
				block = World.getBlock(x + x1, y, z + z1),
					(block.id == 9 || block.id == 8) &&
					Emit(x + x1, y, z + z1);
	},
	getPlayer: function (x, y, z) {
		for (var x1 = -3; 3 >= x1; x1++)
			for (var pos, z1 = -3; 3 >= z1; z1++) {
				pos = Player.getPosition();
				// alert(Math.floor(pos.y-1)+" "+y);
				if (Math.floor(pos.x) == (x + x1) && Math.floor(pos.y - 1) == y && Math.floor(pos.z) == (z + z1)) {
					EffectAPI.addTime(blend.list[this.data.id], 500);
					break;
				}
			}
	},
	getGuiScreen: function () { return bathHeater_UI; },
	tick: function () {
		let ticks = World.getThreadTime();
		var item = this.container.getSlot("blend");
		if (ticks % 20 == 0) {
			if (this.data.work && item.count >= 1 && this.data.item == false && !this.data.id) {
				item.count--;
				this.data.id = item.id;
				this.data.item = true;
				this.data.progressItem = 1200;
				EffectAPI.setPlayerEffect(blend.list[this.data.id], 120),
					this.container.validateSlot("blend");
			};

			if (this.data.burn <= 0) {
				this.data.work = false, this.data.burn = this.data.burnMax = this.getFuel("fuel");
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			};
			if (this.data.burn > 0) {
				this.data.work = true;
			}
		}
		if (this.data.burn > 0) {
			this.data.burn--;
			BlockRenderer.mapAtCoords(this.x, this.y, this.z, icRenderModel_active);
			if (ticks % 40 == 0) this.genBubbles(this.x, this.y, this.z);
			if (this.data.item && this.data.progressItem != 0 && this.data.id != null) { this.data.progressItem-- }
			if (ticks % 100 == 0 && this.data.progressItem > 100) { this.getPlayer(this.x, this.y, this.z) }
		};

		if (this.data.progressItem == 0) { this.data.item = false, this.data.id = null };
		this.container.setScale("burn", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("scale_0", this.data.progressItem / 1200 || 0);
		this.container.setScale("scale_1", this.data.progressItem / 1200 || 0);
	}
});




// file: mod/blocks/recipes.js

// Recipes.addShaped({ id: BlockID.gold_medium, count: 1, data: 0 }, 
// ["aa", "bc", ""], ['a', 351, 0, 'b', 41, 0, 'c', ItemID.bone_dagger_awakened, 0], function(){
// 	Player.addItemToInventory(ItemID.bone_dagger_awakened, 1, 0)
// });
// Recipes.addShaped({ id: BlockID.iron_medium, count: 1, data: 0 }, 
// ["aa", "bc", ""], ['a', 351, 0, 'b', 42, 0, 'c', ItemID.bone_dagger_awakened, 0], function(){
// 	Player.addItemToInventory(ItemID.bone_dagger_awakened, 1, 0)
// });
// Recipes.addShaped({ id: BlockID.lapis_medium, count: 1, data: 0 }, 
// ["aa", "bc", ""], ['a', 351, 0, 'b', 22, 0, 'c', ItemID.bone_dagger_awakened, 0], function(){
// 	Player.addItemToInventory(ItemID.bone_dagger_awakened, 1, 0)
// });
// Recipes.addShaped({ id: BlockID.log_medium, count: 1, data: 0 }, 
// ["aa", "bc", ""], ['a', 351, 0, 'b', 17, -1, 'c', ItemID.bone_dagger_awakened, 0], function(){
// 	Player.addItemToInventory(ItemID.bone_dagger_awakened, 1, 0)
// });
// Recipes.addShaped({ id: BlockID.obsidian_medium, count: 1, data: 0 }, 
// ["aa", "bc", ""], ['a', 351, 0, 'b', 49, 0, 'c', ItemID.bone_dagger_awakened, 0], function(){
// 	Player.addItemToInventory(ItemID.bone_dagger_awakened, 1, 0)
// });
// Recipes.addShaped({ id: BlockID.redstone_medium, count: 1, data: 0 }, 
// ["aa", "bc", ""], ['a', 351, 0, 'b', 152, 0, 'c', ItemID.bone_dagger_awakened, 0], function(){
// 	Player.addItemToInventory(ItemID.bone_dagger_awakened, 1, 0)
// });
__config__.set("firstStart", false)
__config__.save()




// file: Api/DevCore.js

var A = {
	DP: android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, UI.getContext().getResources().getDisplayMetrics()),
	ctx: UI.getContext(),
	DecorView: UI.getContext().getWindow().getDecorView(),
	Button: android.widget.Button,
	ToggleButton: android.widget.ToggleButton,
	TextView: android.widget.TextView,
	ImageView: android.widget.ImageView,
	View: android.view.View,
	Toast: android.widget.Toast,
	LinearLayout: android.widget.LinearLayout,
	RelativeLayout: android.widget.RelativeLayout,
	LayoutParams: android.widget.RelativeLayout.LayoutParams,
	WRAP: android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
	PARENT: android.widget.RelativeLayout.LayoutParams.MATCH_PARENT,
	VERTICAL: android.widget.LinearLayout.VERTICAL,
	HORIZONTAL: android.widget.LinearLayout.HORIZONTAL,
	FrameLayout: android.widget.FrameLayout,
	PopupWindow: android.widget.PopupWindow,
	OnDismissListener: android.widget.PopupWindow.OnDismissListener,
	OnCheckedChangeListener: android.widget.CompoundButton.OnCheckedChangeListener,
	WIDTH: UI.getContext().getScreenWidth(),
	HEIGHT: UI.getContext().getScreenHeight(),
	ScrollView: android.widget.ScrollView,
	HorizontalScrollView: android.widget.HorizontalScrollView,
	SeekBar: android.widget.SeekBar,
	EditText: android.widget.EditText,
	GONE: android.view.View.GONE,
	VISIBLE: android.view.View.VISIBLE,
	INVISIBLE: android.view.View.INVISIBLE,
	OnTouchListener: android.view.View.OnTouchListener,
	OnClickListener: android.view.View.OnClickListener,
	MotionEvent: android.view.MotionEvent,
	Gravity: android.view.Gravity,
	TOP: android.view.Gravity.TOP,
	BOTTOM: android.view.Gravity.BOTTOM,
	LEFT: android.view.Gravity.LEFT,
	RIGHT: android.view.Gravity.RIGHT,
	CENTER: android.view.Gravity.CENTER,
	ViewGroup: android.view.ViewGroup,
	AlertDialog: android.app.AlertDialog,
	Intent: android.content.Intent,
	Uri: android.net.Uri,
	Bitmap: android.graphics.Bitmap,
	Canvas: android.graphics.Canvas,
	Paint: android.graphics.Paint,
	Drawable: android.graphics.drawable.Drawaable,
	BitmapDrawable: android.graphics.drawable.BitmapDrawable,
	ColorDrawable: android.graphics.drawable.ColorDrawable,
	Typeface: android.graphics.Typeface,
	Color: android.graphics.Color,
	BitmapFactory: android.graphics.BitmapFactory,
	PorterDuffColorFilter: android.graphics.PorterDuffColorFilter,
	PorterDuff: android.graphics.PorterDuff,
	File: java.io.File,
	BufferedInputStream: java.io.BufferedInputStream,
	FileInputStream: java.io.FileInputStream,
	InputStream: java.io.InputStream,
	BufferedImage: java.awt.image.BufferedImage,
	Runnable: java.lang.Runnable,
	DownloadManager: android.app.DownloadManager,
};
var Aimgs = {
	log: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAERSURBVFhH7ZVBCsIwEEVb8SauXXgOQQRx52HsXdyJIILncOHas1R/yNRpmmkzmDQIfVASmpCZzOtoWdd1IfF4vuRFJavlorTTFjM7dogZHEjneROIHZzwnetVwDeer3cz7rfrZh4C9ktwHYMJpIKSEL+B1NAlgxUQGhV9GgCqkE0BQALZFBAqBdpO8MG1TAqAugvALyomBS7BCmJ0AJgUuJgKbHaHaDeujpUZJV1eBSkSCKGj4HY52dl4JPsGoMD3uMzt2AtV5qPKjMCtFl8D3HUfgxVAIByOh4Lyd25gLdkVtLpAKiu957eV9mq7IEobkhIwSgLS7cHf/RCZBFyy/xlhwU6TQTHENkyZxPfsongDbqfxJl9pNRIAAAAASUVORK5CYII=",
	move: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAEdSURBVFhH7VfLDoMgEMT+X3toj+3n9dpLf9C6G5bggro7YEwTJyEQgZ3hMasO4ziGBsjkIdZuXGKNIFcOrwIVUCOERCAC1ojcIrwCLAQuEV4B6bLdHq/YKttTMYtAjmDICTOk59/P2+4KsmFDYVzvT6pq/ZsFdUE3nAJqAtxedqCIrQXIgD1EVGPnAmYdHi8DSLFFgCaPra7QuYE56XW850o3cbgL5IMEOoIp5XLtHS+gefkXkT4KSz7nORTIkP+ri8yPYBZgGqAFdYOQk2h9B1iEDOiMWWzZsdol5A7DliIoY9MdaCiM83Xcgr8UQPasWXTp+Sq8v2bWwWYHeXdgMzD53JPEkCNYFKGTjAXoJSwIEHJCiwsSEUoeQgg/H7AdQ/sAbHkAAAAASUVORK5CYII=",
	exit: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADoSURBVFhH7ZdRDoQwCETL3nhP4pHZkLSJNnQYcJN+6PvR2MCMAlVFVdtOPv24jWcbEJG3BA1Pgch1UVX6GYaMwyWYkxjetZlkXL4EyARYOxZrtR5I3iWi3oRnwaK4sTbANJwJE+JHP3rgJ8B2PWCIfxe54hLcMBGJG1wPFEww4gbfhAkTrLjBG0jCiBv8B0l21AgD/NuwMudkTGygIj4gYrGBO+KDIMfaACFu3T46HgJylafgMmpEw/31bejOOTl2M2kDcJMpmFgbcJJB8QGI8wg3orl27A7HxNlGtPXX7P0vMLYb2ExrP+jDaAjaazyMAAAAAElFTkSuQmCC",
}
function newThread(func, name) {
	A.ctx.runOnUiThread(new A.Runnable({
		run() {
			try {
				func();
			} catch (e) {
				Logger.Log(e, ' ACore ' + ('] >-< [ ' + name + ' ') || '');
				Logger.LogError(e);
			}
		}
	}));
}
var mc_typeface = A.Typeface.createFromFile(new A.File(FileTools.root + "games/com.mojang/innercore/mc-typeface.ttf"));
var scaling = __config__.access("interface.scaling") || 1;
function resize(value, isWidth) {
	return isWidth
		? (value * scaling / 800 * A.WIDTH)
		: (value * scaling / 480 * A.HEIGHT);
}

// WIDGET - TEXTVIEW
var TextView = function () {
	this.TextView = new A.TextView(A.ctx)
	return this
};
TextView.prototype = {
	setText(text) {
		this.TextView.setText(text || "")
		return this
	},
	setTextSize(size) {
		this.TextView.setTextSize(resize(size))
		return this
	},
	setTextColor(color) {
		this.TextView.setTextColor(color || A.Color.WHITE)
		return this
	},
	setGravity(gravity) {
		this.TextView.setGravity(gravity || A.Gravity.left)
		return this
	},
	setTypeface(font) {
		this.TextView.setTypeface(font || mc_typeface)
		return this
	},
	setLayoutParams(p1, p2) {
		this.TextView.setLayoutParams(new A.LayoutParams(p1, p2))
		return this
	},
	setOnClickListener(click) {
		this.TextView.setOnClickListener(click)
		return this
	},
	get() {
		return this.TextView
	}
};

// GRAPHICS - BITMAP
var Bitmap = function () {
	return this
};
Bitmap.prototype = {
	fromFile(path, scale) {
		path = __dir__ + path;
		if (path && new A.File(path).exists()) {
			var img = FileTools.ReadImage(path);
			this.img = new A.BitmapDrawable(
				new A.Bitmap.createScaledBitmap(
					new A.Bitmap.createBitmap(
						img, 0, 0, img.getWidth(), img.getHeight()
					),
					img.getWidth() * (scale || 1),
					img.getHeight() * (scale || 1),
					false
				)
			)
		}
		return this
	},
	decode(data, sizeX, sizeY, scale) {
		data = android.util.Base64.decode(data, 0);
		var scale = {
			x: (sizeX || 32) * (scale || 1),
			y: (sizeY || 32) * (scale || 1)
		}
		var decodedBitmap = A.BitmapFactory.decodeByteArray(data, 0, data.length);
		// var bmp = A.Bitmap.createBitmap(decodedBitmap, scale.x, scale.y);
		// new android.graphics.Canvas(bmp).drawBitmap(decodedBitmap, 0, 0, null);
		this.img = new A.Bitmap.createScaledBitmap(decodedBitmap, scale.x, scale.y, false)
		// new A.BitmapDrawable(

		// ) || null
		return this
	},
	get() {
		return this.img || null
	}
};

// WIDGET - IMAGEVIEW
var ImageView = function () {
	this.ImageView = new A.ImageView(A.ctx)
	return this
};
ImageView.prototype = {
	setImageDrawable(path, scale) {
		this.ImageView.setImageDrawable(new Bitmap().fromFile(path, scale).get())
		return this
	},
	setImageBitmap(bitmap) {
		this.ImageView.setImageBitmap(bitmap)
		return this
	},
	setLayoutParams(p1, p2) {
		this.ImageView.setLayoutParams(new A.LayoutParams(p1, p2))
		return this
	},
	setClick(click, ret) {
		this.ImageView.setOnClickListener(function () {
			newThread(function () {
				click();
			}, 'ImageView OnClick')
			return ret || true
		})
		return this
	},
	setLongClick(click, ret) {
		this.ImageView.setOnLongClickListener(function () {
			newThread(function () {
				click();
			}, 'ImageView OnLongClick')
			return ret || true
		})
		return this
	},
	setOnTouchListener(touch) {
		this.ImageView.setOnTouchListener(touch)
		return this
	},
	get() {
		return this.ImageView
	}
};

// WIDGET - BUTTON
var Button = function () {
	this.Button = new A.Button(A.ctx)
	this.Button.setTypeface(mc_typeface)
	return this
};
Button.prototype = {
	setText(text) {
		this.Button.setText(text || "")
		return this
	},
	setTextSize(size) {
		this.Button.setTextSize(resize(size))
		return this
	},
	setTextColor(color) {
		this.Button.setTextColor(color || A.Color.WHITE)
		return this
	},
	setTypeface(font) {
		this.Button.setTypeface(font != null ? font : null)
		return this
	},
	clearTypeface() {
		this.Button.setTypeface(null)
		return this
	},
	setLayoutParams(p1, p2) {
		this.Button.setLayoutParams(new A.LayoutParams(p1, p2))
		return this
	},
	setOnClickListener(click) {
		this.Button.setOnClickListener(click)
		return this
	},
	setOnLongClickListener(click) {
		this.Button.setOnLongClickListener(click)
		return this
	},
	setOnTouchListener(touch) {
		this.Button.setOnTouchListener(touch)
		return this
	},
	// setOnTouchListener(){
	// 	new OnTouchListener_() {
	// 		onTouch: function (view, event) {
	// 			if (event.getAction() == A.MotionEvent.ACTION_DOWN) {
	// 				mx = event.getRawX();
	// 				my = event.getRawY();
	// 			} else if (event.getAction() == A.MotionEvent.ACTION_MOVE) {
	// 				var _x = event.getRawX();
	// 				var _y = event.getRawY();

	// 				if (Math.abs(mx - _x) < 10 || Math.abs(my - _y) < 10) {
	// 					return false;
	// 				}

	// 				__window.update(A.WIDTH - _x - 20 * A.DP, A.HEIGHT - _y - 20 * A.DP, 45 * A.DP, 45 * A.DP);
	// 				_moving = true;
	// 			} else if (event.getAction() == A.MotionEvent.ACTION_UP) {
	// 				if (_moving) {
	// 					_moving = false;
	// 					return true;
	// 				}
	// 			}
	// 			return false;
	// 		}
	// 	}
	// },
	get() {
		return this.Button
	}
};

// WIDGET - SCROLLVIEW
var ScrollView = function () {
	this.ScrollView = new A.ScrollView(A.ctx)
	return this
};
ScrollView.prototype = {
	setLayoutParams(p1, p2) {
		this.ScrollView.setLayoutParams(new A.LayoutParams(p1, p2))
		return this
	},
	addView(view) {
		this.ScrollView.addView(view)
		return this
	},
	multiAddView(gt, viewList) {
		for (let i in viewList)
			if (!gt)
				this.addView(viewList[i].get())
			else
				this.addView(viewList[i])
		return this
	},
	setOnClickListener(click) {
		this.ScrollView.setOnClickListener(click)
		return this
	},
	get() {
		return this.ScrollView;
	}
};

// WIDGET - HORIZONTAL-SCROLLVIEW
var HScrollView = function () {
	this.HScrollView = new A.HorizontalScrollView(A.ctx)
	return this
};
HScrollView.prototype = {
	setLayoutParams(p1, p2) {
		this.HScrollView.setLayoutParams(new A.LayoutParams(p1, p2))
		return this
	},
	addView(view) {
		this.HScrollView.addView(view)
		return this
	},
	setOnClickListener(click) {
		this.HScrollView.setOnClickListener(click)
		return this
	},
	get() {
		return this.HScrollView;
	}
};

// WIDGET LINEARLAYOUT
var Linear = function () {
	this.padding = {
		TOP: 0,
		LEFT: 0,
		BOTTOM: 0,
		RIGHT: 0
	}
	this.margin = {
		TOP: 0,
		LEFT: 0,
		BOTTOM: 0,
		RIGHT: 0
	}
	this.views = {};
	this.LinearLayout = new A.LinearLayout(A.ctx)
	// this.LinearLayout.setLayoutParams(new A.LayoutParams(A.WRAP, A.WRAP))
	return this
};
Linear.prototype = {
	setLayoutParams(p1, p2) {
		this.LinearLayout.setLayoutParams(new A.LayoutParams(p1, p2))
		return this
	},
	setOrientation(orientation) {
		this.LinearLayout.setOrientation(orientation ? orientation : A.HORIZONTAL)
		return this
	},
	addView(view) {
		this.LinearLayout.addView(view)
		return this
	},
	multiAddView(gt, viewList) {
		for (let i in viewList) {
			if (!gt)
				this.addView(viewList[i].get())
			else
				this.addView(viewList[i])
			this.views[i] = viewList[i]
		};
		return this
	},
	getParams() {
		return this
	},
	setGravity(gravity) {
		this.LinearLayout.setGravity(gravity || A.CENTER)
		return this
	},
	setOnClickListener(click) {
		this.LinearLayout.setOnClickListener(click)
		return this
	},
	get() {
		return this.LinearLayout;
	}
};

// WIDGET POPUPWINDOW
var Window = function () {
	this.PopupWindow = new A.PopupWindow(A.ctx)
	this.location = { x: 0, y: 0 };
	return this
};
Window.prototype = {
	setWidth(width) {
		this.PopupWindow.setWidth(width)
		return this
	},
	setHeight(height) {
		this.PopupWindow.setHeight(height)
		return this
	},
	setContentView(view) {
		this.PopupWindow.setContentView(view)
		return this
	},
	setFocusable(bool) {
		this.PopupWindow.setFocusable(bool)
		return this
	},
	setGravity(gravity) {
		this.gravity = gravity;
		return this
	},
	getLocation() {
		return this.location
	},
	showAtLocation(x, y, parent) {
		var window = this.PopupWindow,
			gravity = this.gravity;
		this.location = { x: x || 0, y: y || 0 };
		newThread(function () {
			window.showAtLocation(parent || A.DecorView, gravity || A.CENTER, x || 0, y || 0)
		}, 'showAtLocation')
		return this
	},
	setBackgroundDrawable(path, scale) {
		this.PopupWindow.setBackgroundDrawable(new Bitmap().file(path).scale(scale).get())
		return this
	},
	setOnClickListener(click) {
		this.PopupWindow.setOnClickListener(click)
		return this
	},
	update() {

	},
	dismiss() {
		this.PopupWindow.dismiss()
		return this
	},
	get() {
		return this.PopupWindow;
	}
};

// WIDGET - EDITTEXT
var EditText = function () {
	this.EditText = new A.EditText(A.ctx)
	return this
};
EditText.prototype = {
	setText(text) {
		this.EditText.setText(text || "")
		return this
	},
	setTextSize(size) {
		this.EditText.setTextSize(resize(size))
		return this
	},
	setTextColor(color) {
		this.EditText.setTextColor(color || A.Color.WHITE)
		return this
	},
	setGravity(gravity) {
		this.EditText.setGravity(gravity || A.Gravity.left)
		return this
	},
	setTypeface(font) {
		this.EditText.setTypeface(font || mc_typeface)
		return this
	},
	setLayoutParams(p1, p2) {
		this.EditText.setLayoutParams(new A.LayoutParams(p1, p2))
		return this
	},
	setHint(hint) {
		this.EditText.setHint(hint)
		return this
	},
	setSingleLine(bool) {
		this.EditText.setSingleLine(bool)
		return this
	},
	setInputType(type) {
		this.EditText.setInputType(type)
		return this
	},
	setBackgroundDrawable(path, scale) {
		this.EditText.setBackgroundDrawable(new Bitmap().file(path).scale(scale).get())
		return this
	},
	setHintTextColor(color) {
		this.EditText.setHintTextColor(color || this.color.RED)
		return this
	},
	setOnClickListener(click) {
		this.EditText.setOnClickListener(click)
		return this
	},
	get() {
		return this.EditText
	}
};

var sDown = '', sMove = '', sUp = '', mx, my, _moving = false;
var DebugTXT = new TextView().setGravity(A.CENTER).setTextColor(A.Color.parseColor("#ffffff")).setText("R: null").setTextSize(15);
var edit1 = new EditText().setHint("aaaa").setText("700").setTextSize(15).setTypeface().setTextColor(A.Color.parseColor("#32a852"));
var interfaceWindow = new Window().setWidth(240).setHeight(90).setGravity(A.TOP | A.LEFT)
	.setContentView(
		new Linear().setLayoutParams(A.PARENT, A.PARENT).setOrientation(A.HORIZONTAL).multiAddView(false, [
			new ImageView().setImageBitmap(new Bitmap().decode(Aimgs.log, 32, 32, 2.5).get())
				.setClick(function (view) {
					Logger.showLog()
				}),
			new ImageView().setImageBitmap(new Bitmap().decode(Aimgs.move, 32, 32, 2.5).get())
				.setOnTouchListener(function (view, event) {// alert('TOUCH')
					if (event.getAction() == A.MotionEvent.ACTION_DOWN) {// alert("DOWN")
						mx = event.getRawX();
						my = event.getRawY();
					} else if (event.getAction() == A.MotionEvent.ACTION_MOVE) {// alert("MOVE")
						var _x = event.getRawX();
						var _y = event.getRawY();
						if (Math.abs(mx - _x) < 10 || Math.abs(my - _y) < 10) return false;
						var _window = [interfaceWindow.get().getWidth(), interfaceWindow.get().getHeight()];
						interfaceWindow.get().update(_x - _window[0] / 2, _y - _window[1] / 2, _window[0], _window[1]);
						_moving = true;
					} else if (event.getAction() == A.MotionEvent.ACTION_UP) {// alert("UP")
						if (_moving) {
							_moving = false;
							return false;
						}
					}
					return true;
				}),
			new ImageView().setImageBitmap(new Bitmap().decode(Aimgs.exit, 32, 32, 2.5).get())
				.setLongClick(function (view) {
					interfaceWindow.dismiss();
					return true
				}),
			// 	.setOnTouchListener(function (view, event) {
			// 		x = Math.floor(event.getX());
			// 		y = Math.floor(event.getY());
			// 		switch (event.getAction()) {
			// 			case A.MotionEvent.ACTION_DOWN: // нажатие
			// 				sDown = "DOWN(x: " + x + ", y: " + y+')';
			// 				sMove = ""; sUp = "";
			// 				break;
			// 			case A.MotionEvent.ACTION_MOVE: // движение
			// 				sMove = "MOVE(x:" + x + ", y: " + y+')';
			// 				interfaceWindow.get().update(x,y+iWlinear.get().getHeight())
			// 				break;
			// 			case A.MotionEvent.ACTION_UP: // отпускание
			// 			case A.MotionEvent.ACTION_CANCEL:
			// 				sMove = "";
			// 				sUp = "UP(x: " + x + ", y: " + y+')';
			// 				break;
			// 		}
			// 		DebugTXT.setText(sDown + "\n" + sMove + "\n" + sUp);
			// 		return true
			// 	})
		]).get()
	);
// .setFocusable(true);
// interfaceWindow.showAtLocation()





var DFCore = {
	coords: {},
	list: {
		'arbow1': 'arbow2',
		'blizrabi1': 'blizrabi2',
		'endererer1': 'endererer2',
		'loon1': 'loon2',
		'materia1': 'materia2',
		'neblaze1': 'neblaze2',
		'redwind1': 'redwind2',
		'romol1': 'romol2',
		'squarefury1': 'squarefury2',
		'timber1': 'timber2'
	},
	buildAt: function (name, x, y, z, rotation, progressive) {
		StructuresAPI.set(name, x, y, z, (rotation || undefined), false, progressive || false)
	},
	destroy: function (name, x, y, z, rotation, progressive) {
		StructuresAPI.set(name, x, y, z, (rotation || undefined), true, progressive || false)
	},
	getThis: function () {
		var c = this.coords;
		for (let str1 in this.list) {
			let str2 = this.list[str1];
			if (StructuresAPI.getStructures(str1, c.x, c.y, c.z, StructuresAPI.ROTATE_ALL))
				alert('Found Structure: ' + str1)
			else if (StructuresAPI.getStructures(str2, c.x, c.y, c.z, StructuresAPI.ROTATE_ALL))
				alert('Found Structure: ' + str2)
		}
	},
	windows: {
		main: new Window().setFocusable(true).setWidth(200).setHeight(100).setContentView(
			new Linear().setLayoutParams(A.PARENT, A.PARENT).setOrientation(A.HORIZONTAL).setGravity(A.CENTER)
				.multiAddView(false, [
					new ImageView().setImageDrawable("gui/block.png", 15)
						.setClick(function () {
							DFCore.windows.build.showAtLocation()
						}),
					// new ImageView().setImageDrawable("gui/minus.png", 15)
					// 	.setClick(function () {
					// 		DFCore.windows.destroy.showAtLocation()
					// 	}),
					new ImageView().setImageDrawable("gui/get.png", 15)
						.setClick(function () {
							DFCore.getThis()
						}),
				]).get()
		),
		// destroy: new Window().setFocusable(true).setWidth(300).setHeight(A.HEIGHT).setGravity(A.RIGHT).setContentView(
		// 	new ScrollView().addView(
		// 		new Linear().setLayoutParams(A.PARENT, A.PARENT).setOrientation(A.VERTICAL)
		// 			.multiAddView(false, [
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_arbow_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('arbow1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_wood_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('arbow2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_blizrabi_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('blizrabi1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_snow_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('blizrabi2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_endererer_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('endererer1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_coal_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('endererer2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_loon_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('loon1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_gold_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('loon2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_materia_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('materia1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_iron_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('materia2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_neblaze_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('neblaze1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_obsidian_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('neblaze2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_redwind_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('redwind1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_iron_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('redwind2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_romol_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('romol1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_stone_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('romol2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_squarefury_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('squarefury1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_stone_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('squarefury2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 				new Linear().multiAddView(false, [
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_timber_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('timber1', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 					new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_log_active.png", 15)
		// 						.setClick(function () {
		// 							var c = DFCore.coords;
		// 							DFCore.destroy('timber2', c.x, c.y, c.z, c.rotation)
		// 						}),
		// 				]),
		// 			]).get()
		// 	).get()
		// ),
		build: new Window().setFocusable(true).setWidth(300).setHeight(A.HEIGHT).setGravity(A.RIGHT).setContentView(
			new ScrollView().addView(
				new Linear().setLayoutParams(A.PARENT, A.PARENT).setOrientation(A.VERTICAL)
					.multiAddView(false, [
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_arbow_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('arbow1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('arbow1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_wood_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('arbow2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('arbow2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_blizrabi_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('blizrabi1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('blizrabi1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_snow_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('blizrabi2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('blizrabi2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_endererer_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('endererer1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('endererer1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_coal_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('endererer2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('endererer2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_loon_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('loon1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('loon1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_gold_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('loon2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('loon2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_materia_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('materia1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('materia1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_iron_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('materia2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('materia2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_neblaze_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('neblaze1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('neblaze1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_obsidian_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('neblaze2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('neblaze2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_redwind_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('redwind1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('redwind1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_iron_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('redwind2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('redwind2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_romol_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('romol1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('romol1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_stone_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('romol2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('romol2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_squarefury_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('squarefury1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('squarefury1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_stone_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('squarefury2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('squarefury2', c.x, c.y, c.z, c.rotation)
								}),
						]),
						new Linear().multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_timber_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('timber1', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('timber1', c.x, c.y, c.z, c.rotation)
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_log_active.png", 15)
								.setClick(function () {
									var c = DFCore.coords;
									DFCore.buildAt('timber2', c.x, c.y, c.z, c.rotation)
								})
								.setLongClick(function () {
									var c = DFCore.coords;
									DFCore.destroy('timber2', c.x, c.y, c.z, c.rotation)
								}),
						]),
					]).get()
			).get()
		)
	}
}
IDRegistry.genItemID("devKit");
Item.createItem("devKit", "DF Dev Kit", { name: "devKit" }, { stack: 1 });
Callback.addCallback("ItemUse", function (c, item, block) {
	// var sn = Entity.getSneaking(Player.get())
	DFCore.coords = c;
	var t = 'R: null'
	switch (TileRenderer.getBlockRotation()) {
		case 0: t = '0: North'; break;
		case 1: t = '1: South'; break;
		case 2: t = '2: West'; break;
		case 3: t = '3: East'; break;
		default: t = 'R: null'; break;
	}
	//alert(t)
	var rotations = [
	StructuresAPI.ROTATE_NONE,
		StructuresAPI.ROTATE_360Y,
		StructuresAPI.ROTATE_180Y,
		StructuresAPI.ROTATE_270Y,
		/*StructuresAPI.ROTATE_90Y,
		StructuresAPI.ROTATE_270Y,
		StructuresAPI.ROTATE_180Y,
		StructuresAPI.ROTATE_NONE*/
	]
	DFCore.coords.rotation = rotations[TileRenderer.getBlockRotation()]
	if (item.id == ItemID.devKit)
		DFCore.windows.main.showAtLocation();
});
interfaceWindow.showAtLocation()




