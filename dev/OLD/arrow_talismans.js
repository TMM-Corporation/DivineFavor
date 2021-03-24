//([type, texture, spiritID, cost],"en", "ru", [recipe], function(obj){func}, type)
var fire = [
	{ x: 3, z: 0 }, { x: -3, z: 0 }, { x: 0, z: 3 }, { x: 0, z: -3 },
	{ x: -2, z: -2 }, { x: -2, z: -1 }, { x: -2, z: 0 }, { x: -2, z: 1 }, { x: -2, z: 2 },
	{ x: -1, z: -2 }, { x: -1, z: -1 }, { x: -1, z: 0 }, { x: -1, z: 1 }, { x: -1, z: 2 },
	{ x: 0, z: -2 }, { x: 0, z: -1 }, { x: 0, z: 0 }, { x: 0, z: 1 }, { x: 0, z: 2 },
	{ x: 1, z: -2 }, { x: 1, z: -1 }, { x: 1, z: 0 }, { x: 1, z: 1 }, { x: 1, z: 2 },
	{ x: 2, z: -2 }, { x: 2, z: -1 }, { x: 2, z: 0 }, { x: 2, z: 1 }, { x: 2, z: 2 }
]

var stasis = {
	coords: {},
	time: 0
}

var ricochetArrow = {
	Entity: null,
	bouncesLeft: 3,
	shoot(obj) {
		let coords = obj, lookAngle;
		// if(!obj.lookAngle)
		lookAngle = { yaw: Entity.getLookAngle(Player.get()).yaw, pitch: 0.3 };
		// else lookAngle = obj.lookAngle;
		// alert(lookAngle.yaw);
		// x
		// if(velocity.x>= 315|| 45<=velocity.x) velocity.x*(-1)
		// if(velocity.x>= 45|| <=velocity.x)
		// if(velocity.x>= || <=velocity.x)
		let velocity = lookDirection(lookAngle.yaw, lookAngle.pitch);
		let entity = Entity.spawn(coords.x + (velocity.x * 2), coords.y + (velocity.y * 2), coords.z + (velocity.z * 2), 80);
		Entity.setVelocity(entity, velocity.x, velocity.y, velocity.z);
		// if(this.Entity == obj.entity){
		this.Entity = entity;
		// }
	}
}
/**
 * Sides = Yaw
 * side1 0
 ** z++
 * side2 90
 ** x++
 * side3 180
 ** z--
 * side4 270
 ** x--

 * Top/Bottom = Pitch
 * top 90
 ** y--
 * bottom -90
 ** y++
 */
/*
Callback.addCallback("BuildBlock", function (coords, block, entity) {
	// Game.message("x: " + coords.x + ", y: " + coords.y + ", z: " + coords.z + ", Block: " + block.id)
});
Callback.addCallback("ProjectileHit", function (projectile, item, target) {
	let lookAngle = Entity.getLookAngle(projectile);
	// let lookAngleP = Entity.getLookAngle(projectile);
	// 	Game.message(" ");
	// 	Game.message(" ");
	// 	Game.message("New Result");
	// 	Game.message("Arrow Pitch: "+rtd(lookAngle.pitch, 180));
	// 	Game.message("Arrow Yaw: "+getYaw(lookAngle.yaw));
	// 	Game.message("Player Pitch: "+rtd(lookAngleP.pitch, 180));
	// 	Game.message("Player Yaw: "+getYaw(lookAngleP.yaw));
	// 	Game.message(" ");
	if (ricochetArrow.Entity == projectile) {
		if (target.entity == -1) {
			if (ricochetArrow.bouncesLeft > 0)
				ricochetArrow.shoot({ x: target.x, y: target.y, z: target.z, lookAngle: lookAngle, entity: projectile }),
					ricochetArrow.bouncesLeft--;
			else if (ricochetArrow.bouncesLeft <= 0)
				ricochetArrow.bouncesLeft = 3;
		}
		// Entity.remove(projectile);
		// ricochetArrow.Entity == null;
	}
});*/
talismans.regTalisman(["arrow", "anti_gravity", 0, 5], "Anti gravity arrow talisman", "ru", [339, 264, 262, 368],
	function (obj) { });

