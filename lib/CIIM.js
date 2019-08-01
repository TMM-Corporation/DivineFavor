/*
  * Custom 
  * Item
  * Inventory
  * Manager
*/
LIBRARY({
    name: "CIM",
    version: 1,
    shared: true,
    api: "CoreEngine",
});
var CIM = {
	count: 1,
	types: 0,
	containers:{},
	prototypes: {},
	guis: {},
	reg: function(item, obj){
		Logger.Log("Registering CIM Item", "MOD");
		
		let gui = obj.gui;
		let nonCIM = function (item) {
	        return !CIM.isCIM(item);
	    };
		if(obj.gui){
			for(let i in obj.gui.getContent().elements){
				obj.gui.getContent().elements[i].isValid=nonCIM;
			};
			gui = obj.gui;
			if(!obj.type){obj.type=this.types; this.types++;}
			CIM.guis[obj.type] = gui;
			obj.gui = gui;
			Logger.Log("Added item with type "+this.types, "MOD");
			Item.registerUseFunctionForID(item, function (coords, item) {
	            CIM.openGuiFor(item.id, item.data); 
				Logger.Log("Trying to open gui in use", "MOD");
	        });
	        this.prototypes[item] = obj;
		}else Logger.Log("Gui is not added, skipping...", "ERROR");
    },
    isCIM: function(item){
    	return this.prototypes[item];
   },
   openGuiFor: function (id, data, notUpdateData) {
        let prototype = this.prototypes[id];
        if (prototype) {
            let container = this.containers["d" + data];
            alert("Is prototype");
            if (!container) {
                data = CIM.count++;
                container = this.containers["d" + data] = new UI.Container();
                alert("Container not found, creating one new");
                if (!notUpdateData)
                    Player.setCarriedItem(id, 1, data);
            }
            alert("Trying to open it");
            container.openAs(prototype.gui);
            return data;
        }
    }
}
Saver.addSavesScope("PouchScope",
    function read(scope) {
        CIM.count = scope.count || 1;
        CIM.containers = scope.containers || {};
    },

    function save() {
        return {
            count: CIM.count,
            containers: CIM.containers
        };
    }
);
alert("Pouch count "+CIM.count);
registerAPIUnit("CIM", CIM);