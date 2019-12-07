
// var Bubble = Particles.registerParticleType({
// 	type: 1,
// 	texture: "bubble",
// 	size: [0.4, 0.7],
// 	lifetime: [20, 60],
// 	velocity: [0, 0.005, 0]
// });

// var emitter = new Particles.ParticleEmitter(0, 0, 0);
// var Emit = function (x, y, z) {
// 	var vy = Math.random();
// 	if(vy<0.5)vy=0.7;
// 	emitter.emit(Native.ParticleType.bubble, 0, x+Math.random(), y+vy, z+Math.random())
// }

// var blend = {
// 	list: {},
// 	effects: {},
// 	reg: function (texture, name, ingredients, spiritID){
// 		regItem(texture, name, 64);
// 		this.list[ItemID[texture]] = spiritID;
// 		if (ingredients) Recipes.addShaped({ id: ItemID[texture], count: 1, data: 0 }, ["aaa", "aba", "aaa"], ingredients );
// 		// if (spiritID === 0 || spiritID) this.addBlendEffect(ItemID[texture], spiritID);
// 		EffectAPI.getEffect(spiritID);
// 	},
// 	isValid: function(id){
// 		if(id in this.list)return true;
// 		else return false;
// 	}
// }
// 	EffectAPI.addEffect({
// 		effectID: 0, name: "Hunters aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 1, name: "Frosty aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 2, name: "Distorted aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 3, name: "Calling aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 5, name: "Charred aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 6, name: "Energetic aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 7, name: "Mineral aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 8, name: "Visceral aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});
// 	EffectAPI.addEffect({
// 		effectID: 9, name: "Arboreal aura", positive: true,
// 		func: function(){Player.addVelocity(0, 0.01, 0);}
// 	});

// // EffectAPI.addEffect("Hunters", 0);
// // EffectAPI.addEffect("Frosty", 1);
// // EffectAPI.addEffect("Distorted", 2);
// // EffectAPI.addEffect("Calling", 3);
// // EffectAPI.addEffect("Charred", 5);
// // EffectAPI.addEffect("Energetic", 6);
// // EffectAPI.addEffect("Mineral", 7);
// // EffectAPI.addEffect("Visceral", 8);
// // EffectAPI.addEffect("Arboreal", 9);

// blend.reg("feathers_blend", "Calm feather blend", ['a', ItemID.peace_soul_shard, 0, 'b', 288, 0], 0);
// blend.reg("snow_blend", "Evercold snow blend", ['a', ItemID.water_soul_shard, 0, 'b', 332, 0], 1);
// blend.reg("ender_pearl_blend", "Distorted pearl blend", ['a', ItemID.end_soul_shard, 0, 'b', 368, 0], 2);
// blend.reg("lapis_blend", "Undead lapis blend", ['a', ItemID.undeath_soul_shard, 0, 'b', 351, 4], 3);
// blend.reg("charcoal_blend", "Nether Charcoal blend", ['a', ItemID.nether_soul_shard, 0, 'b', 263, 1], 5);
// blend.reg("redstone_blend", "Mystic redstone blend", ['a', ItemID.will_soul_shard, 0, 'b', 331, 0], 6);
// blend.reg("flint_blend", "Tool flint blend", ['a', ItemID.mind_soul_shard, 0, 'b', 318, 0], 7);
// blend.reg("fleshy_blend", "Wild flesh blend", ['a', ItemID.wild_soul_shard, 0, 'b', 319, 0], 8);
// blend.reg("wood_blend", "Cursed wood blend", ['a', ItemID.wither_soul_shard, 0, 'b', 5, -1], 9);
// blend.reg("ethereal_goo_blend", "Ethereal goo blend");

