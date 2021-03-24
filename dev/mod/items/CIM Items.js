CIM.reg(ItemID.ritual_pouch, { gui: pouch, name: "Ritual Pouch" }, false, false);
CIM.reg(ItemID.book_green, { gui: greenBladeInv, name: "Green Spell Blade book" }, true, true);
CIM.reg(ItemID.book_red, { gui: redBladeInv, name: "Red Spell Blade book" }, true, true);
CIM.reg(ItemID.book_blue, { gui: bluePickInv, name: "Blue Spell Pickaxe book" }, true, true);
CIM.reg(ItemID.book_orange, { gui: orangePickInv, name: "Orange Spell Pickaxe book" }, true, true);
CIM.reg(ItemID.book_bow, { gui: bowInv, name: "Spell bow book" }, true, true);
CIM.reg(ItemID.grimoire, { gui: grimoireInv, name: "Grimoire" }, true, true);
CIM.reg(ItemID.contract_binder, { gui: contractInv, name: "Contract binder" }, true, true);
var invItems = [
	[ItemID.blade_green, ItemID.book_green],
	[ItemID.blade_red, ItemID.book_red],
	[ItemID.pick_blue, ItemID.book_blue],
	[ItemID.pick_orange, ItemID.book_orange],
	[ItemID.spell_bow, ItemID.book_bow],
	[ItemID.grimoire, ItemID.grimoire],
	[ItemID.contract_binder],
]
function ItemInv() {
	var item = Player.getCarriedItem(),
		id = item.id, data = item.data, extra = item.extra,
		sneaking = Entity.getSneaking(Player.get());
	for (var i in invItems) {
		var t = invItems[i];
		if (sneaking && id == t[0] && t[0] !== t[1]) Player.setCarriedItem(t[1], 1, data, extra);
		if (sneaking && id == t[1] && t[0] !== t[1]) Player.setCarriedItem(t[0], 1, data, extra);
		if ((!sneaking && id == t[1] && t[0] !== t[1]) || (sneaking && id == t[0] && t[0] == t[1]) || (!sneaking && id == t[0] && !t[1]))
			CIM.openGuiFor(id, data, extra, true);
		// if (sneaking == false && item.id == temp[1]) alert(CIM.containers["e" + item.extra.getInt("extraCount")].getSlot("slot_27").id);
	}
}
Callback.addCallback("ItemUse", function (coords, item, block) {
	ItemInv();
});