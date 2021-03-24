var lectern_AI = {
	list: {},
	// "texture_name", "Name", [], {min:, max:, informate:, regens:}
	add: function (texture, name, recipe, props) {
		regItem(texture, name, 64)
		this.list[ItemID[texture]] = spiritID
		if (ingredients)
			// if (spiritID === 0 || spiritID) this.addBlendEffect(ItemID[texture], spiritID);
			EffectAPI.getEffect(spiritID)
	}
}
var lectern_UI = new UI.StandartWindow({
	standart: {
		header: { text: { text: "Created With UIEditor" } },
		background: { color: android.graphics.Color.parseColor("#C6C6C6") }, inventory: { standart: true }
	},
	drawing: [],
	elements: {

	}
})
TileEntity.registerPrototype(BlockID.bath_heater, {
	defaultValues: {
		work: false,
		item: false,
		id: null
	},
	getGuiScreen: function () { return lectern_UI },
	tick: function () {

	}
})
