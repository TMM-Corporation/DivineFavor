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
	Game.message(Translate("Work in Progress"))
}
var t = Translate
t('assets/translations/other.json', true)
t('assets/translations/ingredients.json', true)
function getInformation() {
	return FileTools.ReadJSON(__dir__ + 'mod.info')
}

var NetworkReader = {
	readText: function (url) {
		var reader = new java.io.BufferedReader(new java.io.InputStreamReader(java.net.URL(url).openStream(), "UTF-8"))
		var text = ""
		var temp = ""
		while ((temp = reader.readLine()) != null) {
			text += temp
		}
		reader.close()
		return text
	}
}
function getEntityInRad(x, y, z, radius, entityID) {
	let entities = Entity.getAll()
	for (let i in entities) {
		let ent = entities[i]
		if (Entity.getType(ent) == entityID) {
			let c = Entity.getPosition(ent)
			let xx = Math.abs(x - c.x), yy = Math.abs(y - c.y), zz = Math.abs(z - c.z)
			if (Math.sqrt(xx * xx + yy * yy + zz * zz) <= radius) {
				return true
			}
		}
	}
}
function getBlockInRad(x, y, z, radius, id, data) {
	for (var x1 = -radius; radius >= x1; x1++)
		for (var y1 = -radius; radius >= y1; y1++)
			for (var block, z1 = -radius; radius >= z1; z1++) {
				block = (World.getBlock(x + x1, y + y1, z + z1).id == id && World.getBlock(x + x1, y + y1, z + z1).data == data)
				if (block) return block
			}
}

new java.lang.Thread(new java.lang.Runnable({
	run: function () {
		// try {
		var version = {
			update: false,
			ver: 'null',
			current: getInformation().version,
			github: NetworkReader.readText("https://raw.githubusercontent.com/ToxesFoxes/DivineFavor/master/mod.info").version
		}
		version.github = JSON.parse(version.github)
		for (let i in version.current) {
			var g = Number(version.github.split('.')[i]),
				c = Number(version.current.split('.')[i])
			if (g > c) {
				version.update = true
				version.ver = version.github
				break
			}
		}
		Log((version.update ? (t("Please update to new version - ") + version.ver) : t("No update found")), [__name__, 'Divine Favor'])
		// } catch (error) {
		// 	var re = /No address associated with hostname/g
		// 	if (re.exec(error))
		// 		LogWarning(error, t("Can't connect to the internet, check your Internet connection"), __name__, false)
		// 	else
		// 		LogError(error, [__name__, 'Updater', 'Error'], true)
		// }
	}
})).start()
