Callback.addCallback("PlayerAttack", function (player, victim) {
	alert("Hurt!!");
	var id = Player.getCarriedItem().id;
	let l = Entity.getLookVector(Player.get());
	var vel = lookDirection(l.yaw, l.pitch);
	if(id == ItemID.blade_green || id == ItemID.blade_red)
	talismans.useTalisman({Entity: victim, vel: vel});
});


talismans.regTalisman(["blade", "blade_of_snow", 1, 5], "Blade of snow", "ru", [], function (obj) {
	if(World.getBiomeName(obj.x, obj.z)=="ice_plains"){
		if(obj.Entity) Entity.damageEntity(obj.Entity, 10);
	}
});
talismans.regTalisman(["blade", "butchering_strike", 8, 20], "Butchering strike", "ru", [], function (obj) {	WIP()	}); // more items chance
talismans.regTalisman(["blade", "confusion", 8, 20], "Confusion", "ru", [], function (obj) {	WIP()	}); // confuses enemy
talismans.regTalisman(["blade", "corrosion", 8, 30], "Corrosion", "ru", [], function (obj) {	WIP()	}); // adds armor corrosion
talismans.regTalisman(["blade", "crawling_mist", 9, 80], "Crawling mist", "ru", [], function (obj) { Game.message("Works on player")	});
talismans.regTalisman(["blade", "fiery_mark", 5, 120], "Fiery mark", "ru", [], function (obj) {	WIP()}); //Explodes random time
talismans.regTalisman(["blade", "fill_lungs", 9, 100], "Fill lungs", "ru", [], function (obj) {	if(obj.Entity) Entity.damageEntity(obj.Entity, 6)}); //
talismans.regTalisman(["blade", "gamble", 8, 5], "Gamble", "ru", [], function (obj) {	if(obj.Entity){
	if (random(0, 10) == 5) Entity.damageEntity(obj.Entity, 40) 
	else Entity.damageEntity(obj.Entity, 10)}
}); //
talismans.regTalisman(["blade", "hand_swap", 8, 5], "Hand swap", "ru", [], function (obj) {	WIP()	}); //Swaps items in hands
talismans.regTalisman(["blade", "heavy", 8, 30], "Heavy blade", "ru", [], function (obj) {	
		if (obj.Entity, obj.vel) {
			let vel = obj.vel;
			Entity.addVelocity(obj.Entity, vel.x*4, vel.y*2, vel.z*4);
		}
	});
talismans.regTalisman(["blade", "holy", 8, 5], "Holy blade", "ru", [], function (obj) {
	if(obj.Entity){
		var victim = obj.Entity;
		var entType = Entity.getType(victim);
		if(entType == 36 || entType == 48 || entType == 32 || entType == 34)
		Entity.setFire(obj.Entity, 100)
		Entity.addEffect(obj.Entity, 2, 100, false, false);
	}
}); 
talismans.regTalisman(["blade", "hungry", 8, 10], "Hungry blade", "ru", [], function (obj) {	WIP()	}); //
talismans.regTalisman(["blade", "inflame", 5, 5], "Inflame", "ru", [], function (obj) {if(obj.Entity) Entity.setFire(obj.Entity, 100);	}); //
talismans.regTalisman(["blade", "lucky_strike", 8, 10], "Lucky strike", "ru", [], function (obj) {	WIP()	}); //
var memoryTalisman = {Entity: null, damage: 0};
talismans.regTalisman(["blade", "memory", 8, 5], "Memory blade", "ru", [], function (obj) {	
	if(obj.Entity){
		if(memoryTalisman.Entity == obj.Entity){
			memoryTalisman.damage++;
			Entity.damageEntity(obj.Entity, memoryTalisman.damage);
		}else{
			memoryTalisman.Entity = obj.Entity;
			memoryTalisman.damage = 0;
		}
	} 
		

}); //
talismans.regTalisman(["blade", "obliteration", 8, 5], "Obliteration", "ru", [], function (obj) {
		if(obj.Entity){
			var mob = obj.Entity;
			var h = Entity.getHealth(mob);
			var mh = Entity.getMaxHealth(mob);
			if(h<=mh &&h<=40)Entity.remove(mob);
			if(h>40)Entity.damageEntity(mob, 40);
		}
	}); //
talismans.regTalisman(["blade", "poison_coating", 8, 5], "Poison coating", "ru", [], function (obj) {
		if(obj.Entity){
			Entity.addEffect(obj.Entity, 19, 100, 0, 3, true);
		}
	}); //
talismans.regTalisman(["blade", "rain_sword", 1, 5], "Rain sword", "ru", [], function (obj) {	
	if(obj.Entity){
		var weather = World.getWeather();
		alert(weather);
		if(weather == "rain")Entity.damageEntity(obj.Entity, 6);
	}
});
talismans.regTalisman(["blade", "skyfall", 9, 80], "Skyfall", "ru", [], function (obj) { WIP()	}); //adds levitation
talismans.regTalisman(["blade", "suffocating_fumes", 9, 100], "Suffocating fumes", "ru", [], function (obj) {	WIP()	});// adds задушение
talismans.regTalisman(["blade", "vengeful", 8, 5], "Vengeful blade", "ru", [], function (obj) { WIP()	});
talismans.regTalisman(["blade", "wind_leash", 9, 80], "Wind leash", "ru", [], function (obj) {	WIP()	});
talismans.regTalisman(["blade", "wither_coating", 9, 5], "Wither coating", "ru", [], function (obj) {	
	if(obj.Entity){
		Entity.addEffect(obj.Entity, 20, 100, 0, 2, true);
	}
});
talismans.regTalisman(["blade", "yummy_smell", 9, 140], "Yummy smell", "ru", [], function (obj) {	WIP()	});