talismans.regTalisman(["arrow", "armor_corrosion", 9, 100], "Armor corrosion talisman", "ru", [339, [351, 9], 341, 314],
	function (obj) { Game.message(t("Not working, this is multiplayer item...")) }, 2);

talismans.regTalisman(["arrow", "blast", 5, 30], "Blast arrow talisman", "ru", [339, [351, 11], 262, 46],
	function (obj) { World.explode(obj.x, obj.y, obj.z, 0.24, false) }, 4);

talismans.regTalisman(["arrow", "blink", 2, 10], "Blink arrow talisman", "ru", [339, [351, 2], 262, 368, 266],
	function (obj) { Player.setPosition(obj.x, obj.y + 2, obj.z) }, 3);

talismans.regTalisman(["arrow", "climbing", 0, 10], "Climbing arrow talisman", "ru", [339, [351, 3], 262, 65],
	function (obj) { Game.message(t("Climbing")) }, 2);

talismans.regTalisman(["arrow", "crawling_mist", 9, 80], "Crawling mist talisman", "ru", [339, [351, 7], 262, 35, 40],
	function (obj) { Game.message(t("Works on player")) }, 2);

talismans.regTalisman(["arrow", "cripple", 9, 100], "Cripple talisman", "ru", [339, [351, 12], 372, 309],
	function (obj) {
		if (63 != Entity.getType(obj.Entity))
			Entity.addEffect(obj.Entity, 2, 500, 1, 2, true)
	}, 1);

talismans.regTalisman(["arrow", "destructive_1", 0, 10], "Destructive arrow I", "ru", [339, [351, 0], 262, 274],
	function (obj) {
		// if (ToolAPI.getBlockDestroyLevel(obj.id) == 1) World.setBlock(obj.x, obj.y, obj.z, 0, 0);
		// World.setBlock(obj.x, obj.y, obj.z, 0, 0);
		// World.setBlock(Math.min(obj.x), Math.min(obj.y), Math.min(obj.z), 0, 0);
		// alert(obj.x + " " + obj.y + " " + obj.z)
		// World.setBlock(obj.x, obj.y, obj.z, 0, 0);
		// var c = Player.getPosition();
		// for (var t = 0; t < 1; t += 0.1) {
		// 	x = obj.x + t;
		// 	y = obj.y + t;
		// 	z = obj.z + t;
		// 	var block = World.getBlock(x, y, z);
		// 	if (block.id) {
		// 		World.setBlock(x, y, z, 0);
		// 		World.drop(x, y, z, block.id, 1, block.data);
		// 		break;
		// 	}
		// }
	}, 3);

talismans.regTalisman(["arrow", "destructive_2", 0, 100], "Destructive arrow II", "ru", [339, [351, 12], 262, 257],
	function (obj) {
		// if (ToolAPI.getBlockDestroyLevel(obj.id) == 2) World.setBlock(obj.x, obj.y, obj.z, 0, 0);
		// alert(ToolAPI.getBlockDestroyLevel(obj.block.id) + " " + obj.block.id);
	}, 3);

talismans.regTalisman(["arrow", "destructive_3", 0, 300], "Destructive arrow III", "ru", [339, [351, 1], 262, 278],
	function (obj) {
		// if (ToolAPI.getBlockDestroyLevel(obj.id) == 3) World.setBlock(obj.x, obj.y, obj.z, 0, 0);
	}, 3);

talismans.regTalisman(["arrow", "disarm", 0, 80], "Disarm", "ru", [339, [351, 7], 262, 35, 40],
	function (obj) { Game.message(t("Not working, this is multiplayer item...")) }, 2);

talismans.regTalisman(["arrow", "explosive", 5, 120], "Explosive arrow", "ru", [339, 264, 262, 46, 347],
	function (obj) { World.explode(obj.x, obj.y, obj.z, 1, false) }, 4);

talismans.regTalisman(["arrow", "extinguish", 1, 10], "Extinguish fire", "ru", [339, 264, 262, 326],
	function (obj) { Game.message(t("Removes all fire in 7x7x7")) }); //stream

talismans.regTalisman(["arrow", "fiery_mark", 9, 120], "Fiery mark", "ru", [339, [351, 1], 262, 385, 289, 259],
	function (obj) { Game.message(t("Explodes entity after 10 seconds")) }, 3);

