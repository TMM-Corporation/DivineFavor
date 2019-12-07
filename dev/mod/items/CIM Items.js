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
	var item = Player.getCarriedItem();
	var sneaking = Entity.getSneaking(Player.get());
	for (var i in invItems) {
		var temp = invItems[i];
		if (sneaking == true && item.id == temp[0] && temp[0] !== temp[1]) Player.setCarriedItem(temp[1], 1, item.data, item.extra);
		if (sneaking == true && item.id == temp[1] && temp[0] !== temp[1]) Player.setCarriedItem(temp[0], 1, item.data, item.extra);
		if (sneaking == false && item.id == temp[1] && temp[0] !== temp[1]) CIM.openGuiFor(item.id, item.data, item.extra, true);
		if (sneaking == true && item.id == temp[0] && temp[0] == temp[1]) CIM.openGuiFor(item.id, item.data, item.extra, true);
		if (sneaking == false && item.id == temp[0] && !temp[1]) CIM.openGuiFor(item.id, item.data, item.extra, true);
		// if (sneaking == false && item.id == temp[1]) alert(CIM.containers["e" + item.extra.getInt("extraCount")].getSlot("slot_27").id);
	}
}
Callback.addCallback("ItemUse", function (coords, item, block) {
	ItemInv();
});