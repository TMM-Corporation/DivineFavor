LIBRARY({
	name: "Inventory",
	version: 1,
	shared: false,
	api: "CoreEngine"
});

var PlayerInventory = {
	getSlot(slot) {
		return Player.getInventorySlot(slot);
	},

	getArmorSlot(slot) {
		return Player.getArmorSlot(slot);
	},
	haveItem(id, data) {
		if (!data) data = -1;
		for (var i = 0; i < 36; i++) {
			let slot = Player.getInventorySlot(i);
			if (id == slot.id && (data == -1 || data == slot.data)) {
				return true;
			}
		}
		return false;
	},
	getItemSlot(id, data){
		if(this.haveItem(id, data))
		for (var i = 0; i < 36; i++) {
			let slot = Player.getInventorySlot(i);
			if (id == slot.id && (data == -1 || data == slot.data)) {
				return slot;
			}
		}
		else return;
	},
	damageItem(damage) {
		var item = Player.getCarriedItem();
		item.data += damage;
		if (item.data >= Item.getMaxDamage(item.id)) {
			item.id = 0;
			item.count = 0;
			item.data = 0;
		}
		// }else Game.tipMessage("Durability: "+(Item.getMaxDamage(item.id)-item.data)+"/"+Item.getMaxDamage(item.id));
		Player.setCarriedItem(item.id, 1, item.data, item.extra);
	},
	retrieveItem(id, data) {
		if (!data) data = -1;
		for (var i = 0; i < 36; i++) {
			let slot = Player.getInventorySlot(i);
			if (id == slot.id && (data == -1 || data == slot.data)) {
				slot.count--;
				if (slot.count > 0) {
					Player.setInventorySlot(i, slot.id, slot.count, slot.data);
				} else {
					Player.setInventorySlot(i, 0, 0, 0);
				}
				return true;
			}
		}
		return false;
	}
}

EXPORT("PlayerInventory", PlayerInventory);