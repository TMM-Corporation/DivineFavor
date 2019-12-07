var talismans = {
	/**
	 * @default ["Arrow","Blade","Spell","Tool"]
	 */
	types: ["Arrow", "Blade", "Spell", "Tool"],
	/**
	 * @default ["arrow","blade","spell","tool"]
	 */
	textures: ["arrow", "blade", "spell", "tool"],
	talisman: {},
	recipes: [],
	/**
	 * Создает информацию о предмете
	 * @param {string} name имя передаваемое предметом.
	 * @param {Array} info массив в котом передается информация о типе предмета, текстуре, id духа, стоимость использования.
	 * @returns {string} name+tooltip
	 */
	talismanTooltip(name, info) {
		var isActive = spirit.getActive(info.spiritID);
		// var usable = getTranslate("Unusable");
		// if (isActive == true) { usable = getTranslate("Usable") } else usable = getTranslate("Unusable");
		var tooltip = "\n" + getTranslate("Spirit: ") + spirit.getNameByID(info.spiritID) + "\n" + getTranslate("Favor cost: ") + info.cost;
		return name + tooltip;
	},
	/**
	 * Проверяет на наличие в списке талисманов
	 * @param {number} id 
	 */
	isValid(id) {
		return (id in this.talisman);
	},
	/**
	 * Проверяет на правильность талисмана
	 * @param {number} id 
	 */
	isValidTalisman(id, type1, type2) {
		if(this.isValid(id)!=false){
			// alert("one: "+talismans.getTalisman(id).type);
			// alert("two: "+talismans.textures[type]);
			// alert("three: "+(talismans.getTalisman(id).type)===(talismans.textures[type]));
			if(!type2)return (talismans.getTalisman(id).type===talismans.textures[type1])
			else return (talismans.getTalisman(id).type===talismans.textures[type2] || talismans.getTalisman(id).type===talismans.textures[type1])
		}	else return false;
	},
	/**
	 * Возвращает данные талисмана по его id
	 * @param {*} id идентификатор с которым связаны данные
	 * @return {Array} отдает объект талисмана
	 */
	getTalisman(id) {
		return talismans.talisman[id];
	},
	/**
	 * Регистрация талисмана
	 * @param {Array} obj объект содержащий[тип, текстура, дух, стоимость] 
	 * @param {string} en английское название
	 * @param {string} ru русское название
	 * @param {Array} recipe рецепт в торговле с духами
	 * @param {function} func что делает талисман
	 * @param {number} type тип использования талисмана
	 */
	regTalisman(obj, en, ru, recipe, func) { //([type, texture, spiritID, cost], "en", "ru", [recipe ids] function(){func})
		var info = {}; info["type"] = obj[0], info["texture"] = obj[1], info["spiritID"] = obj[2], info["cost"] = obj[3];
		var itemTexture = info.texture + "_" + info.type + "_talisman";
		var itemName = en;
		var id = regItem(itemTexture, itemName, 1);
		talismans.talisman[id] = {type: info.type, texture: info.texture, spiritID: info.spiritID, cost: info.cost, recipe: recipe, func: func};
		Item.registerNameOverrideFunction(id, function (item, name) {
			return talismans.talismanTooltip(name, info);
		});
		Item.registerUseFunction(id, function () {
			talismans.useTalisman(id, 3);
			// alert(talismans.talisman[id])
			alert(JSON.stringify(talismans.talisman[id]));
		});
		if (ru != "ru") translateRu(en, ru);
	},
	getCurrentTalisman(){
		var item = Player.getCarriedItem();
		if(item.extra){
			var id = CIM.containers["e" + item.extra.getInt("extraCount")];
			if(id!==undefined){
				id=id.getSlot("slot_27").id;
				var info = this.getTalisman(id);
				if(info !== undefined){
					// Threading.initThread("talisman", info.func(obj), 0);
					return info;
				}else return null;
			}
		}
	},
	//types: 0 - block, 1 - entity, 2 - player, 3 - ground, 4 - block+entity
	/**
	 * Использование талисмана
	 * @param {number} id идентификатор предмета
	 * @param {number} type тип использования
	 * @param {array} obj объект описание который передает данные для разных типов использования
	 */
	useTalisman(obj) {
		// var item = Player.getCarriedItem();
		// if(item.extra){
		// 	var id = CIM.containers["e" + item.extra.getInt("extraCount")].getSlot("slot_27").id;
		// 	var info = this.getTalisman(id);
		// 	if(info !== undefined){
		// 		// Threading.initThread("talisman", info.func(obj), 0);
		// 		info.func(obj)
		// 	}
		// }
		var current = talismans.getCurrentTalisman();
		if(current){
			var energy = spirit.getProp(current.spiritID).energy;
			if(energy>=current.cost){
				spirit.recieveEnergy(current.spiritID, current.cost);
				Game.message(JSON.stringify(current), "");
				current.func(obj);
			}
		}
	},
	/**
	 * Добавление рецепта для торговли с духами
	 * @param {number} id 
	 * @param {array} recipe массив с рецептом в котором [id,[id,data],id..]
	 */
	addRecipe(id, recipe) {
		this.recipes[id]=recipe;
	},
	getRecipe(id){
		return this.recipes[id];
	},
	craftRecipe(id, items){
		let recipe = this.getRecipe(id);
		for(var i in recipe){
			if(Array.isArray(recipe[i])==true){
				
			}
		}
	}
}

// Translation.translate("Power Tier: ")
// Translation.addTranslation("Batpack", {ru: "Аккумуляторный ранец", es: "Mochila de Baterías", pt: "Mochila de Baterias", zh: "电池背包"});