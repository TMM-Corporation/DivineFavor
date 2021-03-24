function addCallbacks(list) {
	for (let callback in list) {
		Callback.addCallback(list[callback], function (p1, p2, p3, p4, p5, p6, p7) {
			DebugThis(function () {
				Log([Parser.get(p1), Parser.get(p2), Parser.get(p3), Parser.get(p4), Parser.get(p5), Parser.get(p6), Parser.get(p7)], list[callback])
			}, list[callback])
		})
	}
}
var Thread_ = java.lang.Thread
var Runnable_ = java.lang.Runnable
function DebugThis(func, name) {
	UI.getContext().runOnUiThread(new java.lang.Runnable({
		run() {
			Logger.Log('Debuggung new function', ' DebugThis ' + ((name + ' ') || ''))
			try {
				func()
			} catch (e) {
				Logger.Log(e.name + ': [' + e.message + ']', "ERROR: " + e.fileName + '#' + e.lineNumber)
			}
		}
	}))
}

var Parser = {
	tCount: 0,
	addT() {
		let i = 0, text = ''
		while (i < this.tCount) {
			text += ' '
			i++
		}
		return text
	},
	get(OBJECT_NAME, isVAR, name) {
		if (OBJECT_NAME == null || OBJECT_NAME == undefined || OBJECT_NAME == Parser) return ""
		var isOBJ = (typeof OBJECT_NAME !== "object")
		var isARR = (Array.isArray(OBJECT_NAME))
		var text = (isOBJ ? ('\n' + name + ': {\n') : (isARR ? (isVAR ? 'var ' + name + ' = [\n' : '[\n') : (isVAR ? ('var ' + name + ' = {\n') : '{\n')))
		Parser.tCount++
		var OBJECT_VALUE = eval(OBJECT_NAME)
		for (var i in OBJECT_VALUE) {
			try {
				var code = OBJECT_VALUE[i]
				if (code == 'annotations' || code == 'declaredConstructors')
					break
				if (typeof code === "object") {
					code = Parser.get(OBJECT_VALUE[i], false, '')
				} else if (typeof code === 'string')
					code = "'" + OBJECT_VALUE[i] + "'"
				text += Parser.addT()
				if (!Array.isArray(OBJECT_NAME))
					text += i + ": " + code + ',\n'
				else text += code + ', /*' + i + '*/\n'
			} catch (e) {
				// Logger.Log(Parser.get(e, false, "err"), 'ERRORS :)')
				".".endsWith(".")
				Logger.Log(e.name + ': [' + e.message + ']', "ERROR: " + e.fileName + '#' + e.lineNumber)
				// break
			}
		}
		Parser.tCount--
		text += Parser.addT() + ((Array.isArray(OBJECT_NAME)) ? ']' : '}')
		// Logger.Log(text, name)
		return text
	}
}
// addCallbacks(['LevelSelected', 'LevelPreLoaded', 'LevelLoaded', 'LevelPreLeft', 'LevelLeft', 'ReadSaves', 'WriteSaves', 'GenerateNetherChunk', 'GenerateEndChunk', 'GenerateChunk', 'GenerateChunkUndeground', 'DestroyBlock', 'DestroyBlockStart', 'DestroyBlockContinue', 'Explosion', 'BuildBlock', 'CustomBlockTessellation', 'NativeCommand', 'ClientChat', 'ServerChat', 'ItemUse', 'FoodEaten', 'ItemIconOverride', 'ItemNameOverride', 'ItemUseNoTarget', 'ItemUsingReleased', 'ItemUsingComplete', 'ItemDispensed', 'PlayerAttack', 'ExpAdd', 'ExpLevelAdd', 'EntityAdded', 'EntityRemoved', 'EntityDeath', 'EntityHurt', 'EntityInteract', 'ProjectileHit', 'ProjectileHitBlock', 'ProjectileHitEntity', 'NativeGuiChanged', 'ModDirLoaded', 'PreBlocksDefined', 'BlocksDefined', 'PreLoaded', 'APILoaded', 'ModsLoaded', 'PostLoaded', 'AppSuspended', 'DimensionLoaded'])
// DebugThis(function () {
// new Thread_(function () {
Logger.Log(Parser.get(this, true, "this"), "this")
// Logger.Log(Parser.get(__name__, true, "__name__"), "__name__")
// Logger.Log(Parser.get(__dir__, true, "__dir__"), "__dir__")
// Logger.Log(Parser.get(__config__, true, "__config__"), "__config__")
// Logger.Log(Parser.get(__debug_typecheck__, true, "__debug_typecheck__"), "__debug_typecheck__")
// Logger.Log(Parser.get(runCustomSource, true, "runCustomSource"), "runCustomSource")
// Logger.Log(Parser.get(importLib, true, "importLib"), "importLib")
// Logger.Log(Parser.get(IMPORT, true, "IMPORT"), "IMPORT")
// Logger.Log(Parser.get(getCoreAPILevel, true, "getCoreAPILevel"), "getCoreAPILevel")
// Logger.Log(Parser.get(runOnMainThread, true, "runOnMainThread"), "runOnMainThread")
// Logger.Log(Parser.get(getMCPEVersion, true, "getMCPEVersion"), "getMCPEVersion")
// Logger.Log(Parser.get(Debug, true, "Debug"), "Debug")
// Logger.Log(Parser.get(FileTools, true, "FileTools"), "FileTools")
// Logger.Log(Parser.get(Threading, true, "Threading"), "Threading")
// Logger.Log(Parser.get(Config, true, "Config"), "Config")
// Logger.Log(Parser.get(TileEntity, true, "TileEntity"), "TileEntity")
// Logger.Log(Parser.get(MobRegistry, true, "MobRegistry"), "MobRegistry")
// Logger.Log(Parser.get(MobSpawnRegistry, true, "MobSpawnRegistry"), "MobSpawnRegistry")
// Logger.Log(Parser.get(GameObject, true, "GameObject"), "GameObject")
// Logger.Log(Parser.get(GameObjectRegistry, true, "GameObjectRegistry"), "GameObjectRegistry")
// Logger.Log(Parser.get(ModAPI, true, "ModAPI"), "ModAPI")
// Logger.Log(Parser.get(Saver, true, "Saver"), "Saver")
// Logger.Log(Parser.get(World, true, "World"), "World")
// Logger.Log(Parser.get(Entity, true, "Entity"), "Entity")
// Logger.Log(Parser.get(Player, true, "Player"), "Player")
// Logger.Log(Parser.get(Game, true, "Game"), "Game")
// Logger.Log(Parser.get(Render, true, "Render"), "Render")
// Logger.Log(Parser.get(Texture, true, "Texture"), "Texture")
// Logger.Log(Parser.get(EntityModel, true, "EntityModel"), "EntityModel")
// Logger.Log(Parser.get(EntityModelWatcher, true, "EntityModelWatcher"), "EntityModelWatcher")
// Logger.Log(Parser.get(EntityAIClass, true, "EntityAIClass"), "EntityAIClass")
// Logger.Log(Parser.get(EntityAIWatcher, true, "EntityAIWatcher"), "EntityAIWatcher")
// Logger.Log(Parser.get(EntityAI, true, "EntityAI"), "EntityAI")
// Logger.Log(Parser.get(GenerationUtils, true, "GenerationUtils"), "GenerationUtils")
// Logger.Log(Parser.get(Animation, true, "Animation"), "Animation")
// Logger.Log(Parser.get(IDData, true, "IDData"), "IDData")
// Logger.Log(Parser.get(Block, true, "Block"), "Block")
// Logger.Log(Parser.get(Item, true, "Item"), "Item")
// Logger.Log(Parser.get(ToolAPI, true, "ToolAPI"), "ToolAPI")
// Logger.Log(Parser.get(Armor, true, "Armor"), "Armor")
// Logger.Log(Parser.get(LiquidRegistry, true, "LiquidRegistry"), "LiquidRegistry")
// Logger.Log(Parser.get(Native, true, "Native"), "Native")
// Logger.Log(Parser.get(alert, true, "alert"), "alert")
// Logger.Log(Parser.get(ItemExtraData, true, "ItemExtraData"), "ItemExtraData")
// Logger.Log(Parser.get(RenderMesh, true, "RenderMesh"), "RenderMesh")
	// Parser.get(th, true, 'InnerCoreAPI')//, 'InnerCoreAPI')
	// }).start()
// }, 'InnerCoreAPI')