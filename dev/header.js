importLib("CIM", '*');
IMPORT("NativeAPI");
//Added colors
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
		version: "0.6.1",
		description: "Magic, spirits and other..."
	};
};

var NetworkReader = {
	readText: function (url) {
		var reader = new java.io.BufferedReader(new java.io.InputStreamReader(java.net.URL(url).openStream(), "UTF-8"));
		var text = "";
		var temp = "";
		while ((temp = reader.readLine()) != null) {
			text+=temp;
		}
		reader.close();
		return text;
	}
	// readText: function (url) {
	// 	return this.readTextArray(url).join("\n");
	// }
};

var Updater = {
	source: "https://raw.githubusercontent.com/ToxesFoxes/DivineFavor/master/mod.info",
	check: function() {
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
						obj = "Please update to new version - "+obj;
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