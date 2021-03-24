RecipeViewer.registerRecipeType(key, { //#### set Unique Key ####
	contents: {
		icon: /*ID or*/ {id: ID, count: 1, data: DATA},
		description: "", //displays below the icon (optional);
		drawing: [], //optional
		elements: {
		}
	},
	getList: function(id, data, isUsage){
		//isUsage == true -> what crafting recipes it is used in
		//isUsage == false -> to craft that item
		return [
			{
				input: [
					{id: 000, count: 00, data: 00}, //input0
					{id: 000, count: 00, data: 00}, //input1
					// ...
				],
				output: [
					{id: 000, count: 00, data: 00}, //output0
					{id: 000, count: 00, data: 00}, //output1
					// ...
				],
			}, //...
		];
	},
	onOpen: function(elements, data){ //optional
		//edit elements
	}
});

RecipeViewer.registerRecipeType("icpe_macerator", {
	contents: {
		icon: BlockID.macerator,
		drawing: [
			{type: "bitmap", x: 430, y: 200, scale: 6, bitmap: "macerator_bar_scale"} // image -> bitmap
		],
		elements: {
			input0: {type: "slot", x: 280, y: 190, size: 120},
			output0: {type: "slot", x: 600, y: 190, size: 120}
		}
	},
	getList: function(id, data, isUsage){
		let result;
		if(isUsage){
			result = ICore.Recipe.getRecipeResult("macerator", id, data);
			if(result){
				return [{
					input: [{id: id, count: 1, data: data}],
					output: [{id: result.id, count: result.count, data: result.data}]
				}];
			}
			return [];
		}
		const list = [];
		const recipe = ICore.Recipe.requireRecipesFor("macerator");
		let item;
		for(let key in recipe){
			result = recipe[key];
			if(result.id == id && result.data == data){
				item = key.split(":");
				list.push({
					input: [{id: Number(item[0]), count: 1, data: Number(item[1]) || 0}],
					output: [{id: result.id, count: result.count, data: result.data}]
				});
			}
		}
		return list;
	}
});