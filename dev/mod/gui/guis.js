var pouch = new UI.StandartWindow({
	standart: {header: {text: {text: "Ritual pouch"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 490, y: 270, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_1": {type: "slot", x: 550, y: 270, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_2": {type: "slot", x: 610, y: 270, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_3": {type: "slot", x: 550, y: 210, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_4": {type: "slot", x: 490, y: 150, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_5": {type: "slot", x: 550, y: 150, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_6": {type: "slot", x: 610, y: 150, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
	}
});