function validateGuiSlot(gui, validator) {
	for (let i in gui.getContent().elements) {
		gui.getContent().elements[i].isValid = validator;
	};
}

var pouch = new UI.StandartWindow({
	standart: {header: {text: {text: "Ritual pouch"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 490, y: 270, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_1": {type: "slot", x: 550, y: 270, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_2": {type: "slot", x: 610, y: 270, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_3": {type: "slot", x: 550, y: 210, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_4": {type: "slot", x: 490, y: 150, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_5": {type: "slot", x: 550, y: 150, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
		"slot_6": {type: "slot", x: 610, y: 150, size: 60, visual: false, bitmap: "slot_default",	needClean: true, isTransparentBackground: true},
	}
});
validateGuiSlot(pouch, function(){
	return CIM.nonCIM(ItemID.ritual_pouch);
});

var bowInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Spell Bow Book"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_18": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 570, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_25": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_26": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},
		
		"slot_27": {type: "slot", x: 570, y: 250, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(bowInv, function(id, count, data){
	return talismans.isValidTalisman(id, 0);
});

var greenBladeInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Green Spell Blade book"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_18": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 570, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_25": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_26": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},

		"slot_27": {type: "slot", x: 570, y: 250, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(greenBladeInv, function(id, count, data){
	return talismans.isValidTalisman(id, 1, 2);
});

var redBladeInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Red Spell Blade book"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_18": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 570, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_25": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_26": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},

		"slot_27": {type: "slot", x: 570, y: 250, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(redBladeInv, function(id, count, data){
	return talismans.isValidTalisman(id, 1, 2);
});

var bluePickInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Blue Spell Pickaxe book"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},

		"slot_18": {type: "slot", x: 570, y: 180, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(bluePickInv, function(id, count, data){
	return talismans.isValidTalisman(id, 2, 3);
});

var orangePickInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Orange Spell Pickaxe book"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},

		"slot_18": {type: "slot", x: 570, y: 180, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(orangePickInv, function(id, count, data){
	return talismans.isValidTalisman(id, 2, 3);
});

var grimoireInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Orange Spell Pickaxe book"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_9":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},

		"slot_18": {type: "slot", x: 570, y: 180, size: 60, bitmap: "slot_default"}
	}
});
validateGuiSlot(grimoireInv, function(id, count, data){
	return talismans.isValidTalisman(id, 2);
});

var contractInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Contract binder book"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 570, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
	}
});
validateGuiSlot(contractInv, function(){
	return CIM.nonCIM(ItemID.contract_binder);
});

var mediumInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Medium"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		//recipes
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_8": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		//crystall
		"slot_9": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"},
		//results
		"slot_10": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
		"slot_13": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_17": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_18": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},
	}
});
var lecternInv = new UI.StandartWindow({
	standart: {header: {text: {text: "Soulblound lectern"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 330, y: 50, size: 60, bitmap: "slot_default"},
		"slot_1": {type: "slot", x: 390, y: 50, size: 60, bitmap: "slot_default"},
		"slot_2": {type: "slot", x: 450, y: 50, size: 60, bitmap: "slot_default"},
		"slot_3": {type: "slot", x: 510, y: 50, size: 60, bitmap: "slot_default"},
		"slot_4": {type: "slot", x: 630, y: 50, size: 60, bitmap: "slot_default"},
		"slot_5": {type: "slot", x: 690, y: 50, size: 60, bitmap: "slot_default"},
		"slot_6": {type: "slot", x: 750, y: 50, size: 60, bitmap: "slot_default"},
		"slot_7": {type: "slot", x: 810, y: 50, size: 60, bitmap: "slot_default"},
	
		"slot_8":  {type: "slot", x: 330, y: 110, size: 60, bitmap: "slot_default"},
		"slot_9":  {type: "slot", x: 390, y: 110, size: 60, bitmap: "slot_default"},
		"slot_10": {type: "slot", x: 450, y: 110, size: 60, bitmap: "slot_default"},
		"slot_11": {type: "slot", x: 510, y: 110, size: 60, bitmap: "slot_default"},
		"slot_12": {type: "slot", x: 570, y: 110, size: 60, bitmap: "slot_default"}, //soul shard slot
		"slot_13": {type: "slot", x: 630, y: 110, size: 60, bitmap: "slot_default"},
		"slot_14": {type: "slot", x: 690, y: 110, size: 60, bitmap: "slot_default"},
		"slot_15": {type: "slot", x: 750, y: 110, size: 60, bitmap: "slot_default"},
		"slot_16": {type: "slot", x: 810, y: 110, size: 60, bitmap: "slot_default"},
	
		"slot_17": {type: "slot", x: 330, y: 170, size: 60, bitmap: "slot_default"},
		"slot_18": {type: "slot", x: 390, y: 170, size: 60, bitmap: "slot_default"},
		"slot_19": {type: "slot", x: 450, y: 170, size: 60, bitmap: "slot_default"},
		"slot_20": {type: "slot", x: 510, y: 170, size: 60, bitmap: "slot_default"},
		"slot_21": {type: "slot", x: 630, y: 170, size: 60, bitmap: "slot_default"},
		"slot_22": {type: "slot", x: 690, y: 170, size: 60, bitmap: "slot_default"},
		"slot_23": {type: "slot", x: 750, y: 170, size: 60, bitmap: "slot_default"},
		"slot_24": {type: "slot", x: 810, y: 170, size: 60, bitmap: "slot_default"},
	}
});



