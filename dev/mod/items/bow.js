IDRegistry.genItemID("spell_bow");
Item.createItem("spell_bow", "Spell bow", {name: "spell_bow", meta: 0}, {stack: 1});
Item.describeItem(ItemID.spell_bow, {
  toolRender: false,
  maxDamage: 250,
  useAnimation: 4
});
GunRegistry.registerGun({
  gun: ItemID.spell_bow,
  texture: "spell_bow",
  bullet: 262,
  skin: "entity/projectiles/arrow.png",
  speed: 6,
  damage: 4,
  aim: BitmapFactory.decodeFile(__dir__ + "gui/aim_0.png"),
  variations: 4,
  state: 0
});