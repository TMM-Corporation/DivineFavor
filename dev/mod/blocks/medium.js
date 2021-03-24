var medium_models = [model_medium_arbow, model_medium_blizrabi, model_medium_endererer, model_medium_loon, model_medium_materia, model_medium_neblaze, model_medium_redwind, model_medium_romol, model_medium_squarefury, model_medium_timber]

var medium_Prototype = {
	// list: {},
	// addItem(id, recipe, spiritID) {
	// 	this.list[id] = [this.normalizeRecipe(recipe), spiritID];
	// },
	// normalizeRecipe(recipe){
	//   var list = [];
	//   for(let i in recipe) list.push(spirit.getIdData(recipe[i]));
	//   return list;
	// },
	// getItemList(id){
	// 	if(id in medium_Prototype.list){
	// 		let list = [];
	// 		list.push({
	// 			input: medium_Prototype.list[id][0],
	// 			output: [
	// 				{id: id, data:0, count: 1}
	// 			]
	// 		});
	// 		return list;
	// 	}
	// 	return [];
	// },

	addMedium(texture_name, name, texture, CIDs) {
		var id = regBlock(texture_name, name, texture, true)
		TileRenderer.setStandartModel(id, texture)
		TileRenderer.registerFullRotationModel(id, 0, texture)
		TileEntity.registerPrototype(id, {
			defaultValues: {
				state: "none",
				spiritID: null,
				model: null,
				spirits: CIDs,
				meta: 0,
			},
			setModelBySpirit: function () {
				if (this.data.spiritID)
					for (let i in this.data.spirits)
						if (this.data.spirits[i] == this.data.spiritID)
							this.data.model = medium_models[this.data.spiritID]
			},
			getInputSlot: function (all, num) {
				let slots = []
				if (all) {
					for (let i = 0; i < 9; i++) {
						slots[i] = this.container.getSlot("input_" + i)
					}
					return slots
				} else if (num) {
					return this.container.getSlot("input_" + num)
				}
			},
			getOutputSlot: function (all, num) {
				let slots = []
				if (all) {
					for (let i = 0; i < 9; i++) {
						slots[i] = this.container.getSlot("output_" + i)
					}
					return slots
				} else if (num) {
					return this.container.getSlot("output_" + num)
				}
			},
			init: function () {
				// var Window = this.getGuiScreen();
				// Window.content.elements["spirit"].visual = false;
				// Window.content.elements["spirit"].bitmap = "slot_default";
			},
			getGuiScreen: function () {
				if (this.data.state != "trade")
					return new UI.StandartWindow({
						standart: {
							header: {text: {text: t("Created With UIEditor")}},
							background: {color: android.graphics.Color.parseColor("#C6C6C6")}, inventory: {standart: true}
						},
						drawing: [],
						elements: {
							"input0": {type: "slot", x: 370, y: 80, size: 60, bitmap: "slot_default"},
							"input1": {type: "slot", x: 430, y: 80, size: 60, bitmap: "slot_default"},
							"input2": {type: "slot", x: 490, y: 80, size: 60, bitmap: "slot_default"},
							"input3": {type: "slot", x: 370, y: 140, size: 60, bitmap: "slot_default"},
							"input4": {type: "slot", x: 430, y: 140, size: 60, bitmap: "slot_default"},
							"input5": {type: "slot", x: 490, y: 140, size: 60, bitmap: "slot_default"},
							"input6": {type: "slot", x: 370, y: 200, size: 60, bitmap: "slot_default"},
							"input7": {type: "slot", x: 430, y: 200, size: 60, bitmap: "slot_default"},
							"input8": {type: "slot", x: 490, y: 200, size: 60, bitmap: "slot_default"},
							"spirit": {
								type: "slot", x: 610, y: 140, size: 60, bitmap: "slot_default", isValid: function (id) {
									for (let i in CIDs) {
										var stone = Spirit.get.CallingStoneById(CIDs[i])
										// alert(id + "|" + ItemID[stone])
										return (id == ItemID[stone])
									}
								}
							},
							"output0": {type: "slot", x: 730, y: 80, size: 60, bitmap: "slot_default"},
							"output1": {type: "slot", x: 790, y: 80, size: 60, bitmap: "slot_default"},
							"output2": {type: "slot", x: 850, y: 80, size: 60, bitmap: "slot_default"},
							"output3": {type: "slot", x: 730, y: 140, size: 60, bitmap: "slot_default"},
							"output4": {type: "slot", x: 790, y: 140, size: 60, bitmap: "slot_default"},
							"output5": {type: "slot", x: 850, y: 140, size: 60, bitmap: "slot_default"},
							"output6": {type: "slot", x: 730, y: 200, size: 60, bitmap: "slot_default"},
							"output7": {type: "slot", x: 790, y: 200, size: 60, bitmap: "slot_default"},
							"output8": {type: "slot", x: 850, y: 200, size: 60, bitmap: "slot_default"},
						}
					})
			},
			setSpirit() {
				this.data.spiritID = Spirit.get.IdByCallingStoneItemID(this.container.getSlot("spirit").id)
			},
			setState(state) {
				this.data.state = state
			},
			getState() {
				return this.data.state
			},
			getTradeItem() {
				return Trade.get.Result(this.getInputSlot(true), this.data.spiritID)
				// spirit.getTrade(this.getInputSlot(true), this.data.spiritID)
			},
			// getTrading(){
			// 	return spirit.tradeCheck(this.getInputSlot(true), this.data.spiritID)
			// },
			mapRender: function () {
				if (this.getTradeItem())
					TileRenderer.mapAtCoords(this.x, this.y, this.z, this.data.model[1], this.data.meta), this.setState("trade")
				else
					TileRenderer.mapAtCoords(this.x, this.y, this.z, this.data.model[0], this.data.meta), this.setState("active")
				return this.getState()
			},
			unMapRender() {
				// if(this.getState() != "none")BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
				TileRenderer.mapAtCoords(this.x, this.y, this.z, id, this.data.meta)
				this.setState("none")
			},
			tick: function () {
				let ticks = World.getThreadTime()
				if (ticks % 100 == 0) {
					this.setSpirit()
					this.setModelBySpirit()// Game.message("SpiritID: " + this.data.spiritID + ", active: " + (this.data.spiritID ? (spirit.getActive(this.data.spiritID) + ", "): "false, ") + (this.data.model ? "Model: ok" : "Model: " + this.data.model) + ", gb.data: " + gb.data)
					if (this.data.spiritID && this.data.model)
						if (Spirit.get.Active(this.data.spiritID))
							this.mapRender(); else this.unMapRender()
				}
			},
			destroy: function () {
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z)
			}
		})
		TileRenderer.setRotationPlaceFunction(texture_name, true)
	},
	addMediumRecipes(name) {

	}
}
var Medium = {
	LIST: {},
	MODELS: [
		model_medium_arbow,
		model_medium_blizrabi,
		model_medium_endererer,
		model_medium_loon,
		model_medium_materia,
		model_medium_neblaze,
		model_medium_redwind,
		model_medium_romol,
		model_medium_squarefury,
		model_medium_timber
	],
	THREADLIST: {},
	set: {
		New(prototype) {
			var tL = prototype.textureList
			prototype.textureList = [[tL[2] || tL[0], 0], [tL[2] || tL[0], 0], [tL[0], 0], [tL[1], 0], [tL[0], 0], [tL[0], 0]]
			var id = regBlock(prototype.texture, prototype.name, prototype.textureList, true)
			Medium.LIST[id] = prototype
			this.Tile(prototype, id)
		},
		Tile(prototype, id) {
			TileRenderer.setStandartModel(id, prototype.textureList)
			TileRenderer.registerFullRotationModel(id, 0, prototype.textureList)
			TileEntity.registerPrototype(id, {
				defaultValues: {
					state: "none",
					spiritID: null,
					model: null,
					spirits: prototype.spiritList,
					TTKEY: "",
					old: {spID: null, model: null}
				},
				init: function () {
					// alert("New init at: {x: " + this.x + ", y: " + this.y + ", z: " + this.z + "}")
					Medium.set.Reset(this)
					TileThreading.InitThis(this)
					// Threading.THREADLIST[Medium.set.Key(this)] = this //{ticking() {alert("message")} }
					// Logger.Log(this.data.protoID, 'ProtoID')
					// DebugThis(function () {
					// }, 'Init')
					// Parser.get(this, true, 'Medium')
				},
				getGuiScreen: function () {
					if (this.data.state != "trade")
						return new UI.StandartWindow({
							standart: {
								header: {text: {text: prototype.name || t("Created With UIEditor")}},
								background: {color: android.graphics.Color.parseColor("#C6C6C6")}, inventory: {standart: true}
							},
							drawing: [],
							elements: {
								"input0": {type: "slot", x: 370, y: 80, size: 60, bitmap: "slot_default"},
								"input1": {type: "slot", x: 430, y: 80, size: 60, bitmap: "slot_default"},
								"input2": {type: "slot", x: 490, y: 80, size: 60, bitmap: "slot_default"},
								"input3": {type: "slot", x: 370, y: 140, size: 60, bitmap: "slot_default"},
								"input4": {type: "slot", x: 430, y: 140, size: 60, bitmap: "slot_default"},
								"input5": {type: "slot", x: 490, y: 140, size: 60, bitmap: "slot_default"},
								"input6": {type: "slot", x: 370, y: 200, size: 60, bitmap: "slot_default"},
								"input7": {type: "slot", x: 430, y: 200, size: 60, bitmap: "slot_default"},
								"input8": {type: "slot", x: 490, y: 200, size: 60, bitmap: "slot_default"},
								"spirit": {
									type: "slot", x: 610, y: 140, size: 60, bitmap: "slot_default", isValid: function (id) {
										return Medium.set.ValidateSlot(id, prototype.spiritList)
									}
								},
								"output0": {type: "slot", x: 730, y: 80, size: 60, bitmap: "slot_default"},
								"output1": {type: "slot", x: 790, y: 80, size: 60, bitmap: "slot_default"},
								"output2": {type: "slot", x: 850, y: 80, size: 60, bitmap: "slot_default"},
								"output3": {type: "slot", x: 730, y: 140, size: 60, bitmap: "slot_default"},
								"output4": {type: "slot", x: 790, y: 140, size: 60, bitmap: "slot_default"},
								"output5": {type: "slot", x: 850, y: 140, size: 60, bitmap: "slot_default"},
								"output6": {type: "slot", x: 730, y: 200, size: 60, bitmap: "slot_default"},
								"output7": {type: "slot", x: 790, y: 200, size: 60, bitmap: "slot_default"},
								"output8": {type: "slot", x: 850, y: 200, size: 60, bitmap: "slot_default"},
							}
						})
					// alert("message")
				},
				ticking: function () {
					if (this.data.spiritID != this.data.old.spID) {
						this.data.old.spID = this.data.spiritID
						Log(this.data.spiritID, "SpiritID")
					}
					if (this.data.model != this.data.old.model) {
						this.data.old.model = this.data.model
						Log(Parser.get(this.data.model, true, 'Medium Model'), "Medium Model")
					}

					Medium.set.Spirit(this)
					Medium.set.Model(this)
					Medium.set.Map(this)
					// this.setSpirit()
					// this.setModelBySpirit()
					// Game.message("SpiritID: " + this.data.spiritID + ", active: " +
					// 	(this.data.spiritID ? (Spirit.get.Active(this.data.spiritID) + ", ") : "false, ") +
					// 	(this.data.model ? "Model: ok" : "Model: " + this.data.model))
					// alert(this.data.spiritID)
				},
				destroy: function () {
					TileThreading.DestroyThis(this)
					// delete Medium.THREADLIST[this.data.protoID]
					BlockRenderer.unmapAtCoords(this.x, this.y, this.z)
				}
			})
			TileRenderer.setRotationPlaceFunction(prototype.texture, true)
		},
		Model(this_) {
			if (this_.data.spiritID)
				this_.data.model = Medium.MODELS[this_.data.spiritID] || null
			// for (let i in prototype.data.spirits)
			// 	if (prototype.data.spirits[i] == prototype.data.spiritID)
		},
		Spirit(this_) {
			var slotID = this_.container.getSlot("spirit").id
			// alert(slotID)
			this_.data.spiritID = Spirit.get.IdByCallingStoneItemID(slotID) || null
		},
		ValidateSlot(id, spirits) {
			for (let i in spirits) {
				var stone = Spirit.get.CallingStoneById(spirits[i])
				var idR = (id == ItemID[stone])
				Log(id + (idR ? " = " : " != ") + ItemID[stone], "Medium")
				return idR
			}
			return false
		},
		State(this_, s) {
			return this_.data.state = s || "none"
		},
		Map(this_) {
			if ((this_.data.spiritID && this_.data.model) && (Spirit.get.Active(this_.data.spiritID)) && Medium.get.Structure(this_)) {
				if (Medium.get.TradeItem(this_))
					TileRenderer.mapAtCoords(this_.x, this_.y, this_.z, this_.data.model[1], this_.data.meta), Medium.set.State(this_, "trade")
				else
					TileRenderer.mapAtCoords(this_.x, this_.y, this_.z, this_.data.model[0], this_.data.meta), Medium.set.State(this_, "active")
				// Medium.get.State(this_)
			} else {
				// alert(this_.blockID)
				TileRenderer.mapAtCoords(this_.x, this_.y, this_.z, this_.blockID, this_.data.meta)
				Medium.set.State(this_)
			}
		},
		// Key(this_) {
		// 	var key = this_.data.protoID
		// 	if (!key) key = GenerateKey()
		// 	Log("New Key at [" + this_.x + "," + this_.y + "," + this_.z + "]; KEY: " + key, "Medium KeyGen")
		// 	return key
		// },
		Reset(this_) {
			DebugThis(function () {
				this_.data.model = null
				this_.data.spiritID = null
				Medium.set.Map(this_)
			}, 'ResetModel')
		},
	},
	get: {
		TradeItem(this_) {
			return Trade.get.Result(Medium.get.SlotList(this_.container, true, 9, "input"), this_.data.spiritID)
		},
		State(this_) {
			return this_.data.state
		},
		SlotList(container, all, count, type) {
			let slots = []
			if (all) {
				for (let i = 0; i < (count || 9); i++)
					slots[i] = container.getSlot(type + "_" + i)
				return slots
			} else if (num)
				return container.getSlot(type + "_" + num)
		},
		// Key(this_) {
		// 	return this_.data.protoID || undefined
		// },
		Structure(this_) {
			var spID = this_.data.spiritID
			if (spID)
				return StructuresAPI.getStructures(Spirit.get.Name(spID) + '1', this_.x, this_.y, this_.z)
			return false
		},
	},
	// TICKING: false,
	// RunTicking() {
	// 	Medium.TICKING = true
	// 	DebugThis(function () {
	// 		new Thread_(function () {
	// 			while (Medium.TICKING) {
	// 				for (let i in Medium.THREADLIST)
	// 					Medium.THREADLIST[i].ticking()
	// 				Thread_.sleep(50)
	// 			}
	// 		}).start()
	// 	}, 'Threading')
	// },
	// StopTicking() {
	// 	Medium.TICKING = false
	// 	Medium.THREADLIST = []
	// },
}

