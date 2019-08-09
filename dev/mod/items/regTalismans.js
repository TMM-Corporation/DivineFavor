var talismans = {
	types: ["Arrow", "Blade", "Spell", "Tool"],
	textures: ["arrow", "blade", "spell", "tool"],
	talismanTooltip: function (name, info){
		var isActive = spirit.getActive(info.spiritID);
		var usable = getTranslate("Unusable");
		if (isActive == true) { usable = getTranslate("Usable") } else usable = getTranslate("Unusable");
		var tooltip = "\n" + getTranslate("Spirit: ") + spirit.getNameByID(info.spiritID) + " " + usable + "\n" +getTranslate("Favor cost: ") + info.cost;
		return name + tooltip;
	},
	regTalisman: function (obj, en, ru, func) { //([type, texture, spiritID, cost], "en", "ru", function(){func})
		var info = {}; info["type"] = obj[0], info["texture"] = obj[1], info["spiritID"] = obj[2], info["cost"] = obj[3];
		var itemTexture = info.texture + "_" + info.type + "_talisman";
		var itemName = en;
		var id = regItem(itemTexture, itemName, 1);
		Item.registerNameOverrideFunction(ItemID[id], function(item, name) {
			return talismans.talismanTooltip(name, info);
		});
		Item.registerUseFunction(id, function() {
			talismans.useTalisman(info.spiritID, info.cost, func);
		});
		if(ru!="ru")translateRu(en, ru);
	},
	useTalisman: function(id, cost, func){
		
	}
}

// Translation.translate("Power Tier: ")
// Translation.addTranslation("Batpack", {ru: "Аккумуляторный ранец", es: "Mochila de Baterías", pt: "Mochila de Baterias", zh: "电池背包"});