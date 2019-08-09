function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
IDRegistry.genItemID("bone_dagger");
Item.createItem("bone_dagger", "Bone dagger", {name: "bone_dagger"}, {stack: 1});
Recipes.addShaped({
  id: ItemID.bone_dagger,
  count: 1,
  data: 0
}, ["  a", "bc ", "db "], ['a', 352, 0, 'b', 2, 0, 'c', 264, 0, 'd', 280, 0]);

IDRegistry.genItemID("bone_dagger_awakened");
Item.createItem("bone_dagger_awakened", "Bone dagger awakened", {name: "bone_dagger_awakened"}, {stack: 1});

function dropByEntity(victim, entityID, item, drop) {
  if (Entity.getType(victim) == entityID && Player.getCarriedItem().id == item) {
    var pos = Entity.getPosition(victim);
    if(random(0,2)==1)World.drop(pos.x, pos.y, pos.z, drop.id, drop.count, drop.data);
  }
}
Callback.addCallback("PlayerAttack", function (player, victim) {
  var rand = random(0, 10);
  if (rand == 10 && Player.getCarriedItem().id === ItemID.bone_dagger) {
    Player.setCarriedItem(ItemID.bone_dagger_awakened, 1, 0);
    Game.message("Awakened bone Dagger");
  }
  dropByEntity(victim, 38, ItemID.bone_dagger_awakened, {id: ItemID.end_soul_shard, count: 1, data: 0}); //ENDERMAN
  dropByEntity(victim, 15, ItemID.bone_dagger_awakened, {id: ItemID.mind_soul_shard, count: 1, data: 0}); //VILLAGER

  dropByEntity(victim, 42, ItemID.bone_dagger_awakened, {id: ItemID.nether_soul_shard, count: 1, data: 0}); //LAVA SLIME
  dropByEntity(victim, 43, ItemID.bone_dagger_awakened, {id: ItemID.nether_soul_shard, count: 1, data: 0}); //BLAZE
  dropByEntity(victim, 41, ItemID.bone_dagger_awakened, {id: ItemID.nether_soul_shard, count: 1, data: 0}); //GHAST
  dropByEntity(victim, 36, ItemID.bone_dagger_awakened, {id: ItemID.nether_soul_shard, count: 1, data: 0}); //PIGMAN
  dropByEntity(victim, 48, ItemID.bone_dagger_awakened, {id: ItemID.nether_soul_shard, count: 1, data: 0}); //WITHER SKELETON

  dropByEntity(victim, 11, ItemID.bone_dagger_awakened, {id: ItemID.peace_soul_shard, count: 1, data: 0}); //COW
  dropByEntity(victim, 10, ItemID.bone_dagger_awakened, {id: ItemID.peace_soul_shard, count: 1, data: 0}); //CHICKEN
  dropByEntity(victim, 16, ItemID.bone_dagger_awakened, {id: ItemID.peace_soul_shard, count: 1, data: 0}); //MUSHROOM COW
  dropByEntity(victim, 22, ItemID.bone_dagger_awakened, {id: ItemID.peace_soul_shard, count: 1, data: 0}); //OCELOT
  dropByEntity(victim, 12, ItemID.bone_dagger_awakened, {id: ItemID.peace_soul_shard, count: 1, data: 0}); //PIG
  dropByEntity(victim, 18, ItemID.bone_dagger_awakened, {id: ItemID.peace_soul_shard, count: 1, data: 0}); //RABBIT
  dropByEntity(victim, 13, ItemID.bone_dagger_awakened, {id: ItemID.peace_soul_shard, count: 1, data: 0}); //SHEEP

  dropByEntity(victim, 32, ItemID.bone_dagger_awakened, {id: ItemID.undeath_soul_shard, count: 1, data: 0}); //ZOMBIE
  dropByEntity(victim, 34, ItemID.bone_dagger_awakened, {id: ItemID.undeath_soul_shard, count: 1, data: 0}); //SKELETON

  dropByEntity(victim, 17, ItemID.bone_dagger_awakened, {id: ItemID.water_soul_shard, count: 1, data: 0}); //SQUID
  dropByEntity(victim, 49, ItemID.bone_dagger_awakened, {id: ItemID.water_soul_shard, count: 1, data: 0}); //GUARDIANS
  
  dropByEntity(victim, 37, ItemID.bone_dagger_awakened, {id: ItemID.wild_soul_shard, count: 1, data: 0}); //SLIME
  dropByEntity(victim, 33, ItemID.bone_dagger_awakened, {id: ItemID.wild_soul_shard, count: 1, data: 0}); //CREEPER
  dropByEntity(victim, 35, ItemID.bone_dagger_awakened, {id: ItemID.wild_soul_shard, count: 1, data: 0}); //SPIDER

  dropByEntity(victim, 63, ItemID.bone_dagger_awakened, {id: ItemID.end_soul_shard, count: 1, data: 0});
});