// Callback.addCallback("LevelLoaded", function () {
// 	Medium.RunTicking()
// })
// Callback.addCallback("LevelLeft", function () {
// 	Medium.StopTicking()
// })
// Medium.set.New({
// 	name: "", texture: "",
// 	textureList: ["", ""],
// 	spiritList: []
// })
// medium_Prototype.addMedium("medium_gold", "Gold Medium", [
// 	["debug", 0],["debug", 1],["debug", 2],["debug", 3],["debug", 4],["debug", 5]], [0,3,4,8]);
Medium.set.New({
	name: "Gold Medium", texture: "medium_gold",
	textureList: ["gold_block", "medium_gold_inactive"],
	spiritList: [0, 3, 4, 8]
})
Medium.set.New({
	name: "Iron Medium", texture: "medium_iron",
	textureList: ["iron_block", "medium_iron_inactive"],
	spiritList: [2, 7]
})
Medium.set.New({
	name: "Lapis Medium", texture: "medium_lapis",
	textureList: ["lapis_block", "medium_lapis_inactive"],
	spiritList: [1]
})
Medium.set.New({
	name: "Log Medium", texture: "medium_log",
	textureList: ["log", "medium_log_inactive", "log_top"],
	spiritList: [9]
})
Medium.set.New({
	name: "Obsidian Medium", texture: "medium_obsidian",
	textureList: ["obsidian", "medium_obsidian_inactive"],
	spiritList: [5]
})
Medium.set.New({
	name: "Redstone Medium", texture: "medium_redstone",
	textureList: ["redstone_block", "medium_redstone_inactive"],
	spiritList: [6]
})
// medium_Prototype.addMedium("medium_gold", "Gold Medium", [
// 	["gold_block", 0], ["gold_block", 0], ["gold_block", 0], ["medium_gold_inactive", 0], ["gold_block", 0], ["gold_block", 0]], [0, 3, 4, 8])
// medium_Prototype.addMedium("medium_iron", "Iron Medium", [
// 	["iron_block", 0], ["iron_block", 0], ["iron_block", 0], ["medium_iron_inactive", 0], ["iron_block", 0], ["iron_block", 0]], [2, 7])
// medium_Prototype.addMedium("medium_lapis", "Lapis Medium", [
// 	["lapis_block", 0], ["lapis_block", 0], ["lapis_block", 0], ["medium_lapis_inactive", 0], ["lapis_block", 0], ["lapis_block", 0]], [1])
// medium_Prototype.addMedium("medium_log", "Log Medium", [
// 	["log_top", 0], ["log_top", 0], ["log", 0], ["medium_log_inactive", 0], ["log", 0], ["log", 0]], [9])
// medium_Prototype.addMedium("medium_obsidian", "Obsidian Medium", [
// 	["obsidian", 0], ["obsidian", 0], ["obsidian", 0], ["medium_obsidian_inactive", 0], ["obsidian", 0], ["obsidian", 0]], [5])
// medium_Prototype.addMedium("medium_redstone", "Redstone Medium", [
// 	["redstone_block", 0], ["redstone_block", 0], ["redstone_block", 0], ["medium_redstone_inactive", 0], ["redstone_block", 0], ["redstone_block", 0]], [6])

