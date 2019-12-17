function createMultiModel(bID, texture, multi, mID, enableBase, reg)
{
	var l_base_s, l_base_i, l_additional_s_0, l_additional_i_0, l_additional_s_1, l_additional_i_1;
	if(reg) regBlock(bID, "Gold Medium", [[mID, 0], [mID, 0], [mID, 0], [texture[0]+"_inactive", 0], [mID, 0], [mID, 0]], false);
	// if(typeof(bID)!='number') bID=BlockID[bID];
	if((texture && mID)!=null)
	{
		l_additional_s_0 = new BlockRenderer.Model([[mID, 0], [mID, 0], [mID, 0], [texture[0]+"_active", 0], [mID, 0], [mID, 0]]);
		l_additional_i_0 = new ICRender.Model(); l_additional_i_0.addEntry(l_additional_s_0);
		if(multi==true)
		{
			l_additional_s_1 = new BlockRenderer.Model([[mID, 0], [mID, 0], [mID, 0], [texture[0]+"_active"+texture[1]||"", 0], [mID, 0], [mID, 0]]);
			l_additional_i_1 = new ICRender.Model(); l_additional_i_1.addEntry(l_additional_s_1);
		}
	}
	
	return {
		base_s: l_base_s, base_i: l_base_i,
		las_0: l_additional_s_0, lai_0: l_additional_i_0,
		las_1: l_additional_s_1, lai_1: l_additional_i_1,
		bid: bID, mid: mID
	};
}
//? Mediums
//* Base
//* Creating materials for another spirits
//* Spirits
var model_medium_arbow = createMultiModel(null, ["medium_arbow", "trading"], true, "gold_block");
var model_medium_blizrabi = createMultiModel(null, ["medium_blizrabi", "trading"], true, "lapis_block");
var model_medium_endererer = createMultiModel(null, ["medium_endererer", "trading"], true, "iron_block");
var model_medium_loon = createMultiModel(null, ["medium_loon", "trading"], true, "gold_block");
var model_medium_materia = createMultiModel(null, ["medium_materia", "trading"], true, "gold_block");
var model_medium_neblaze = createMultiModel(null, ["medium_neblaze", "trading"], true, "obsidian");
var model_medium_redwind = createMultiModel(null, ["medium_redwind", "trading"], true, "redstone_block");
var model_medium_romol = createMultiModel(null, ["medium_romol", "trading"], true, "iron_block");
var model_medium_squarefury = createMultiModel(null, ["medium_squarefury", "trading"], true, "gold_block");
var model_medium_timber = createMultiModel(null, ["medium_timber", "trading"], true, "log_oak");

//? Soulbound lecterns
var lectern_coal = createMultiModel(BlockID.lectern_coal, ["lectern_coal"], false, "coal_block", true);
var lectern_gold = createMultiModel(BlockID.lectern_gold, ["lectern_gold"], false, "gold_block", true);
var lectern_iron = createMultiModel(BlockID.lectern_iron, ["lectern_iron"], true, "iron_block", true);
var lectern_log = createMultiModel(BlockID.lectern_log, ["lectern_log"], false, "log_oak", true);
var lectern_obsidian = createMultiModel(BlockID.lectern_obsidian, ["lectern_obsidian"], false, "obsidian", true);
var lectern_snow = createMultiModel(BlockID.lectern_snow, ["lectern_snow"], false, "snow", true);
var lectern_stone = createMultiModel(BlockID.lectern_stone, ["lectern_stone"], true, "stone", true);
var lectern_wood = createMultiModel(BlockID.lectern_wood, ["lectern_wood"], false, "planks_oak", true);






