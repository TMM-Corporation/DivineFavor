IDRegistry.genItemID("spell_bow");
Item.createItem("spell_bow", "Spell bow", { name: "spell_bow", meta: 0 }, { stack: 1 });
Item.describeItem(ItemID.spell_bow, {
	toolRender: true,
	maxDamage: 385,
	useAnimation: 4
});

var spellBow = new Bow();
spellBow.set({
	id: ItemID.spell_bow,
	texture: "spell_bow",
	bullets: [262],
	skin: "entity/projectiles/arrow.png",
	speed: 2,
	damage: 1.5,
	variations: 3,
});
AddTalismanInfo("spell_bow");
Callback.addCallback("BowArrowHit", function (p, i, t) {// ProjectileHit
	var id = Talisman.get.IdInCurrentItem(27);
	// alert("Talisman ID: "+id)
	Talisman.Use({
		x: t.x, y: t.y, z: t.z,
		Entity: t.entity,
		block: World.getBlock(t.x, t.y, t.z)
	}, id);
});
// Callback.addCallback("BowArrowHit", function(){
// 	alert("BowArrowHit")
// });
// Callback.addCallback("BowOnShot", function(){
// 	alert("BowOnShot")
// });
// Callback.addCallback("BowStateChange", function(){
// 	alert("BowStateChange")
// });
//BowArrowEntityDamage, atacker, victim, damage
//BowArrowHit, projectile, item, target
//BowOnShot, bow
//BowStateChange