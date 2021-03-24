function createMultiModel(texture, type) {
	var textures1, textures2
	if (type == 0) {
		if (texture[3]) {
			textures1 = [[texture[3], 0], [texture[3], 0], [texture[1], 0], [texture[0] + "_active", 0], [texture[1], 0], [texture[1], 0], ]
			textures2 = [[texture[3], 0], [texture[3], 0], [texture[1], 0], [texture[0] + "_active_" + (texture[2] || ""), 0], [texture[1], 0], [texture[1], 0], ]
		} else {
			textures1 = [[texture[1], 0], [texture[0] + "_active", 0]]
			textures2 = [[texture[1], 0], [texture[0] + "_active_" + (texture[2] || ""), 0]]
		}
		TileRenderer.registerFullRotationModel(texture[0] + "_active", 0, textures1)
		TileRenderer.registerFullRotationModel(texture[0] + "_active_" + (texture[2] || ""), 0, textures2)
		return [(texture[0] + "_active"), (texture[0] + "_active_" + (texture[2] || ""))]
	} else {
		textures1 = [[texture[3] || texture[1], 0], [texture[0] + "_active", 0]]
		TileRenderer.registerFullRotationModel(texture[0] + "_active", 0, textures1)
	}
}
//? Mediums
//* Base
//* Creating materials for another spirits
//* Spirits
var model_medium_arbow = createMultiModel(["medium_arbow", "gold_block", "trading"], 0)
var model_medium_blizrabi = createMultiModel(["medium_blizrabi", "lapis_block", "trading"], 0)
var model_medium_endererer = createMultiModel(["medium_endererer", "iron_block", "trading"], 0)
var model_medium_loon = createMultiModel(["medium_loon", "gold_block", "trading"], 0)
var model_medium_materia = createMultiModel(["medium_materia", "gold_block", "trading"], 0)
var model_medium_neblaze = createMultiModel(["medium_neblaze", "obsidian", "trading"], 0)
var model_medium_redwind = createMultiModel(["medium_redwind", "redstone_block", "trading"], 0)
var model_medium_romol = createMultiModel(["medium_romol", "iron_block", "trading"], 0)
var model_medium_squarefury = createMultiModel(["medium_squarefury", "gold_block", "trading"], 0)
var model_medium_timber = createMultiModel(["medium_timber", "log", "trading", "log_top"], 0)

//? Soulbound lecterns
createMultiModel(["lectern_coal", "coal_block"], 1)
createMultiModel(["lectern_gold", "gold_block"], 1)
createMultiModel(["lectern_iron", "iron_block"], 1)
createMultiModel(["lectern_log", "log",], 1)
createMultiModel(["lectern_obsidian", "obsidian"], 1)
createMultiModel(["lectern_snow", "snow"], 1)
createMultiModel(["lectern_stone", "stone"], 1)
createMultiModel(["lectern_wood", "wood"], 1)

