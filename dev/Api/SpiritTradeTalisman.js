var Spirit = {
	creatve: false,
	TYPE: {
		"ARBOW": 0, 0: "ARBOW",
		"BLIZRABI": 1, 1: "BLIZRABI",
		"ENDERERER": 2, 2: "ENDERERER",
		"LOON": 3, 3: "LOON",
		"MATERIA": 4, 4: "MATERIA",
		"NEBLAZE": 5, 5: "NEBLAZE",
		"REDWIND": 6, 6: "REDWIND",
		"ROMOL": 7, 7: "ROMOL",
		"SQUAREFURY": 8, 8: "SQUAREFURY",
		"TIMBER": 9, 9: "TIMBER"
	},
	CALLING_STONES: {
		"calling_stone_arbow": 0, 0: "calling_stone_arbow",
		"calling_stone_blizrabi": 1, 1: "calling_stone_blizrabi",
		"calling_stone_endererer": 2, 2: "calling_stone_endererer",
		"calling_stone_loon": 3, 3: "calling_stone_loon",
		"calling_stone_materia": 4, 4: "calling_stone_materia",
		"calling_stone_neblaze": 5, 5: "calling_stone_neblaze",
		"calling_stone_redwind": 6, 6: "calling_stone_redwind",
		"calling_stone_romol": 7, 7: "calling_stone_romol",
		"calling_stone_squarefury": 8, 8: "calling_stone_squarefury",
		"calling_stone_timber": 9, 9: "calling_stone_timber"
	},
	MEDIUMS: {
		0: "medium_gold",
		1: "medium_lapis",
		2: "medium_iron",
		3: "medium_gold",
		4: "medium_gold",
		5: "medium_obsidian",
		6: "medium_redstone",
		7: "medium_iron",
		8: "medium_gold",
		9: "medium_log"
	},
	RECIPES: {},
	INFO: [// time [start, end], status[builded, trading, active], energy[current, max]
	/*0*/	{time: [11, 15], status: [false, false, false], energy: [50, 50]},
	/*1*/	{time: [14, 18], status: [false, false, false], energy: [50, 50]},
	/*2*/	{time: [19, 23], status: [false, false, false], energy: [50, 50]},
	/*3*/	{time: [1, 4], status: [false, false, false], energy: [50, 50]},
	/*4*/	{time: [5, 9], status: [false, false, false], energy: [50, 50]},
	/*5*/	{time: [10, 14], status: [false, false, false], energy: [50, 50]},
	/*6*/	{time: [9, 12], status: [false, false, false], energy: [50, 50]},
	/*7*/	{time: [7, 10], status: [false, false, false], energy: [50, 50]},
	/*8*/	{time: [22, 2], status: [false, false, false], energy: [50, 50]},
	/*9*/	{time: [18, 22], status: [false, false, false], energy: [50, 50]}
	],
	set: {
		Creative(bool) {
			if (bool)
				for (let index in Spirit.INFO) {
					let sp = Spirit.INFO[index]
					sp.energy[0] = 200000
					sp.energy[1] = 200000
					sp.status = [true, true, true]
					Spirit.creatve = true
				}
		},
		Active(id) {
			try {
				var prop = Spirit.get.Info(id),
					energy = prop.energy
				if (prop.active == false && prop.builded == true) {
					if (energy[0] > energy[1]) energy[0] = 0; else energy[0] = energy[1]
					prop.active = true
					Spirit.Informate(id)
					Callback.invokeCallback("SpiritActive", prop, id)
				}
			} catch (e) {
				LogError(e, ['Spirit', 'get', 'Name'], true)
			}
		},
		Inactive(id) {
			if (Spirit.get.Active(id) == true && Spirit.get.Builded(id) == true) {
				Spirit.get.Info(id).active = false
				Spirit.informate(id)
				Callback.invokeCallback("SpiritInActive")
			}
		},
		Energy(id, value, minus) {
			var energy = Spirit.get.Energy(id)
			if (minus) {
				if (value <= energy[0] && energy[0] - value > 0) energy[0] -= value
				Callback.invokeCallback("SpiritEnergyGiven", id, value, energy)
			} else {
				if (energy[0] < value && energy[0] + value < energy[1]) energy[0] += value
				Callback.invokeCallback("SpiritEnergyRecieved", id, value, energy)
			}
		},
		EnergyMax(id, value) {
			return Spirit.get.Energy(id)[1] += value
		}
	},
	get: {
		Info(id) {
			return Spirit.INFO[this.Id(id)]
		},
		Name(p) {
			return (typeof p == 'string') ? p : Spirit.TYPE[p]
		},
		Id(p) {
			return (typeof p == 'number') ? p : Spirit.TYPE[p]
		},
		Active(id) {
			return this.Info(id).status[2]
		},
		Builded(id) {
			return this.Info(id).status[0]
		},
		Energy(id) {
			return this.Info(id).energy
		},
		EnergyMax(id) {
			return this.Energy(id)[0]
		},
		EnergyCurrent(id) {
			return this.Energy(id)[1]
		},
		CallingStoneById(id) {
			return (typeof id == 'number') ? Spirit.CALLING_STONES[id] : id
		},
		IdByCallingStone(str) {
			return (typeof str == 'string') ? Spirit.CALLING_STONES[str] : str
		},
		IdByCallingStoneItemID(id) {
			if (id != 0) {
				for (let i in Spirit.CALLING_STONES)
					if ((typeof i == 'string') && ItemID[i] == id) return Spirit.get.IdByCallingStone(i)
			} else return null
			// return (typeof str == 'number') ? p : Spirit.CALLING_STONES[str]
		},
		IsCallingStone(id) {
			for (let i in Spirit.CALLING_STONES)
				if ((typeof i == 'string') && ItemID[i] == id) return true
			return false
		},
		Medium(id) {
			return Spirit.MEDIUMS[id]
		}
	},
	Informate(id) {
		var name = Spirit.get.Name(id)
		if (Spirit.get.Active(id)) Game.message(t("Spirit: ") + name + t(" is active"))
		else Game.message(t("Spirit: ") + name + t(" is inactive"))
		Callback.invokeCallback("SpiritInformated", id, prop)
	}
}

