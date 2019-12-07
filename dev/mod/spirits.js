var spirit = {
	list: ["Arbow", "Blizrabi", "Endererer", "Loon", "Materia", "Neblaze", "Redwind", "Romol", "Squarefury", "Timbler"],
	builded: [false,   false,     false,      false,   false,    false,      false,    false,     false,        false],
	spirits: {
		"Arbow": { id: 0, start: 11, end: 15, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 0
		"Blizrabi": { id: 1, start: 14, end: 18, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 1
		"Endererer": { id: 2, start: 19, end: 23, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 2
		"Loon": { id: 3, start: 1, end: 4, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 3
		"Materia": { id: 4, start: 5, end: 9, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 4
		"Neblaze": { id: 5, start: 10, end: 14, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 5
		"Redwind": { id: 6, start: 9, end: 12, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 6
		"Romol": { id: 7, start: 7, end: 10, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 7
		"Squarefury": { id: 8, start: 22, end: 2, active: false, energy: 200000, maxEnergy: 50 }, // spiritID: 8
		"Timbler": { id: 9, start: 18, end: 22, active: false, energy: 200000, maxEnergy: 50 }	// spiritID: 9
	},
	setActive(id) {
		if (spirit.getActive(id) == false) {
			let energy = spirit.getProp(id).energy;
			let enMax = spirit.getProp(id).maxEnergy;
			// if(this.builded[id]==true){if (energy > enMax) energy = 0; else energy = enMax;}
			spirit.getProp(id).active = true;
			spirit.informate(id);
		}
	},
	setInactive(id) {
		if (spirit.getActive(id) == true) {
			spirit.getProp(id).active = false;
			spirit.informate(id);
		}
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
	informate(id) {
		if (spirit.getActive(id) != false) Game.message(getTranslate("Spirit: ") + spirit.list[id] + getTranslate(" is active"));
		if (spirit.getActive(id) != true) Game.message(getTranslate("Spirit: ") + spirit.list[id] + getTranslate(" is inactive"));
	},
	recieveEnergy(id, value) {
		if (spirit.getProp(id).energy >= value) spirit.getProp(id).energy -= value;
	},
	addEnergy(id, value) {
		if (spirit.getProp(id).energy < value && spirit.getProp(id).energy + value < spirit.getProp(id).maxEnergy) spirit.getProp(id).energy += value;
	},
	setMaxEnergy(id, value) {
		spirit.getProp(id).maxEnergy += value;
	}
}
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
