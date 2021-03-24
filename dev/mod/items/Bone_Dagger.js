function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
regItem("bone_dagger", "Bone Dagger", 1)
regItem("bone_dagger_awakened", "Bone Dagger Awakened", 1)

Recipes.addShaped({id: ItemID.bone_dagger, count: 1, data: 0},
	["  a", "bc ", "db "], ['a', 352, 0, 'b', 1, 0, 'c', 264, 0, 'd', 280, 0])

function DropShard(v, isCarriedBDA) {
	var rand = (random(0, 3) == 1), drop = 0, pos = Entity.getPosition(v)
	switch (Entity.getType(v)) {
		/*Enderman*/
		case 38: drop = ItemID.end_soul_shard; break
		/*Villager*/
		case 15: drop = ItemID.mind_soul_shard; break
		/*LAVA SLIME|BLAZE|GHAST|PIGMAN|WITHER SKELETON*/
		case 38: case 41: case 42: case 43: case 48: drop = ItemID.nether_soul_shard; break
		/*COW|CHICKEN|MUSHROOM COW|OCELOT|PIG|RABBIT|SHEEP*/
		case 10: case 11: case 12: case 13: case 16: case 18: case 22: drop = ItemID.peace_soul_shard; break
		/*ZOMBIE|SKELETON*/
		case 32: case 34: drop = ItemID.undeath_soul_shard; break
		/*SQUID|GUARDIANS*/
		case 17: case 49: drop = ItemID.water_soul_shard; break
		/*SLIME|CREEPER|SPIDER*/
		case 33: case 35: case 37: drop = ItemID.wild_soul_shard; break
		/*None*/
		default: drop = 0; break
	}
	(rand && isCarriedBDA && drop != 0) ? World.drop(pos.x, pos.y, pos.z, drop, 1, 1) : null
}
Callback.addCallback("PlayerAttack", function (p, v) {
	var rand = random(0, 10), daggerAw = ItemID.bone_dagger_awakened,
		isCarriedBD = (Player.getCarriedItem().id === ItemID.bone_dagger)
	isCarriedBDA = (Player.getCarriedItem().id === ItemID.bone_dagger_awakened)
	if (rand == 10 && isCarriedBD) {
		Player.setCarriedItem(daggerAw, 1, 0)
	}
	DropShard(v, isCarriedBDA)
})