var Trade = {
	LIST: {},
	RECIPES: {},
	set: {
		Recipe(id, recipe, spirit) {
			//recipe - [339, [351, 9], 341, 314]
			//spirit - Spirit.TYPE.TIMBER || 9
			Trade.RECIPES[id] = [Trade.set.Normalize(recipe), spirit]
		},
		Normalize(recipe) {
			var list = []
			// recipe - [339, [351, 9], 341, 314]
			// i - [0, 1, 2, 3]
			// recipe[i] - [339, [Object object], 341, 314]
			for (let i in recipe) list.push(Trade.set.ItemInfo(recipe[i]))
			// list[0]- [{id: 339, data: 0, count: 1}, {id: 351, data: 9, count: 1}, {id: 341, data: 0, count: 1}, {id: 314, data: 0, count: 1}]
			return list
		},
		ItemInfo(item) {
			return (Array.isArray(item)) ? {id: item[0], data: item[1] || 0, count: item[2] || 1} : {id: item, data: 0, count: 1}
		},
	},
	get: {
		Recipe(id) {
			return Trade.RECIPES[id]
		},
		Items(id) {
			if (id in Trade.RECIPES)
				return [{
					input: Trade.RECIPES[id][0],
					output: [{id: id, data: 0, count: 1}]
				}]
			return []
		},
		Result(slots, SPID) {
			for (let id in Trade.LIST) {
				let c = 0, recipe = Trade.LIST[id][0]
				recipeCheck: for (let i in recipe) {
					let item = Trade.get.Item(recipe[i]),
						slot = slots[c]// alert(slots[counter].id)
					if (!(slot.id == item.id && slot.data == item.data)) break recipeCheck
					if ((++c) == recipe.length && Talisman.get.Spirit(id) == SPID) {
						alert('Found recipe for id: ' + id)
						return id
					}
				} c = 0
			}
		},
	},
}

