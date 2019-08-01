IDRegistry.genItemID("spell_bow");
Item.createItem("spell_bow", "Spell bow standby Spell bow", {name: "spell_bow", meta: 0}, {stack: 1});
Item.registerIconOverrideFunction(ItemID.spell_bow, function (item, name) {
  return {name: "spell_bow", meta: item.data}
});
GunRegistry.registerGun({
  gun: ItemID.spell_bow,
  texture: "spell_bow",
  bullet: 262,
  skin: "entity/projectiles/arrow.png",
  speed: 4,
  damage: 4,
  aim: BitmapFactory.decodeFile(__dir__ + "gui/aim_0.png"),
  fov: 90,
  animTime: 15,
  variations: 4
});