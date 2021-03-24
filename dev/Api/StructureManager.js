
var Structure = {
	initItem() {
		IDRegistry.genItemID("devKit")
		Item.createItem("devKit", "DF Dev Kit", {name: "devKit"}, {stack: 1})
		Callback.addCallback("ItemUse", function (coords, item, block) {
			if (item.id == ItemID.devKit)
				Structure.initAt(coords)
		})
		Logging.Window.showAtLocation()
	},
	initAt(coords) {
		this.coords = coords
		this.windows.main.showAtLocation()
	},
	coords: {},
	rotation: [
		[//NONE - North - 0
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		],
		[//180 - Sourh - 1
			-1, 0, 0,
			0, 1, 0,
			0, 0, -1
		],
		[//270 - West - 2
			0, 0, 1,
			0, 1, 0,
			-1, 0, 0
		],
		[//90 - East - 3
			0, 0, -1,
			0, 1, 0,
			1, 0, 0
		],
	],
	list: {
		'ARBOW1': 'ARBOW2',
		'BLIZRABI1': 'BLIZRABI2',
		'ENDERERER1': 'ENDERERER2',
		'LOON1': 'LOON2',
		'MATERIA1': 'MATERIA2',
		'NEBLAZE1': 'NEBLAZE2',
		'REDWIND1': 'REDWIND2',
		'ROMOL1': 'ROMOL2',
		'SQUAREFURY1': 'SQUAREFURY2',
		'TIMBER1': 'TIMBER2'
	},
	playerRotation() {
		return this.rotation[TileRenderer.getBlockRotation()]
	},
	build(name, x, y, z, rotation, progressive) {
		var c = this.coords
		StructuresAPI.set(name, x || c.x, y || c.y, z || c.z, (rotation || this.rotation[TileRenderer.getBlockRotation()]), false, progressive || false)
	},
	destroy(name, x, y, z, rotation, progressive) {
		var c = this.coords
		StructuresAPI.set(name, x || c.x, y || c.y, z || c.z, (rotation || this.rotation[TileRenderer.getBlockRotation()]), true, progressive || false)
	},
	getThis() {
		var c = this.coords
		for (let str1 in this.list) {
			let str2 = this.list[str1]
			if (StructuresAPI.getStructures(str1, c.x, c.y, c.z, StructuresAPI.ROTATE_ALL))
				alert('Found Structure: ' + str1)
			else if (StructuresAPI.getStructures(str2, c.x, c.y, c.z, StructuresAPI.ROTATE_ALL))
				alert('Found Structure: ' + str2)
		}
	},
	windows: {
		main: new Window().setFocusable(true).setContentView(
			new Linear().setLayoutParams(PARENT_, PARENT_).setOrientation().setGravity(CENTER_)
				.multiAddView(false, [
					new ImageView().setImageDrawable("gui/build_destroy.png", 5)
						.setClick(function () {
							Structure.windows.structureManager.showAtLocation(0, 200)
						}),
					new ImageView().setImageDrawable("gui/get.png", 5)
						.setClick(function () {
							Structure.getThis()
						})
				]).get()
		),
		structureManager: new Window().setFocusable(true).setGravity(CENTER_).setContentView(
			new ScrollView().addView(
				new Linear().setLayoutParams(PARENT_, PARENT_).setOrientation(HORIZONTAL_)
					.multiAddView(false, [
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_arbow_active.png", 12.5)
								.setClick(function () {
									Structure.build('ARBOW1')
								})
								.setLongClick(function () {
									Structure.destroy('ARBOW1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_wood_active.png", 12.5)
								.setClick(function () {
									Structure.build('ARBOW2')
								})
								.setLongClick(function () {
									Structure.destroy('ARBOW2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_blizrabi_active.png", 12.5)
								.setClick(function () {
									Structure.build('BLIZRABI1')
								})
								.setLongClick(function () {
									Structure.destroy('BLIZRABI1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_snow_active.png", 12.5)
								.setClick(function () {
									Structure.build('BLIZRABI2')
								})
								.setLongClick(function () {
									Structure.destroy('BLIZRABI2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_endererer_active.png", 12.5)
								.setClick(function () {
									Structure.build('ENDERERER1')
								})
								.setLongClick(function () {
									Structure.destroy('ENDERERER1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_coal_active.png", 12.5)
								.setClick(function () {
									Structure.build('ENDERERER2')
								})
								.setLongClick(function () {
									Structure.destroy('ENDERERER2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_loon_active.png", 12.5)
								.setClick(function () {
									Structure.build('LOON1')
								})
								.setLongClick(function () {
									Structure.destroy('LOON1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_gold_active.png", 12.5)
								.setClick(function () {
									Structure.build('LOON2')
								})
								.setLongClick(function () {
									Structure.destroy('LOON2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_materia_active.png", 12.5)
								.setClick(function () {
									Structure.build('MATERIA1')
								})
								.setLongClick(function () {
									Structure.destroy('MATERIA1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_iron_active.png", 12.5)
								.setClick(function () {
									Structure.build('MATERIA2')
								})
								.setLongClick(function () {
									Structure.destroy('MATERIA2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_neblaze_active.png", 12.5)
								.setClick(function () {
									Structure.build('NEBLAZE1')
								})
								.setLongClick(function () {
									Structure.destroy('NEBLAZE1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_obsidian_active.png", 12.5)
								.setClick(function () {
									Structure.build('NEBLAZE2')
								})
								.setLongClick(function () {
									Structure.destroy('NEBLAZE2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_redwind_active.png", 12.5)
								.setClick(function () {
									Structure.build('REDWIND1')
								})
								.setLongClick(function () {
									Structure.destroy('REDWIND1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_iron_active.png", 12.5)
								.setClick(function () {
									Structure.build('REDWIND2')
								})
								.setLongClick(function () {
									Structure.destroy('REDWIND2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_romol_active.png", 12.5)
								.setClick(function () {
									Structure.build('ROMOL1')
								})
								.setLongClick(function () {
									Structure.destroy('ROMOL1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_stone_active.png", 12.5)
								.setClick(function () {
									Structure.build('ROMOL2')
								})
								.setLongClick(function () {
									Structure.destroy('ROMOL2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_squarefury_active.png", 12.5)
								.setClick(function () {
									Structure.build('SQUAREFURY1')
								})
								.setLongClick(function () {
									Structure.destroy('SQUAREFURY1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_stone_active.png", 12.5)
								.setClick(function () {
									Structure.build('SQUAREFURY2')
								})
								.setLongClick(function () {
									Structure.destroy('SQUAREFURY2')
								}),
						]),
						new Linear().setOrientation(VERTICAL_).multiAddView(false, [
							new ImageView().setImageDrawable("assets/terrain-atlas/medium/medium_timber_active.png", 12.5)
								.setClick(function () {
									Structure.build('TIMBER1')
								})
								.setLongClick(function () {
									Structure.destroy('TIMBER1')
								}),
							new ImageView().setImageDrawable("assets/terrain-atlas/soulbound_lectern/lectern_log_active.png", 12.5)
								.setClick(function () {
									Structure.build('TIMBER2')
								})
								.setLongClick(function () {
									Structure.destroy('TIMBER2')
								}),
						]),
					]).get()
			).get()
		)
	}
}
Structure.initItem()