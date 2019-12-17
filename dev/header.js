importLib("CIM", '*');
IMPORT("Inventory");
importLib("EffectAPI", '*');
IMPORT("EntityState");
IMPORT("NativeAPI");
//Added colors

function WIP() {
	Game.message("Work in Progress");
}


var Color = {
	AQUA: "§b",
	BEGIN: "§",
	BLACK: "§0",
	BLUE: "§9",
	BOLD: "§l",
	DARK_AQUA: "§3",
	DARK_BLUE: "§1",
	DARK_GRAY: "§8",
	DARK_GREEN: "§2",
	DARK_PURPLE: "§5",
	DARK_RED: "§4",
	GOLD: "§6",
	GRAY: "§7",
	GREEN: "§a",
	LIGHT_PURPLE: "§d",
	RED: "§c",
	RESET: "§r",
	WHITE: "§f",
	YELLOW: "§e"
}

function getInformation() {
	return {
		name: "Divine Favor",
		author: "TooManyMods",
		version: "0.6.2.5",
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
	// readText: function (url) {
	// 	return this.readTextArray(url).join("\n");
	// }
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
	for (var block, z1 = -radius; radius >= z1; z1++){
		block = (World.getBlock(x + x1, y + y1, z + z1).id == id && World.getBlock(x + x1, y + y1, z + z1).data == data);
		if(block) return block;}
}
var Updater = {
	source: "https://raw.githubusercontent.com/ToxesFoxes/DivineFavor/master/mod.info",
	check: function () {
		new java.lang.Thread(new java.lang.Runnable({
			run: function () {
				try {
					// Server side info
					var githubVer = NetworkReader.readText(Updater.source);
					// Client side info
					var information = getInformation();
					var curVer = information.version;
					var obj = eval('var ver=' + githubVer);
					obj = ver["version"];
					if (curVer === obj) {
						obj = "No update found";
					} else {
						obj = "Please update to new version - " + obj;
					}
					Logger.Log(obj, "Divine Favor", "Updater");
				} catch (e) { Logger.LogError(e) }
			}
		})).start();
	}
};

try {
	Updater.check();
} catch (e) { Logger.LogError(e) }