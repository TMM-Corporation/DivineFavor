regBlock("bath_heater", "Bath Heater", [
    ["bath_heater_bottom", 0],
    ["bath_heater_top_inactive", 0],
    ["bath_heater_side", 0]
], true);
// active model
var bath_heater_active = new BlockRenderer.Model([
    ["bath_heater_bottom", 0],
    ["bath_heater_top_active", 0],
    ["bath_heater_side", 0]
]);
// BlockRenderer.mapAtCoords(x, y, z, bath_heater_active);



var energizerUI = new UI.StandartWindow({
    standart: {
        header: { text: { text: "Bath heater" } }
    },
    drawing: [
        // { type: "bitmap", x: 500, y: 130, bitmap: "bubble", scale: 3.3 },
        // { type: "bitmap", x: 515, y: 150, bitmap: "bubble", scale: 3.2 },
    ],
    elements: {
        // "currentEnergy": { font: { color: android.graphics.Color.WHITE, shadow: 0.6, size: 18 }, type: "text", x: 580, y: 150, width: 300, height: 40, text: "Current: " },
        // "slotEnergy": { type: "slot", x: 582, y: 367, isValid: function (id) { return ChargeItemRegistry.isValidItem(id, "Eu", 0); } },
        "slot": { type: "slot", x: 582, y: 266 },
        // "slot1": { type: "slot", x: 668, y: 188 },
        // "slot2": { type: "slot", x: 668, y: 248 },
        // "slot3": { type: "slot", x: 668, y: 308 },
        // "slot4": { type: "slot", x: 668, y: 368 },
        // "energyScale": { type: "scale", x: 515, y: 150, direction: 1, bitmap: "energy_s", scale: 3.2 },
    }
});
TileEntity.registerPrototype(BlockID.bath_heater, {
    defaultValues: {
        time: 0,
        blend: ""
    },
    getGuiScreen: function () { return energizerUI; },
    tick: function () {
        var item = this.container.getSlot("slot");
        // if (this.data.energy > 200)
        //     this.data.energy -= ChargeItemRegistry.addEnergyTo(item, "Eu", 200, 32, 0);
        // this.container.setScale("energyScale", this.data.energy / 50000);
    }
});