ModAPI.addAPICallback("RecipeViewer", function (api) {
	let RecipeViewer = api.Core, _id = 0
	RecipeViewer.registerRecipeType("Medium", {
		contents: {
			icon: BlockID.medium_gold,
			description: "Medium",
			elements: {
				input0: {type: "slot", x: 90, y: 80, size: 100},
				input1: {type: "slot", x: 190, y: 80, size: 100},
				input2: {type: "slot", x: 290, y: 80, size: 100},
				input3: {type: "slot", x: 90, y: 180, size: 100},
				input4: {type: "slot", x: 190, y: 180, size: 100},
				input5: {type: "slot", x: 290, y: 180, size: 100},
				input6: {type: "slot", x: 90, y: 280, size: 100},
				input7: {type: "slot", x: 190, y: 280, size: 100},
				input8: {type: "slot", x: 290, y: 280, size: 100},
				spirit: {type: "slot", x: 490, y: 130, size: 100, visual: true},
				medium: {type: "slot", x: 490, y: 230, size: 100, visual: true},
				output0: {type: "slot", x: 690, y: 180, size: 100},
			}
		},
		getList: function (id, data, isUsage) {
			_id = id
			if (isUsage) return []// return medium_Prototype.getItemList(id);
			for (let i in Trade.get.Items(id)) {
				alert(i)
				alert(Trade.get.Items(id)[i])
				for (let u in Trade.get.Items(id)[i]) {
					alert(u)
					alert(Trade.get.Items(id)[i][u])
				}
			}
			alert(Trade.get.Items(id))
			return Trade.get.Items(id)
		},
		onOpen: function (elements, data) {//Talisman.get.Recipe(specID)
			// elements.get("spirit").onBindingUpdated("source", {id: ItemID[spirit.callingStone[medium_Prototype.list[specID][1]]], data:-1, count:1})
			elements.get("spirit").onBindingUpdated("source", {id: ItemID[Spirit.get.ByCallingStone(Talisman.get.Spirit(_id))], data: 0, count: 1})
			// elements.get("medium").onBindingUpdated("source", {id: BlockID[spirit.mediums[medium_Prototype.list[specID][1]]], data:0, count:1})
			elements.get("medium").onBindingUpdated("source", {id: BlockID[Spirit.get.Medium(Talisman.get.Spirit(_id))], data: 0, count: 1})
		}
	})
})
// */
// Medium.RunTicking()