// var bathHeater_UI = new UI.StandartWindow({
// 	standart: {
// 		header: { text: { text: "Created With UIEditor" } },
// 		background: { color: android.graphics.Color.parseColor("#C6C6C6") }, inventory: { standart: true }
// 	},
// 	drawing: [],
// 	elements: {
// 		"image_0": { type: "image", x: 380, y: 120, bitmap: "bath.bath_heater", scale: 3.2 },
// 		"debug": { type: "text", x: 380, y: 80, width: 1e3, height: 20, text: "текст", font: {size: 8}},
// 		"blend": {
// 			type: "slot", x: 479, y: 120, size: 58, bitmap: "bath.slot_default", isValid: function (id, count, data) {
// 				return blend.isValid(id);
// 			}
// 		},
// 		"fuel": {
// 			type: "slot", x: 479, y: 231, size: 58, bitmap: "bath.slot_default", isValid: function (id, count, data) {
// 				return Recipes.getFuelBurnDuration(id, data) > 0;
// 			}
// 		},
// 		"burn": { type: "scale", x: 486, y: 184, direction: 1, bitmap: "bath.burn", scale: 3.15, value: 0}, //burn
// 		"scale_0": { type: "scale", x: 547, y: 129, direction: 0, bitmap: "bath.scale_toLeft", scale: 3.2, value: 0 }, //right bubble
// 		"scale_1": { type: "scale", x: 377, y: 129, direction: 2, bitmap: "bath.scale_toRight", scale: 3.2, value: 0 }, //left bubble
// 	}
// });
// TileEntity.registerPrototype(BlockID.bath_heater, {
// 	defaultValues: {
// 		work: false,
// 		item: false,
// 		id: null,
// 		progressItem: 0,
// 		burn: 0,
// 		burnMax: 0
// 	},
// 	getFuel: function (slotName) {
// 		var fuelSlot = this.container.getSlot(slotName);
// 		if (fuelSlot.id > 0) {
// 			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
// 			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
// 				fuelSlot.count--;
// 				this.container.validateSlot(slotName);
// 				return burn;
// 			}
// 		}
// 		return 0;
// 	},//eff +25s every 5 secs, burns 1 minute
// 	genBubbles: function(x, y, z){
// 		for (var x1 = -3; 3 >= x1; x1++)
// 			for (var block, z1 = -3; 3 >= z1; z1++)
// 				block = World.getBlock(x + x1, y, z + z1),
// 				(block.id == 9 || block.id == 8 )&&
// 				Emit(x + x1, y, z + z1);
// 	},
// 	getPlayer: function(x, y, z){
// 		for (var x1 = -3; 3 >= x1; x1++)
// 			for (var pos, z1 = -3; 3 >= z1; z1++){
// 				pos = Player.getPosition();
// 				if (pos.y == y && Math.floor(pos.x) == x && Math.floor(pos.z) == z)
// 					EffectAPI.addTime(blend.list[this.data.id], 500)
// 					break;
// 			}
// 	},
// 	getGuiScreen: function () { return bathHeater_UI; },
// 	tick: function () {
// 		let ticks = World.getThreadTime();
// 		var item = this.container.getSlot("blend");
// 		if (ticks % 20 == 0) {
// 			if (this.data.work && item.count >= 1 && this.data.item == false && !this.data.id) {
// 				item.count--;
// 				this.data.id = item.id;
// 				this.data.item = true;
// 				this.data.progressItem = 1200;
// 				EffectAPI.setPlayerEffect(blend.list[this.data.id], 25),
// 				this.container.validateSlot("blend");
// 			};

// 			if (this.data.burn <= 0) { this.data.work = false, this.data.burn = this.data.burnMax = this.getFuel("fuel");
// 				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
// 			};
// 			if (this.data.burn > 0){
// 				this.data.work = true;
// 			}
// 		}
// 		if (this.data.burn > 0) { 
// 			this.data.burn--;
// 			BlockRenderer.mapAtCoords(this.x, this.y, this.z, icRenderModel_active);
// 			// if (ticks % 40 == 0)this.genBubbles(this.x, this.y, this.z);
// 			if(this.data.item && this.data.progressItem != 0 && this.data.id != null) { this.data.progressItem-- }
// 		};
// 		if (ticks % 100 === 0 && this.data.progressItem > 100) { this.getPlayer(this.x, this.y, this.z)}

// 		if (this.data.progressItem == 0) { this.data.item = false, this.data.id = null };
// 		this.container.setScale("burn", this.data.burn / this.data.burnMax || 0);
// 		this.container.setScale("scale_0", this.data.progressItem / 1200 || 0);
// 		this.container.setScale("scale_1", this.data.progressItem / 1200 || 0);
// 	}
// });