var Talisman = {
	LIST: { /*...*/},
	TYPE: {
		"arrow": 0, 0: "arrow",
		"blade": 1, 1: "blade",
		"spell": 2, 2: "spell",
		"tool": 3, 3: "tool",
		"dev": 4, 4: "dev"
	},
	set: {
		New(p) {
			var id = regItem(p.texture + '_' + (Talisman.TYPE[p.type]) + "_talisman", p.name, 1)
			Talisman.LIST[id] = p
			Item.registerNameOverrideFunction(id, function (i, n) {
				return Talisman.set.Tooltip(n, p)
			})
			Trade.set.Recipe(id, p.recipe, p.spirit[0])
		},
		Tooltip(n, p) {
			return n + ("\n" + t("Spirit: ") + Spirit.get.Name(p.spirit[0]) + "\n" + t("Favor cost: ") + p.spirit[1])
		}
	},
	get: {
		Info(id) {
			return Talisman.LIST[id] || null
		},
		Spirit(id) {
			return Talisman.get.Info(id).spirit[0]
		},
		UseMana(id) {
			return Talisman.get.Info(id).spirit[1]
		},
		UseFunc(id) {
			return Talisman.get.Info(id).use
		},
		Recipe(id) {
			return Talisman.get.Info(id).recipe
		},
		Texture(id) {
			return Talisman.get.Info(id).texture
		},
		Name(id) {
			return Talisman.get.Info(id).name
		},
		Type(id) {
			return Talisman.get.Info(id).type
		},
		Valid(id, types) {
			var valid = (id in Talisman.LIST)
			if (!types) return valid
			var type = Talisman.get.Type(id)
			if (valid) {
				return (!types[1]) ? (type === types[0]) : (type === types[2] || type === types[1])
			} else return false
		},
		isCarriedID() {
			var item = Player.getCarriedItem()
			return this.Valid(item.id) ? item.id : null
		},
		IdInCurrentItem(slotID) {
			var item = Player.getCarriedItem()
			if (item.extra) {
				var container = CIM.containers["e" + item.extra.getInt("extraCount")]
				if (container !== undefined) {
					return container.getSlot("slot_" + slotID).id || null
				}
			}
		},
		InCurrentItem(slotID) {
			var id = this.IdInCurrentItem(slotID)
			return this.Valid(id) ? Talisman.get.Info(id) : null
		}
	},
	Use(props, id) {
		if (!id) id = Talisman.get.isCarriedID()
		var cTalisman = Talisman.get.Info(id)
		// alert("Current: "+current)
		if (cTalisman) {
			var energy = Spirit.get.Energy(cTalisman.spirit[0])
			// alert('Start USE. Energy: '+energy[0]+'/'+current.spirit[1])
			if (energy[0] >= cTalisman.spirit[1]) {
				Spirit.set.Energy(cTalisman.spirit[0], cTalisman.spirit[1], true)
				cTalisman.use(props)
				// alert('USE FINISHED.'+current.use)
			}
		}
	}
}

function ArrowTalisman(enabled, p) {
	if (enabled) {
		p.name += ' arrow talisman'
		p.type = Talisman.TYPE.arrow
		return Talisman.set.New(p)
	}
}
function BladeTalisman(enabled, p) {
	if (enabled) {
		p.name += ' blade talisman'
		p.type = Talisman.TYPE.blade
		return Talisman.set.New(p)
	}
}
function SpellTalisman(enabled, p) {
	if (enabled) {
		p.name += ' spell talisman'
		p.type = Talisman.TYPE.spell
		return Talisman.set.New(p)
	}
}
function ToolTalisman(enabled, p) {
	if (enabled) {
		p.name += ' tool talisman'
		p.type = Talisman.TYPE.tool
		return Talisman.set.New(p)
	}
}
Spirit.set.Creative(true)

// new ArrowTalisman(true, {
// 	name: "Cripple talisman", texture: "cripple",
// 	spirit: [9, 100], recipe: [339, [351, 12], 372, 309],
// 	use: function (obj) {
// 		if (63 != Entity.getType(obj.Entity))
// 			Entity.addEffect(obj.Entity, 2, 500, 1, 2, true)
// 	}
// });
// var structures = [
// 	'arbow1', 'arbow2',
// 	'blizrabi1', 'blizrabi2',
// 	'endererer1', 'endererer2',
// 	'loon1', 'loon2',
// 	'materia1', 'materia2',
// 	'neblaze1', 'neblaze2',
// 	'redwind1', 'redwind2',
// 	'romol1', 'romol2',
// 	'squarefury1', 'squarefury2',
// 	'timber1', 'timber2'
// ];

// function addStructureButtons(remove) {
// 	var buttons = [], i = 0;
// 	while (i<10) {
// 		alert(structures[i] + "/" + structures[i+10])
// 		var o = i;
// 		buttons.push(new Button().setText(structures[i] + "/" + structures[i+10]).setLayoutParams(A.WRAP, A.WRAP)
// 			.setOnClickListener(function (v) {
// 				StructuresAPI.set(structures[o], ItemUseCoords.x, ItemUseCoords.y, ItemUseCoords.z, remove || false)
// 			})
// 			.setOnLongClickListener(function (v) {
// 				StructuresAPI.set(structures[o+10], ItemUseCoords.x, ItemUseCoords.y, ItemUseCoords.z, remove || false)
// 				return true
// 			})
// 		)
// 		i++;
// 	}
// 	return buttons
// }
