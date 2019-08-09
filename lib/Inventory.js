LIBRARY({
  name: "Inventory",
  version: 1,
  shared: false,
  api: "CoreEngine"
});

var PlayerInventory = {
  getSlot: function (slot) {
    return Player.getInventorySlot(slot);
  },

  getArmorSlot: function (slot) {
    return Player.getArmorSlot(slot);
  },
  haveItem: function(id, data) {
    if (!data) data = -1;
    for (var i = 0; i < 36; i++) {
      let slot = Player.getInventorySlot(i);
      if (id == slot.id && (data == -1 || data == slot.data)) {
        return true;
      }
    }
    return false;
  },
  damageItem:function(damage){
    var item = Player.getCarriedItem();
      item.data += damage;
    if (item.data >= Item.getMaxDamage(item.id)) {
      item.id = 0;
      item.count = 0;
      item.data = 0;
    }
    Player.setCarriedItem(item.id, 1, item.data);
  },
  retrieveItem: function (id, data) {
    if (!data)data = -1;
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