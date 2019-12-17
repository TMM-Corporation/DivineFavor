var medium_models = [model_medium_arbow, model_medium_blizrabi, model_medium_endererer, model_medium_loon, model_medium_materia, model_medium_neblaze, model_medium_redwind, model_medium_romol, model_medium_squarefury, model_medium_timber];
var medium_Prototype = {
	list: {},
	// contract_UI: ,
	addItem(id, recipe) {
		this.list[id] = recipe;
	},
	addMedium(texture, name, textures) {
		let id = regBlock(texture, name, textures, true),
		l_base_s = new BlockRenderer.Model(textures),
		l_base_i = new ICRender.Model(); l_base_i.addEntry(l_base_s);
		BlockRenderer.enableCoordMapping(id, 0, l_base_i);
		TileEntity.registerPrototype(id, {
			defaultValues: {
				state: "none",
				spiritID: null,
				model: null,
			},
			setModelBySpirit: function () {
				if (this.data.spiritID)
					this.data.model = medium_models[this.data.spiritID];
			},
			getOutputSlot: function (all, num) {
				let slots = [];
				if (all) {
					for (let i = 0; i < 9; i++) {
						slots[i] = this.container.getSlot("output_" + i);
					}
					return slots;
				} else if (num) {
					return this.container.getSlot("output_" + num);
				}
			},
			init: function () {
				var Window = this.getGuiScreen();
				Window.content.elements["spirit"].visual = false;
				Window.content.elements["spirit"].bitmap = "slot_default";
			},
			getInputSlot: function (all, num) {
				let slots = [];
				if (all) {
					for (let i = 0; i < 9; i++) {
						slots[i] = this.container.getSlot("input_" + i);
					}
					return slots;
				} else if (num) {
					return this.container.getSlot("input_" + num);
				}
			},
			getGuiScreen: function () {
				return new UI.StandartWindow({
					standart: {
						header: { text: { text: "Created With UIEditor" } },
						background: { color: android.graphics.Color.parseColor("#C6C6C6") }, inventory: { standart: true }
					},
					drawing: [],
					elements: {
						"input_1": { type: "slot", x: 370, y: 80, size: 60, bitmap: "slot_default" },
						"input_2": { type: "slot", x: 430, y: 80, size: 60, bitmap: "slot_default" },
						"input_3": { type: "slot", x: 490, y: 80, size: 60, bitmap: "slot_default" },
						"input_4": { type: "slot", x: 370, y: 140, size: 60, bitmap: "slot_default" },
						"input_5": { type: "slot", x: 430, y: 140, size: 60, bitmap: "slot_default" },
						"input_6": { type: "slot", x: 490, y: 140, size: 60, bitmap: "slot_default" },
						"input_7": { type: "slot", x: 370, y: 200, size: 60, bitmap: "slot_default" },
						"input_8": { type: "slot", x: 430, y: 200, size: 60, bitmap: "slot_default" },
						"input_9": { type: "slot", x: 490, y: 200, size: 60, bitmap: "slot_default" },
						"spirit": { type: "slot", x: 610, y: 140, size: 60, bitmap: "slot_default" },
						"output_1": { type: "slot", x: 730, y: 80, size: 60, bitmap: "slot_default" },
						"output_2": { type: "slot", x: 790, y: 80, size: 60, bitmap: "slot_default" },
						"output_3": { type: "slot", x: 850, y: 80, size: 60, bitmap: "slot_default" },
						"output_4": { type: "slot", x: 730, y: 140, size: 60, bitmap: "slot_default" },
						"output_5": { type: "slot", x: 790, y: 140, size: 60, bitmap: "slot_default" },
						"output_6": { type: "slot", x: 850, y: 140, size: 60, bitmap: "slot_default" },
						"output_7": { type: "slot", x: 730, y: 200, size: 60, bitmap: "slot_default" },
						"output_8": { type: "slot", x: 790, y: 200, size: 60, bitmap: "slot_default" },
						"output_9": { type: "slot", x: 850, y: 200, size: 60, bitmap: "slot_default" },
					}
				});
			},
			tick: function () {
				let ticks = World.getThreadTime();
				if (ticks % 100 == 0) {
					var Window = this.getGuiScreen();
					if (this.container.getSlot("spirit").id) {
						Window.content.elements["spirit"].visual = true;
						Window.content.elements["spirit"].bitmap = "";
					} else {
						this.init();
					}
					this.data.spiritID = spirit.getSpiritIdByCallingStone(this.container.getSlot("spirit").id);
					this.setModelBySpirit();
					// if (this.data.spiritID) alert("Spirit: ok, id:" + this.data.spiritID);
					// if (this.data.model) alert("Model: ok, " + (this.data.model).toString()); else alert("Model: " + this.data.model);
					if (this.data.spiritID && this.data.model)
						if (spirit.getActive(this.data.spiritID)) {
							// alert("SpiritActive");
							if (!spirit.tradeCheck(this.getInputSlot(true))) {
								// alert("SpiritNottrading");
								BlockRenderer.mapAtCoords(this.x, this.y, this.z, this.data.model.lai_0), this.data.state = "active";
							} else {
								BlockRenderer.mapAtCoords(this.x, this.y, this.z, this.data.model.lai_1), this.data.state = "trade";
								// alert("SpiritTrading");
							}
						} else {
							BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
							// alert("SpiritNotActive");
						}
				}
			}
		});
	}
}

medium_Prototype.addMedium("medium_gold", "Gold Medium", [
	["gold_block", 0], ["gold_block", 0], ["gold_block", 0], ["medium_gold_inactive", 0], ["gold_block", 0], ["gold_block", 0]]);
medium_Prototype.addMedium("medium_iron", "Iron Medium", [
	["iron_block", 0], ["iron_block", 0], ["iron_block", 0], ["medium_iron_inactive", 0], ["iron_block", 0], ["iron_block", 0]]);
medium_Prototype.addMedium("medium_lapis", "Lapis Medium", [
	["lapis_block", 0], ["lapis_block", 0], ["lapis_block", 0], ["medium_lapis_inactive", 0], ["lapis_block", 0], ["lapis_block", 0]]);
medium_Prototype.addMedium("medium_log", "Log Medium", [
	["log_top", 0],	["log_top", 0],	["log", 0], ["medium_log_inactive", 0], ["log", 0], ["log", 0]]);
medium_Prototype.addMedium("medium_obsidian", "Obsidian Medium", [
	["obsidian", 0], ["medium_obsidian_inactive", 0], ["obsidian", 0], ["obsidian", 0], ["obsidian", 0], ["obsidian", 0]]);
medium_Prototype.addMedium("medium_redstone", "Redstone Medium", [
	["redstone_block", 0], ["medium_redstone_inactive", 0], ["redstone_block", 0], ["redstone_block", 0], ["redstone_block", 0], ["redstone_block", 0]]);