//Tier 1
TileEntity.registerPrototype(BlockID.AltarAbyssal, {
	defaultValues: {
		items: [],
		result: null,
		step: 0,
	},
	//Init
	init: function () {
		this.showing = new Animation.Item(this.x + .5, this.y + 1.1, this.z + .5)
		this.anims = [
			new Animation.Item(this.x + 3.5, this.y + 1.1, this.z + .5),
			new Animation.Item(this.x - 3.5, this.y + 1.1, this.z + .5),
			new Animation.Item(this.x + .5, this.y + 1.1, this.z - 3.5),
			new Animation.Item(this.x + .5, this.y + 1.1, this.z + 3.5),
			new Animation.Item(this.x + 2.5, this.y + 1.1, this.z + 2.5),
			new Animation.Item(this.x - 2.5, this.y + 1.1, this.z - 2.5),
			new Animation.Item(this.x - 2.5, this.y + 1.1, this.z + 2.5),
			new Animation.Item(this.x + 2.5, this.y + 1.1, this.z - 2.5),
		]
	},
	//Main Work
	click: function (id, count, data, coords) {
		var step = this.data.step, items = this.data.items
		if (id == ItemID.normalNecronomicon) {
			Necronomicons.connectToAltar(id, 2000)
			this.CheckRecipe()
		} else if (id != 0 && items.length < 9) {
			items.push({ 'id': id, 'data': data })
			this.AnimateMain(id, data, 0.3, [0, 0, 0])
			step += 1
			Log(JSON.stringify(this.data.items), 'Altar Items')
		} else {
			for (let i in items) {
				World.drop(this.x + .5, this.y + 1, this.z + .5, items[i].id, 1, items[i].data)
				this.Clear()
				step = 0
			}
		}
		if (items.length > 1 && step > 1)
			this.AnimatePillar(id, data, 0.2, [Math.PI / 2, 0, 0], step - 1)
	},
	//Animations
	AnimateMain: function (id, data, size, rotation) {
		this.showing.describeItem({
			id: id,
			count: 1,
			data: data,
			size: size,
			rotation: rotation,
			notRandomize: true
		})
		this.showing.load()
	},
	AnimatePillar: function (id, data, size, rotation, n) {
		this.anims[n].describeItem({
			id: id,
			count: 1,
			data: data,
			size: size,
			rotation: rotation,
			notRandomize: true
		})
		this.anims[n].load()
	},
	Clear: function () {
		this.showing.describe({
			render: 0,
		})
		for (let i in this.anims)
			this.anims[i].describe({
				render: 0,
			})
	},
	//Recipes
	CheckRecipe: function () {
		for (var i = 0; i <= 9; i++)
			if (Necronomicons.RitualN[i].id == items[i].id && Necronomicons.RitualN[i].data == items[i].data) {
				this.Clear()
				if (Necronomicons.RitualN[i].result.data)
					World.drop(this.x + .5, this.y + 1, this.z + .5, Necronomicons.RitualN[i].result.id, 1, Necronomicons.RitualN[i].result.data)
				else
					World.drop(this.x + .5, this.y + 1, this.z + .5, Necronomicons.RitualN[i].result.id, 1, 0)
			}
	},
	//Other
	destroyBlock: function (coords, player) {
		this.showing.destroy()
		for (let i in this.anims)
			this.anims[i].destroy()
	}
})