talismans.regTalisman(["arrow", "fill_lungs", 9, 100], "Fill lungs", "ru", [339, 264, 262, 338, 287, 326],
	function (obj) { Game.message(t("Damage entity every 3 second 6HP")) });

talismans.regTalisman(["arrow", "flak", 0, 80], "Flak arrow", "ru", [339, 264, 262, 46, 347],
	function (obj) { World.explode(obj.x, obj.y, obj.z, 1, false) });

talismans.regTalisman(["arrow", "force", 0, 120], "Force arrow", "ru", [339, [351, 3], 262, 42],
	function (obj) {
		if (obj.Entity) {
			let l = Entity.getLookVector(Player.get());
			Entity.moveToLook(obj.Entity, { speed: 20, jumpVel: 2 })
		}
	});

talismans.regTalisman(["arrow", "gamble", 0, 5], "Gamble arrow", "ru", [339, [351, 2], 262, 280, 280, 280, 264],
	function (obj) { if (obj.Entity && random(0, 10) == 5) Entity.damageEntity(obj.Entity, 40); else Entity.damageEntity(obj.Entity, 10) });

talismans.regTalisman(["arrow", "hand_swap", 0, 60], "Hand swap", "ru", [339, 264, 262, 287],
	function (obj) { Game.message(t("Works on player, swaps items from one hand to second")) });

talismans.regTalisman(["arrow", "high_speed", 0, 40], "High speed arrow", "ru", [339, [351, 12], 262, 46, 331],
	function (obj) { return 40; });

talismans.regTalisman(["arrow", "hollow_leg", 9, 40], "Hollow leg", "ru", [339, 264, 297, 325],
	function (obj) { Game.message(t("Works on Players, adds infinity hunger")) });

talismans.regTalisman(["arrow", "hover_bubble", 0, 150], "Hover bubble arrow", "ru", [339, [351, 13], 262, 288],
	function (obj) { Game.message(t("Works if player sitting and walking in 13x13x13 zone like hovering")) });

talismans.regTalisman(["arrow", "hyper_speed", 0, 400], "Hyper speed arrow", "ru", [339, [351, 12], 262, 46, 152],
	function (obj) { Game.message(t("Shots extreme fast arrow")) });

talismans.regTalisman(["arrow", "ice_breaker", 1, 60], "Ice breaker", "ru", [339, [351, 6], 262, 79, 285],
	function (obj) { Game.message(t("Breaks all ice in 65x4x65")) });

talismans.regTalisman(["arrow", "ice_sphere", 1, 60], "Ice sphere", "ru", [339, [351, 4], 326, 326, 79],
	function (obj) { Game.message(t("Creates an ice sphere r=6 + r=7")) });

talismans.regTalisman(["arrow", "impulse", 0, 30], "Impulse arrow", "ru", [339, [351, 3], 262, 265],
	function (obj) {
		if (obj.Entity) {
			let l = Entity.getLookVector(Player.get());
			Entity.moveToLook(obj.Entity, { speed: 4, jumpVel: 2 })
		}
	});

talismans.regTalisman(["arrow", "incendiary", 0, 40], "Incendiary arrow", "ru", [339, [351, 1], 262, 377],
	function (obj) {
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
	});

talismans.regTalisman(["arrow", "life_steal", 3, 20], "Life steal arrow", "ru", [339, [351, 9], 262, 322],
	function (obj) {
		if (obj.Entity != -1) Entity.healEntity(Player.get(), 3), Entity.damageEntity(obj.Entity, 9);
	});

talismans.regTalisman(["arrow", "limp_leg", 9, 120], "Limp leg", "ru", [339, [351, 8], 352, 40, 309],
	function (obj) { Player.addVelocity(0, -1, 0) });

talismans.regTalisman(["arrow", "lucky_arrow", 3, 30], "Lucky arrow", "ru", [339, [351, 1], 262, 41],
	function (obj) { });
var mineData = { x: 0, y: 0, z: 0 };
// var mineData = {x: 0, y: 0, z: 0};
talismans.regTalisman(["arrow", "mine", 0, 80], "Mine arrow", "ru", [339, 264, 262, 46, 70],
	function (obj) { mineData = obj; });
