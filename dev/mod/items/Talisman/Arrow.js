
// new ArrowTalisman(true, {
// 	name: "Cripple talisman", texture: "cripple",
// 	spirit: [Spirit.TYPE.TIMBER, 100], recipe: [339, [351, 12], 372, 309],
// 	use: function (obj) {
// 		if (63 != Entity.getType(obj.Entity))
// 			Entity.addEffect(obj.Entity, 2, 500, 1, 2, true)
// 	}
// });

ArrowTalisman(false, {
	name: "Anti gravity", texture: "anti_gravity", spirit: [Spirit.TYPE.ARBOW, 5],
	recipe: [339, 264, 262, 368], use: function (obj) {

	}
});
ArrowTalisman(false, {  
	name: "Armor corrosion", texture: "armor_corrosion", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 9], 341, 314], use: function (obj) {
		Game.message(t("Not working, this is multiplayer item..."))
	}
});
ArrowTalisman(true, {
	name:   "Blast", texture: "blast", spirit: [Spirit.TYPE.NEBLAZE, 30],
	recipe: [339, [351, 11], 262, 46], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, 0.24, false)
	}
});
ArrowTalisman(true, {
	name: "Blink", texture: "blink", spirit: [Spirit.TYPE.ENDERERER, 10],
	recipe: [339, [351, 2], 262, 368, 266], use: function (obj) {
		Player.setPosition(obj.x, obj.y + 1.60, obj.z)
	}
});
ArrowTalisman(false, {
	name: "Climbing", texture: "climbing", spirit: [Spirit.TYPE.ARBOW, 10],
	recipe: [339, [351, 3], 262, 65], use: function (obj) {
		Game.message(t("Climbing"))
	}
});
ArrowTalisman(false, {
	name: "Crawling Mist", texture: "crawling_mist", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 7], 262, 35, 40], use: function (obj) {
		Game.message(t("Works on player"))
	}
});
ArrowTalisman(true, {
	name: "Cripple", texture: "cripple", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 12], 372, 309], use: function (obj) {
		if (63 != Entity.getType(obj.Entity))
			Entity.addEffect(obj.Entity, 2, 500, 1, 2, true)
	}
});
ArrowTalisman(false, {
	name: "Destructive I", texture: "destructive_1", spirit: [Spirit.TYPE.ARBOW, 10],
	recipe: [339, [351, 0], 262, 274], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Destructive II", texture: "destructive_2", spirit: [Spirit.TYPE.ARBOW, 100],
	recipe: [339, [351, 12], 262, 257], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Destructive III", texture: "destructive_3", spirit: [Spirit.TYPE.ARBOW, 300],
	recipe: [339, [351, 1], 262, 278], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Disarm", texture: "disarm", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, [351, 7], 262, 35, 40], use: function (obj) {
		Game.message(t("Not working, this is multiplayer item..."))
	}
});
ArrowTalisman(true, {
	name: "Explosive", texture: "explosive", spirit: [Spirit.TYPE.NEBLAZE, 120],
	recipe: [339, 264, 262, 46, 347], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, 1, false)
	}
});
ArrowTalisman(false, {
	name: "Extinguish Fire", texture: "extinguish", spirit: [Spirit.TYPE.BLIZRABI, 10],
	recipe: [339, 264, 262, 326], use: function (obj) {
		Game.message(t("Removes all fire in 7x7x7"))
	}
});
ArrowTalisman(false, {
	name: "Fiery mark", texture: "fiery_mark", spirit: [Spirit.TYPE.TIMBER, 120],
	recipe: [339, [351, 1], 262, 385, 289, 259], use: function (obj) {
		Game.message(t("Explodes entity after 10 seconds"))
	}
});
ArrowTalisman(false, {
	name: "Fill Lungs", texture: "fill_lungs", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, 264, 262, 338, 287, 326], use: function (obj) {
		Game.message(t("Damage entity every 3 second 6HP"))
	}
});
ArrowTalisman(true, {
	name: "Flak", texture: "flak", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, 264, 262, 46, 347], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, 1, false)
	}
});
ArrowTalisman(true, {
	name: "Force", texture: "force", spirit: [Spirit.TYPE.ARBOW, 120],
	recipe: [339, [351, 3], 262, 42], use: function (obj) {
		if (obj.Entity) {
			let l = 0, def = { x: 0, y: 0, z: 0 };
			for (let i = 0; i < 100; i++) {
				l = Entity.getLookVector(Player.get());
				if (l != def) break;
			}
			Entity.moveToLook(obj.Entity, { speed: 20, jumpVel: 2 })
		}
	}
});
ArrowTalisman(true, {
	name: "Gamble", texture: "gamble", spirit: [Spirit.TYPE.ARBOW, 5],
	recipe: [339, [351, 2], 262, 280, 280, 280, 264], use: function (obj) {
		if (obj.Entity && random(0, 10) == 5)
			Entity.damageEntity(obj.Entity, 40);
		else
			Entity.damageEntity(obj.Entity, 10)
	}
});
ArrowTalisman(false, {
	name: "Hand swap", texture: "hand_swap", spirit: [Spirit.TYPE.ARBOW, 60],
	recipe: [339, 264, 262, 287], use: function (obj) {
		Game.message(t("Works on player, swaps items from one hand to second"))
	}
});
ArrowTalisman(true, {
	name: "High speed", texture: "high_speed", spirit: [Spirit.TYPE.ARBOW, 40],
	recipe: [339, [351, 12], 262, 46, 331], use: function (obj) {
		if (obj.Arrow) {
			obj.Arrow.speed = 10;
		}
	}
});
ArrowTalisman(false, {
	name: "Hollow leg", texture: "hollow_leg", spirit: [Spirit.TYPE.TIMBER, 40],
	recipe: [339, 264, 297, 325], use: function (obj) {
		Game.message(t("Works on Players, adds infinity hunger"))
	}
});
ArrowTalisman(false, {
	name: "Hover Bubble", texture: "hover_bubble", spirit: [Spirit.TYPE.ARBOW, 150],
	recipe: [339, [351, 13], 262, 288], use: function (obj) {
		Game.message(t("Works if player sitting and walking in 13x13x13 zone like hovering"))
	}
});
ArrowTalisman(true, {
	name: "Hyper Speed", texture: "hyper_speed", spirit: [Spirit.TYPE.ARBOW, 400],
	recipe: [339, [351, 12], 262, 46, 152], use: function (obj) {
		if (obj.Arrow) {
			obj.Arrow.speed = 10;
		}
	}
});
ArrowTalisman(false, {
	name: "Ice Breaker", texture: "ice_breaker", spirit: [Spirit.TYPE.BLIZRABI, 60],
	recipe: [339, [351, 6], 262, 79, 285], use: function (obj) {
		Game.message(t("Breaks all ice in 65x4x65"))
	}
});
ArrowTalisman(false, {
	name: "Ice Sphere", texture: "ice_sphere", spirit: [Spirit.TYPE.BLIZRABI, 60],
	recipe: [339, [351, 4], 326, 326, 79], use: function (obj) {
		Game.message(t("Creates an ice sphere r=6 + r=7"))
	}
});
ArrowTalisman(true, {
	name: "Impulse", texture: "impulse", spirit: [Spirit.TYPE.ARBOW, 30],
	recipe: [339, [351, 3], 262, 265], use: function (obj) {
		if (obj.Entity) {
			let l = 0, def = { x: 0, y: 0, z: 0 };
			for (let i = 0; i < 100; i++) {
				l = Entity.getLookVector(Player.get());
				if (l != def) break;
			}
			Entity.moveToLook(obj.Entity, { speed: 5, jumpVel: 2 })
		}
	}
});
ArrowTalisman(true, {
	name: "Incendiary", texture: "incendiary", spirit: [Spirit.TYPE.ARBOW, 40],
	recipe: [339, [351, 1], 262, 377], use: function (obj) {
		for (let i in fire) {
			var coord = fire[i];
			var coords = { x: coord.x + Math.floor(obj.x), y: Math.floor(obj.y), z: coord.z + Math.floor(obj.z) }
			if (World.getBlock(coords.x, coords.y, coords.z) != 0) {
				if (World.getBlock(coords.x, coords.y, coords.z).id == 0) World.setBlock(coords.x, coords.y, coords.z, 51);
				if (World.getBlock(coords.x, coords.y + 1, coords.z).id == 0) World.setBlock(coords.x, coords.y + 1, coords.z, 51);
				else if (World.getBlock(coords.x, coords.y + 2, coords.z).id == 0) World.setBlock(coords.x, coords.y + 2, coords.z, 51);
				if (World.getBlock(coords.x, coords.y - 1, coords.z).id == 0) World.setBlock(coords.x, coords.y - 1, coords.z, 51);
				else if (World.getBlock(coords.x, coords.y - 2, coords.z).id == 0) World.setBlock(coords.x, coords.y - 2, coords.z, 51);
			}
		}
	}
});
ArrowTalisman(true, {
	name: "Life Steal", texture: "life_steal", spirit: [Spirit.TYPE.LOON, 20],
	recipe: [339, [351, 9], 262, 322], use: function (obj) {
		if (obj.Entity != -1) {
			Entity.healEntity(Player.get(), 3)
			Entity.damageEntity(obj.Entity, 9)
		}
	}
});
ArrowTalisman(false, {
	name: "Limp leg", texture: "limp_leg", spirit: [Spirit.TYPE.TIMBER, 120],
	recipe: [339, [351, 8], 352, 40, 309], use: function (obj) {
		Player.addVelocity(0, -1, 0)
	}
});
ArrowTalisman(false, {
	name: "Lucky", texture: "lucky", spirit: [Spirit.TYPE.LOON, 30],
	recipe: [339, [351, 1], 262, 41], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Mine", texture: "mine", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, 264, 262, 46, 70], use: function (obj) {
		var data = [];
		Callback.addCallback("tick", function () {
			var c = Player.getPosition();
			if (Math.floor(c.x) == data[0] && Math.floor(c.y) == data[1] && Math.floor(c.z) == data[2])
				World.explode(c.x, c.y, c.z, 5, false);
		});
	}
});
ArrowTalisman(true, {
	name: "Nuke", texture: "nuke", spirit: [Spirit.TYPE.NEBLAZE, 400],
	recipe: [339, [351, 1], 262, 46, 46, 46], use: function (obj) {
		World.explode(obj.x, obj.y, obj.z, random(10, 20), true);
	}
});
ArrowTalisman(false, {
	name: "Petrification", texture: "petrification", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 13], 1, 219], use: function (obj) {
		Game.message(t("Add hunger to creature, when moving, to lift - stand several seconds"))
	}
});
ArrowTalisman(true, {
	name: "Piercing", texture: "piercing", spirit: [Spirit.TYPE.ARBOW, 40],
	recipe: [339, 264, 262, 388], use: function (obj) {
		if (obj.Entity) {
			Entity.damageEntity(obj.Entity, 1)
			Entity.healEntity(obj.Entity, 3)
		}
	}
});
ArrowTalisman(true, {
	name: "Reinforced I", texture: "reinforced_1", spirit: [Spirit.TYPE.SQUAREFURY, 10],
	recipe: [339, [351, 11], 262, 265], use: function (obj) {
		if (obj.Entity) Entity.damageEntity(obj.Entity, 4)
	}
});
ArrowTalisman(true, {
	name: "Reinforced II", texture: "reinforced_2", spirit: [Spirit.TYPE.SQUAREFURY, 100],
	recipe: [339, [351, 4], 262, 266], use: function (obj) {
		if (obj.Entity) Entity.damageEntity(obj.Entity, 8)
	}
});
ArrowTalisman(true, {
	name: "Reinforced III", texture: "reinforced_3", spirit: [Spirit.TYPE.SQUAREFURY, 400],
	recipe: [339, [351, 1], 262, 264], use: function (obj) {
		if (obj.Entity) Entity.damageEntity(obj.Entity, 16)
	}
});
ArrowTalisman(false, {
	name: "Ricochet", texture: "ricochet", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, 264, 262, 341], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Roots", texture: "roots", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 3], 32], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Skyfall", texture: "skyfall", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 15], 262, 288, 287], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Sniper", texture: "sniper", spirit: [Spirit.TYPE.ARBOW, 80],
	recipe: [339, [351, 14], 262, 381], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "Spooky", texture: "spooky", spirit: [Spirit.TYPE.LOON, 30],
	recipe: [339, 264, 262, 397], use: function (obj) {

	}
});
ArrowTalisman(true, {
	name: "Stasis", texture: "stasis", spirit: [Spirit.TYPE.LOON, 80],
	recipe: [339, [351, 4], 262, 406], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "suffocating_fumes", spirit: [Spirit.TYPE.TIMBER, 100],
	recipe: [339, [351, 8], 262, 88, 367], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "tracer", spirit: [Spirit.TYPE.ARBOW, 10],
	recipe: [339, [351, 4], 262, 348], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "vacuum", spirit: [Spirit.TYPE.LOON, 80],
	recipe: [339, [351, 5], 262, 49], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "wind", spirit: [Spirit.TYPE.TIMBER, 80],
	recipe: [339, [351, 8], 262, 331, 420], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "yummy", spirit: [Spirit.TYPE.TIMBER, 140],
	recipe: [339, [351, 3], 262, 319, 363, 365, 349], use: function (obj) {

	}
});
ArrowTalisman(false, {
	name: "", texture: "zero", spirit: [Spirit.TYPE.ARBOW, 30],
	recipe: [339, 264, 262, 368], use: function (obj) {

	}
});
// ArrowTalisman(true, {
// 	name: "", texture: "", spirit: [],
// 	recipe: , use: function (obj) {

// 	}
// });