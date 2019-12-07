IDRegistry.genItemID("spell_bow");
Item.createItem("spell_bow", "Spell bow", { name: "spell_bow", meta: 0 }, { stack: 1 });
Item.describeItem(ItemID.spell_bow, {
	toolRender: true,
	maxDamage: 385,
	useAnimation: 4
});
BowRegistry.regBow({
	bow: ItemID.spell_bow,
	texture: "spell_bow",
	bullet: 262,
	skin: "entity/projectiles/arrow.png",
	speed: 2,
	damage: 1.5,
	variations: 3,
	state: 0,
});
Item.registerNameOverrideFunction(ItemID.spell_bow, function (item, name) {
	var info = talismans.getCurrentTalisman();
	if(info){
		var isActive = spirit.getActive(info.spiritID);
		var tooltip = "\n" + getTranslate("Spirit: ") + spirit.getNameByID(info.spiritID) + "\n" + getTranslate("Favor cost: ") + info.cost+"\n"+spirit.spirits[spirit.getNameByID(info.spiritID)].energy +"/"+spirit.spirits[spirit.getNameByID(info.spiritID)].maxEnergy;
		return name + tooltip;
	}
	return name;
});