Callback.addCallback("tick", function () {
	var c = Player.getPosition();
	if (Math.floor(c.x) == Math.floor(mineData.x) && Math.floor(c.y) == Math.floor(mineData.y) && Math.floor(c.z) == Math.floor(mineData.z))
		World.explode(c.x, c.y, c.z, 5, false);
});
// talismans.regTalisman(["arrow", "nether", 2, 10], "Nether swap", "ru", [339, [351, 2], 262, 368, 265],
// 	function (obj) { });

talismans.regTalisman(["arrow", "nuke", 5, 400], "Nuke arrow", "ru", [339, [351, 1], 262, 46, 46, 46],
	function (obj) {
		World.explode(obj.x, obj.y, obj.z, random(10, 25), true);
	});

talismans.regTalisman(["arrow", "petrification", 9, 100], "Petrification", "ru", [339, [351, 13], 1, 219],
	function (obj) { Game.message(t("Add hunger to creature, when moving, to lift - stand several seconds")) });

talismans.regTalisman(["arrow", "piercing", 0, 40], "Piercing arrow", "ru", [339, 264, 262, 388],
	function (obj) { if (obj.Entity) Entity.damageEntity(obj.Entity, 1), Entity.healEntity(obj.Entity, 3) });

talismans.regTalisman(["arrow", "reinforced_1", 8, 10], "Reinforced arrow I", "ru", [339, [351, 11], 262, 265],
	function (obj) { if (obj.Entity) Entity.damageEntity(obj.Entity, 4) });

talismans.regTalisman(["arrow", "reinforced_2", 8, 100], "Reinforced arrow II", "ru", [339, [351, 4], 262, 266],
	function (obj) { if (obj.Entity) Entity.damageEntity(obj.Entity, 8) });

talismans.regTalisman(["arrow", "reinforced_3", 8, 400], "Reinforced arrow III", "ru", [339, [351, 1], 262, 264],
	function (obj) { if (obj.Entity) Entity.damageEntity(obj.Entity, 16) });

talismans.regTalisman(["arrow", "ricochet", 0, 80], "Ricochet arrow", "ru", [339, 264, 262, 341],
	function (obj) {
		// ricochetArrow.shoot(obj)
	});

talismans.regTalisman(["arrow", "roots", 9, 80], "Roots", "ru", [339, [351, 3], 32],
	function (obj) { });

talismans.regTalisman(["arrow", "skyfall", 9, 80], "Skyfall", "ru", [339, [351, 15], 262, 288, 287],
	function (obj) { });

talismans.regTalisman(["arrow", "sniper", 0, 80], "Sniper arrow", "ru", [339, [351, 14], 262, 381],
	function (obj) { });

talismans.regTalisman(["arrow", "spooky", 3, 30], "Spooky arrow", "ru", [339, 264, 262, 397],
	function (obj) { });

Callback.addCallback("tick", function () {
	var p = Entity.getPosition(Player.get());
	if (stasis.time != 0 && stasis.coords != {}) stasis.time--;
	var ents = Entity.getAllInRange(stasis.coords, 5);

})
talismans.regTalisman(["arrow", "stasis", 3, 80], "Stasis arrow", "ru", [339, [351, 4], 262, 406],
	function (obj) { stasis.time += 400; stasis.coords = { x: obj.x, y: obj.y, z: obj.z }; });

talismans.regTalisman(["arrow", "suffocating_fumes", 9, 100], "Suffocating fumes", "ru", [339, [351, 8], 262, 88, 367],
	function (obj) { });

talismans.regTalisman(["arrow", "tracer", 0, 10], "Tracer arrow", "ru", [339, [351, 4], 262, 348],
	function (obj) { });

talismans.regTalisman(["arrow", "vacuum", 3, 80], "Vacuum arrow", "ru", [339, [351, 5], 262, 49],
	function (obj) { });

talismans.regTalisman(["arrow", "wind", 9, 80], "Wind leash", "ru", [339, [351, 8], 262, 331, 420],
	function (obj) { });

talismans.regTalisman(["arrow", "yummy", 9, 140], "Yummy smell", "ru", [339, [351, 3], 262, 319, 363, 365, 349],
	function (obj) { });

talismans.regTalisman(["arrow", "zero", 0, 30], "Zero g arrow", "ru", [339, 264, 262, 368],
	function (obj) { });
