IDRegistry.genItemID("blockInfo")
Item.createItem("blockInfo", "DF Block Info Getter", {name: "stick"}, {stack: 1})

Callback.addCallback("ItemUse", function (c, item, block) {
	if (item.id == ItemID.blockInfo) {
		alert('BlockID:' + block.id + ', Data:' + block.data + ', Name: ' + Item.getName(block.id, block.data))
		aaa = World.getTileEntity(c.x, c.y, c.z)
		Logger.Log(Parser.get(aaa, true, "aaa"))
	}
	// alert("use: " + Player.getCarriedItem().id + ", slot: " + Player.getSelectedSlotId())
	// if (Player.getCarriedItem().id == 0)
	// Player.setInventorySlot(Player.getSelectedSlotId(), 280, 1, 0)
})