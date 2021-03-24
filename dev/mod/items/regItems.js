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