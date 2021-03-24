/*
	* Custom 
	* Item && Inventory
	* Manager
	* By TooManyMods
*/
LIBRARY({
	name: "CIM",
	version: 1,
	shared: false,
	api: "CoreEngine",
});
// Logger.Log("Created By TooManyMods", "CIM Lib");

var CIM = {
	/** @default 1 */
	count: 1,
	/** @default 1 */
	extraCount: 1,
	/** @default 0 */
	types: 0,
	/** Containers for CIM */
	containers: {},
	/** Prototypes */
	prototypes: {},
	/** Custom GUI for CIM */
	guis: {},
	/** 
	 * Register CIM item
	 * @param {number} item item id to bound CIM
	 * @param {array} obj With params {gui: UI.StandartWindow, name: "CIM Name"}
	 */
	reg(itemID, obj, isExtra, сondition) {
		// Logger.Log("Registering CIM Item", "CIM Lib");
		/** @param {number} item item to store nonCIM item */
		if (obj.gui) {
			/** For all elements adding isValid to dont store CIM items to gui */
			// for (let i in obj.gui.getContent().elements) {
			// 	obj.gui.getContent().elements[i].isValid = nonCIM;
			// };
			var gui = obj.gui;
			if (!obj.type) { obj.type = this.types; this.types++; }
			CIM.guis[obj.type] = gui;
			obj.gui = gui;
			// Logger.Log("Added item with name " + obj.name, "CIM Lib (item)");
			/** Regiset use function to open CIM */
			Item.registerUseFunctionForID(itemID, function (coords, item) {
				if (isExtra) {
					var extra = item.extra;
					if (!extra) {
						extra = new ItemExtraData();
						CIM.extraCount++;
						extra.putInt("extraCount", CIM.extraCount);
						Player.setCarriedItem(item.id, 1, item.data, extra);
					}
				}
				if (сondition == false) CIM.openGuiFor(item.id, item.data);
				// if (isExtra) Logger.Log("Trying to open gui for id: " + item.id + ", data: " + item.data + ", extra: " + extra.getInt("extraCount"), "CIM Lib (ItemUse)");
				// else Logger.Log("Trying to open gui for id: " + item.id + ", data: " + item.data, "CIM Lib (ItemUse)");
			});
			this.prototypes[itemID] = obj;
		} 
		// else Logger.Log("Gui is not added for id: " + itemID.id + ", skipping...", "CIM Lib (ERROR)");
	},
	/**
	 * @param {number} item item id
	 * @return {number} returns prototype, if from CIM
	 */
	isCIM(item) {
		return this.prototypes[item];
	},
	nonCIM(itemID) {
		return !CIM.isCIM(itemID);
	},
	getCIMContrainer(item) {
		if (item.extra) return CIM.containers["e" + item.extra.getInt("extraCount")];
		else return CIM.containers["d" + CIM.count];
	},
	getCIMPrototype(item) {
		return CIM.prototypes[item.id];
	},
	getCIMInvItems(item) {
		let slots = [];
		let inv = {};
		let prototype = this.getCIMPrototype(item);
		if (prototype) {
			let elements = prototype.gui.content.elements;
			for (let i in elements) {
				slots.push(i);
				inv[i] = this.getCIMContrainer(item).getSlot(i);
			} 
		}
	},
	dropCIMItems(item){
		var coords = Player.getPosition();
		if(!item)var item = Player.getCarriedItem();
		var container = this.getCIMContrainer(item);
		if(container)container.dropAt(coords.x, coords.y, coords.z)
	},
	/**
	 * Opening GUI for CIM item
	 * @param {number} id item id
	 * @param {number} data item data
	 * @param {number} extra item extra
	 * @returns data and extra
	 */
	openGuiFor(id, data, extra, isExtra) {
		let prototype = this.prototypes[id];
		if (prototype) {
			let container;
			if (isExtra && extra == null) {
				extra = new ItemExtraData();
				CIM.extraCount++;
				extra.putInt("extraCount", CIM.extraCount);
				Player.setCarriedItem(id, 1, data, extra);
			}
			if (!extra && !isExtra) container = this.containers["d" + data];
			else container = this.containers["e" + extra.getInt("extraCount")];

			// if (isExtra) Logger.Log("id: " + id + ", data: " + data + ", extra: " + extra.getInt("extraCount"), "CIM Lib (Container)");
			// else Logger.Log("id: " + id + ", data: " + data, "CIM Lib (Container)");

			if (!container) {
				if (!extra && !isExtra) data = CIM.count++ , container = this.containers["d" + data] = new UI.Container();
				else container = this.containers["e" + extra.getInt("extraCount")] = new UI.Container();

				if (isExtra) Player.setCarriedItem(id, 1, data, extra),
					Logger.Log("Container not found, creating one new for id: " + id + ", data: " + data + ", extra: " + extra.getInt("extraCount"), "CIM Lib (Container)");

				else Player.setCarriedItem(id, 1, data),
					Logger.Log("Container not found, creating one new for id: " + id + ", data: " + data, "CIM Lib (Container)");
			}
			// Logger.Log("Trying to open it", "CIM Lib (Container)");
			container.openAs(prototype.gui);
			return [data, extra];
		}
	}
}
Saver.addSavesScope("PouchScope",
	function read(scope) {
		CIM.guis = scope.guis || {},
		CIM.count = scope.count || 1;
		CIM.extraCount = scope.extraCount || 1;
		CIM.containers = scope.containers || {};
	},
	function save() {
		return {
			guis: CIM.guis,
			count: CIM.count,
			extraCount: CIM.extraCount,
			containers: CIM.containers
		};
	}
);
// Logger.Log("CIM Item Count: " + CIM.count, "CIM Lib");
registerAPIUnit("CIM", CIM);