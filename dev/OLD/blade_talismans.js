Callback.addCallback("PlayerAttack", function (player, victim) {
	// alert("Hurt!!");
	// var id = Player.getCarriedItem().id;
	// let l = Entity.getLookVector(Player.get());
	// var vel = lookDirection(l.yaw, l.pitch);
	// if(id == ItemID.blade_green || id == ItemID.blade_red)
	// talismans.useTalisman({Entity: victim, vel: vel});
});


BladeTalisman(["blade", "blade_of_snow", 1, 5], "Blade of snow", "ru", [], function (obj) {
	// if(World.getBiomeName(obj.x, obj.z)=="ice_plains"){
	// 	if(obj.Entity) Entity.damageEntity(obj.Entity, 10);
	// }
});
BladeTalisman(["blade", "butchering_strike", 8, 20], "Butchering strike", "ru", [], function (obj) {	WIP()	}); // more items chance
BladeTalisman(["blade", "confusion", 8, 20], "Confusion", "ru", [], function (obj) {	WIP()	}); // confuses enemy
BladeTalisman(["blade", "corrosion", 8, 30], "Corrosion", "ru", [], function (obj) {	WIP()	}); // adds armor corrosion
BladeTalisman(["blade", "crawling_mist", 9, 80], "Crawling mist", "ru", [], function (obj) { Game.message(t("Works on player"))	});
BladeTalisman(["blade", "fiery_mark", 5, 120], "Fiery mark", "ru", [], function (obj) {	WIP()}); //Explodes random time
BladeTalisman(["blade", "fill_lungs", 9, 100], "Fill lungs", "ru", [], function (obj) {	if(obj.Entity) Entity.damageEntity(obj.Entity, 6)}); //
BladeTalisman(["blade", "gamble", 8, 5], "Gamble", "ru", [], function (obj) {
		// if(obj.Entity){
	// if (random(0, 10) == 5) Entity.damageEntity(obj.Entity, 40) 
	// else Entity.damageEntity(obj.Entity, 10)}
}); //
BladeTalisman(["blade", "hand_swap", 8, 5], "Hand swap", "ru", [], function (obj) {	WIP()	}); //Swaps items in hands
BladeTalisman(["blade", "heavy", 8, 30], "Heavy blade", "ru", [], function (obj) {	
		// if (obj.Entity, obj.vel) {
		// 	let vel = obj.vel;
		// 	Entity.addVelocity(obj.Entity, vel.x*4, vel.y*2, vel.z*4);
		// }
	});
BladeTalisman(["blade", "holy", 8, 5], "Holy blade", "ru", [], function (obj) {
	// if(obj.Entity){
	// 	var victim = obj.Entity;
	// 	var entType = Entity.getType(victim);
	// 	if(entType == 36 || entType == 48 || entType == 32 || entType == 34)
	// 	Entity.setFire(obj.Entity, 100)
	// 	Entity.addEffect(obj.Entity, 2, 100, false, false);
	// }
}); 
BladeTalisman(["blade", "hungry", 8, 10], "Hungry blade", "ru", [], function (obj) {	WIP()	}); //
BladeTalisman(["blade", "inflame", 5, 5], "Inflame", "ru", [], function (obj) {if(obj.Entity) Entity.setFire(obj.Entity, 100);	}); //
BladeTalisman(["blade", "lucky_strike", 8, 10], "Lucky strike", "ru", [], function (obj) {	WIP()	}); //
var memoryTalisman = {Entity: null, damage: 0};
BladeTalisman(["blade", "memory", 8, 5], "Memory blade", "ru", [], function (obj) {	
	// if(obj.Entity){
	// 	if(memoryTalisman.Entity == obj.Entity){
	// 		memoryTalisman.damage++;
	// 		Entity.damageEntity(obj.Entity, memoryTalisman.damage);
	// 	}else{
	// 		memoryTalisman.Entity = obj.Entity;
	// 		memoryTalisman.damage = 0;
	// 	}
	// } 
		

}); //
BladeTalisman(["blade", "obliteration", 8, 5], "Obliteration", "ru", [], function (obj) {
		if(obj.Entity){
			// var mob = obj.Entity;
			// var h = Entity.getHealth(mob);
			// var mh = Entity.getMaxHealth(mob);
			// if(h<=mh &&h<=40)Entity.remove(mob);
			// if(h>40)Entity.damageEntity(mob, 40);
		}
	}); //
BladeTalisman(["blade", "poison_coating", 8, 5], "Poison coating", "ru", [], function (obj) {
		if(obj.Entity){
			// Entity.addEffect(obj.Entity, 19, 100, 0, 3, true);
		}
	}); //
BladeTalisman(["blade", "rain_sword", 1, 5], "Rain sword", "ru", [], function (obj) {	
	if(obj.Entity){
		// var weather = World.getWeather();
		// alert(weather);
		// if(weather == "rain")Entity.damageEntity(obj.Entity, 6);
	}
});
BladeTalisman(["blade", "skyfall", 9, 80], "Skyfall", "ru", [], function (obj) { WIP()	}); //adds levitation
BladeTalisman(["blade", "suffocating_fumes", 9, 100], "Suffocating fumes", "ru", [], function (obj) {	WIP()	});// adds задушение
BladeTalisman(["blade", "vengeful", 8, 5], "Vengeful blade", "ru", [], function (obj) { WIP()	});
BladeTalisman(["blade", "wind_leash", 9, 80], "Wind leash", "ru", [], function (obj) {	WIP()	});
BladeTalisman(["blade", "wither_coating", 9, 5], "Wither coating", "ru", [], function (obj) {	
	if(obj.Entity){
		// Entity.addEffect(obj.Entity, 20, 100, 0, 2, true);
	}
});
BladeTalisman(["blade", "yummy_smell", 9, 140], "Yummy smell", "ru", [], function (obj) {	WIP()	});
