Callback.addCallback("NativeCommand", function (str) {
	// base commands
	switch (str) {
		case "/weather":
			Game.prevent();
			Game.message(World.getWeather());
		break;
		case "/time":
			Game.prevent();
			Game.message(World.getWorldTime()%24000);
		break;
	}
});

var spirit = {
	list: ["Arbow", "Blizrabi", "Endererer", "Loon", "Materia", "Neblaze", "Redwind", "Romol", "Squarefury", "Timber"],
	callingStone: ["calling_stone_arbow", "calling_stone_blizrabi", "calling_stone_endererer", "calling_stone_loon", "calling_stone_materia", "calling_stone_neblaze", "calling_stone_redwind", "calling_stone_romol", "calling_stone_squarefury", "calling_stone_timber"],
	spirits: {
		"Arbow": 		 { id: 0, start: 11, end: 15, builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 0
		"Blizrabi":  { id: 1, start: 14, end: 18, builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 1
		"Endererer": { id: 2, start: 19, end: 23, builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 2
		"Loon": 		 { id: 3, start: 1, end: 4,	  builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 3
		"Materia": 	 { id: 4, start: 5, end: 9,	  builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 4
		"Neblaze": 	 { id: 5, start: 10, end: 14, builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 5
		"Redwind": 	 { id: 6, start: 9, end: 12,  builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 6
		"Romol": 		 { id: 7, start: 7, end: 10,  builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 7
		"Squarefury":{ id: 8, start: 22, end: 2,  builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 8
		"Timber": 	 { id: 9, start: 18, end: 22, builded: false, trading: false, active: false, energy: 200000, maxEnergy: 50 }	// spiritID: 9
	},
	setActive(id) {
		// if (spirit.getActive(id) == false && this.getProp(id).builded == true) {
			let energy = spirit.getProp(id).energy;
			let enMax = spirit.getProp(id).maxEnergy;
			// if (energy > enMax) energy = 0; else energy = enMax;
			spirit.getProp(id).active = true;
			spirit.informate(id);
			Callback.invokeCallback("SpiritActive");
		// }
	},
	setInactive(id) {
		// if (spirit.getActive(id) == true && this.builded[id] == true) {
			spirit.getProp(id).active = false;
			spirit.informate(id);
			Callback.invokeCallback("SpiritInActive");
		// }
	},
	getActive(id) {
		return spirit.getProp(id).active;
	},
	getNameByID(id) {
		return spirit.list[id];
	},
	getProp(id) {
		return spirit.spirits[spirit.list[id]];
	},
	getSpiritIdByCallingStone(id){
		for(let i in spirit.callingStone)
			if(id == ItemID[spirit.callingStone[i]])
				return i;
	},
	informate(id) {
		if (spirit.getActive(id) != false) Game.message(getTranslate("Spirit: ") + spirit.list[id] + getTranslate(" is active"));
		if (spirit.getActive(id) != true) Game.message(getTranslate("Spirit: ") + spirit.list[id] + getTranslate(" is inactive"));
		Callback.invokeCallback("SpiritInformated", id, spirit.getActive(id));
	},
	//SECTION Energy
	getEnergy(id, value) {
		if (spirit.getProp(id).energy >= value) {
			Callback.invokeCallback("SpiritEnergyRecieved", id, value, spirit.getProp(id).energy);
			spirit.getProp(id).energy -= value;
		}
	},
	addEnergy(id, value) {
		if (spirit.getProp(id).energy < value && spirit.getProp(id).energy + value < spirit.getProp(id).maxEnergy) spirit.getProp(id).energy += value;
		Callback.invokeCallback("SpiritEnergyRecieved", id, value, spirit.getProp(id).energy);
	},
	setMaxEnergy(id, value) {
		spirit.getProp(id).maxEnergy += value;
	},
	//!SECTION 
	//SECTION Base of trade with spirit
	trading_list: {},
	getIdData(i){
		if(Array.isArray(i)) return {id: i[0], data: i[1]};
		else return {id: i, data: 0};
		// for(let i in o){
		// }
	},
	checkIdData(item, slot){
		return (slot.id == item.id && slot.data == item.data)
	},
	tradeAdd(recipe, resultID){
		this.trading_list[resultID] = recipe;
	},
	getRecipeByResult(resultID){
		return this.trading_list[resultID];
	},
	tradeCheck(form){
		let counter = 0;
		for(let id in medium_Prototype.list){
			let recipe = medium_Prototype.list[id];
			recipeL: for(let i in recipe){
				let item = this.getIdData(recipe[i]);
				if(!this.checkIdData(item, form[counter])) break recipeL;
				counter++;
				if(counter>=9){
					alert('Found recipe for id: '+id);
					return [id,recipe];
				}
			}
			counter=0;
		}
	},
	//!SECTION
}
Callback.addCallback("ArbowSpirit", function (slot) {
	if (Player.getCarriedItem().id == 261 && random(0, 20) == 10) {
		slot.id = ItemID.arbow_favor_mark; EffectAPI.removePlayerEffect(0);
	}
})
Callback.addCallback("BlizrabiSpirit", function (slot) {
	if (Player.getArmorSlot(0).id == 0 && Player.getArmorSlot(1).id == 0 && Player.getArmorSlot(2).id == 0 && Player.getArmorSlot(3).id == 0 && random(0, 20) == 10);
	slot.id = ItemID.blizrabi_favor_mark; EffectAPI.removePlayerEffect(1);
})
Callback.addCallback("EnderererSpirit", function (slot, da) {
	let pos = Player.getPosition();
	if (Player.getArmorSlot(0).id == 86 && getEntityInRad(pos.x, pos.y, pos.z, 3, 38)) da[0] = true;
	if (da[0] == true && Player.getCarriedItem().id == 368) da[1] = true;
	if (da[0] == true && da[1] == true) {
		slot.id = ItemID.endererer_favor_mark; EffectAPI.removePlayerEffect(2);
		da = [false, false];
	}
})
Callback.addCallback("LoonSpirit", function (slot) {
	let pos = Player.getPosition();
	if (getEntityInRad(pos.x, pos.y, pos.z, 3, 20) && getEntityInRad(pos.x, pos.y, pos.z, 3, 21) && random(0, 20) == 10) {
		slot.id = ItemID.loon_favor_mark; EffectAPI.removePlayerEffect(3);
	}
})
Callback.addCallback("NeblazeSpirit", function (slot) {
	let pos = Player.getPosition();
	if (getBlockInRad(pos.x, pos.y, pos.z, 5, 9, 0) && random(0, 20) == 10) {
		slot.id = ItemID.neblaze_favor_mark; EffectAPI.removePlayerEffect(5);
	}
})
Callback.addCallback("RedwindSpirit", function (slot) {
	if (EntityState.getPlayerState() == EntityState.RUNNING) {
		Entity.addEffect(Player.get(), 1, 2, 0, 3, false);
		let pos = Player.getPosition();
		if (getBlockInRad(pos.x, pos.y, pos.z, 5, 9, 0) && random(0, 20) == 10) {
			slot.id = ItemID.redwind_favor_mark; EffectAPI.removePlayerEffect(6);
		}
	}
})
Callback.addCallback("RomolSpirit", function (slot) {
	Callback.addCallback("DestroyBlock", function (coords, block, player) {
		let pos = Player.getPosition();
		if (getBlockInRad(pos.x, pos.y, pos.z, 5, 1, 0) && block.id == 1 && random(0, 20) == 10) {
			slot.id = ItemID.romol_favor_mark; EffectAPI.removePlayerEffect(7);
		}
	});
})
Callback.addCallback("SquarefurySpirit", function () {
	Callback.addCallback("EntityHurt", function (attacker, victim, damage) {
		let pos = Player.getPosition();
		if (Entity.getType(victim) == Player.get())
			Entity.healEntity(Player.get(), 1);
		else Entity.damageEntity(victim, 1);
		if (random(0, 20) == 10) {
			slot.id = ItemID.squarefury_favor_mark; EffectAPI.removePlayerEffect(8);
		}
	});
})
Callback.addCallback("TimberSpirit", function () {
	let pos = Player.getPosition();
	if (getBlockInRad(pos.x, pos.y, pos.z, 5, 9, 0) && random(0, 20) == 10) {
		slot.id = ItemID.timber_favor_mark; EffectAPI.removePlayerEffect(9);
	}
})

Callback.addCallback("tick", function () {
	let ticks = World.getThreadTime();
	if (ticks % 40 == 0) {
		var worldTime = (World.getWorldTime()) % 24000;
		for (let id in spirit.list) {
			var start = spirit.getProp(id).start * 1000,
				end = spirit.getProp(id).end * 1000;
			if ((worldTime > start && worldTime < end) && spirit.getProp(id).active != true) {
				spirit.setActive(id);
				break;
			} else if ((worldTime > end || worldTime < start) && spirit.getProp(id).active != false) {
				spirit.setInactive(id);
				break;
			}
		}
	}
});