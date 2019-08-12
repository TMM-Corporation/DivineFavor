// var waterStr = [[-3, 3],[-2, 3],[-1,3],[0,3],[1,3],[2,3],[3,3]]
// var waterStr = [[-3, 2],[-2, 2],[-1,2],[0,2],[1,2],[2,2],[3,2]]
// var waterStr = [[-3, 1],[-2, 1],[-1,1],[0,1],[1,1],[2,1],[3,1]]
// var waterStr = [[-3, 0],[-2, 0],[-1,0],[1,0],[2,0],[3,0]]
// var waterStr = [[-3, -1],[-2, -1],[-1,-1],[0,-1],[1,-1],[2,-1],[3,-1]]
// var waterStr = [[-3, -2],[-2, -2],[-1,-2],[0,-2],[1,-2],[2,-2],[3,-2]]
// var waterStr = [[-3, -3],[-2, -3],[-1,-3],[0,-3],[1,-3],[2,-3],[3,-3]]
// var waterStr = [[-3, 2],[-2, 2],[-1,2],[0,2],[1,2],[2,2],[3,2]]
// var waterStr = [[-3, 2],[-2, 2],[-1,2],[0,2],[1,2],[2,2],[3,2]]
// var waterStr = [[-3, 2],[-2, 2],[-1,2],[0,2],[1,2],[2,2],[3,2]]
// var waterStr = [[-3, 2],[-2, 2],[-1,2],[0,2],[1,2],[2,2],[3,2]]
// var waterStr = [[-3, 2],[-2, 2],[-1,2],[0,2],[1,2],[2,2],[3,2]]
// var waterStr = [[-3, 2],[-2, 2],[-1,2],[0,2],[1,2],[2,2],[3,2]]
regBlock("bath_heater", "Bath Heater", [
    ["bath_heater_bottom", 0],
    ["bath_heater_top_inactive", 0],
    ["bath_heater_side", 0],
    ["bath_heater_side", 0],
    ["bath_heater_side", 0],
    ["bath_heater_side", 0]
], true);
Recipes.addShaped({
  id: BlockID.bath_heater,
  count: 1,
  data: 0
}, ["aba", "cdc", "aaa"], ['a', 1, 0, 'b', 61, 0, 'c', 4, 0, 'd', 54, 0]);

// active model
var bath_heater_active = new BlockRenderer.Model([
    ["bath_heater_bottom", 0],
    ["bath_heater_top_active", 0],
    ["bath_heater_side", 0]
]);

var Bubble = Particles.registerParticleType({
    type: 1,
    texture: "bubble",
    size: [0.4, 0.7],
    lifetime: [80, 100],
    velocity: [0, 0.005, 0]
});


var Emit = function (x, y, z) {
    // var emitter = Particles.ParticleEmitter(x, y, z)
    // emitter.setEmitRelatively(true)
    // var vy = Math.random()
    // vy>=0.5 && (vy=0.2)
    // emitter.emit(Bubble, 0, Math.random(), vy, Math.random())
}


// Callback.addCallback("EntityHurt", function (attacker, victim, damage) {

//     if (config && attacker == Player.get()) {
//         return;
//     }

//     const pos = Entity.getPosition(victim);
//     const emitter = new Particles.ParticleEmitter(pos.x, pos.y, pos.z);
//     emitter.setEmitRelatively(true);
//     Emit(emitter, 20);
//     let i = 0;

//     for (i = damage / 20 | 0; i--;) {
        
//     }
//     damage %= 20;

//     for (i = damage >> 1; i--;) {
//         Emit(emitter, 2);
//     }

//     if (damage & 1) {
//         Emit(emitter, 1);
//     }

// });




var blend = {
    list: {},
    effects: {},
    time: {},
    reg: function (texture, name, ingredients, spiritID){
        regItem(texture, name, 64);
        if (ingredients) Recipes.addShaped({ id: ItemID[texture], count: 1, data: 0 }, ["aaa", "aba", "aaa"], ingredients );
        if (spiritID === 0 || spiritID) this.addBlendEffect(ItemID[texture], spiritID);
    },
    addEffect: function (name, spiritID) {
        var effectName = name+" aura";
        this.effects[spiritID] = effectName;
    }, //{0: "name aura"}
    addBlendEffect: function (id, spiritID) {
        this.list[id] = spiritID;
    },//{id: ItemID.int, spiritID}
    getEffect: function (spiritID) {
        return this.effects[spiritID];
    },//{0: "name aura", id: ItemID}
    setPlayerEffect: function (spiritID, time) {
        // blend.time[spiritID] = {time: time*20};
        if (!this.time[spiritID])this.time[spiritID] = time * 20;
        Callback.invokeCallback("onEffectSet", spiritID, time);
    },
    addPlayerEffect: function (spiritID, time) {//1141
        if (this.time[spiritID] !== undefined)this.time[spiritID] += time;
        else this.setPlayerEffect(spiritID, 25)
        Callback.invokeCallback("onEffectTimeAdded", spiritID, time);
    },
    getPlayerEffect: function (spiritID) {
        return this.time[spiritID];
        // Callback.invokeCallback("onEffectTimeAdded", spiritID, time);
    },
    removePlayerEffect: function (spiritID) {
        delete this.time[spiritID];
        Callback.invokeCallback("onEffectRemoved", spiritID);
    },
    isValid: function(id){
        if(id in this.list)return true;
        else return false;
    }
}
blend.addEffect("Hunters", 0);
blend.addEffect("Frosty", 1);
blend.addEffect("Distorted", 2);
blend.addEffect("Calling", 3);
blend.addEffect("Charred", 5);
blend.addEffect("Energetic", 6);
blend.addEffect("Mineral", 7);
blend.addEffect("Visceral", 8);
blend.addEffect("Arboreal", 9);

blend.reg("feathers_blend", "Calm feather blend", ['a', ItemID.peace_soul_shard, 0, 'b', 288, 0], 0);
blend.reg("snow_blend", "Evercold snow blend", ['a', ItemID.water_soul_shard, 0, 'b', 332, 0], 1);
blend.reg("ender_pearl_blend", "Distorted pearl blend", ['a', ItemID.end_soul_shard, 0, 'b', 368, 0], 2);
blend.reg("lapis_blend", "Undead lapis blend", ['a', ItemID.undeath_soul_shard, 0, 'b', 351, 4], 3);
blend.reg("charcoal_blend", "Nether Charcoal blend", ['a', ItemID.nether_soul_shard, 0, 'b', 263, 1], 5);
blend.reg("redstone_blend", "Mystic redstone blend", ['a', ItemID.will_soul_shard, 0, 'b', 331, 0], 6);
blend.reg("flint_blend", "Tool flint blend", ['a', ItemID.mind_soul_shard, 0, 'b', 318, 0], 7);
blend.reg("fleshy_blend", "Wild flesh blend", ['a', ItemID.wild_soul_shard, 0, 'b', 319, 0], 8);
blend.reg("wood_blend", "Cursed wood blend", ['a', ItemID.wither_soul_shard, 0, 'b', 5, -1], 9);
blend.reg("ethereal_goo_blend", "Ethereal goo blend");

// blend.reg("charcoal_blend", "Nether Charcoal blend", ['a', ItemID.nether_soul_shard, 0, 'b', 263, 1]);
// blend.reg("ender_pearl_blend", "Distorted pearl blend", ['a', ItemID.end_soul_shard, 0, 'b', 368, 0]);
// blend.reg("ethereal_goo_blend", "Ethereal goo blend");
// blend.reg("feathers_blend", "Calm feather blend", ['a', ItemID.peace_soul_shard, 0, 'b', 288, 0]);
// blend.reg("fleshy_blend", "Wild flesh blend", ['a', ItemID.wild_soul_shard, 0, 'b', 319, 0]);
// blend.reg("flint_blend", "Tool flint blend", ['a', ItemID.mind_soul_shard, 0, 'b', 318, 0]);
// blend.reg("lapis_blend", "Undead lapis blend", ['a', ItemID.undeath_soul_shard, 0, 'b', 351, 4]);
// blend.reg("redstone_blend", "Mystic redstone blend", ['a', ItemID.will_soul_shard, 0, 'b', 331, 0]);
// blend.reg("snow_blend", "Evercold snow blend", ['a', ItemID.water_soul_shard, 0, 'b', 332, 0]);
// blend.reg("wood_blend", "Cursed wood blend", ['a', ItemID.wither_soul_shard, 0, 'b', 5, -1]);

var bathHeater_UI = new UI.StandartWindow({
    standart: {
        header: { text: { text: "Created With UIEditor" } },
        background: { color: android.graphics.Color.parseColor("#C6C6C6") }, inventory: { standart: true }
    },
    drawing: [],
    elements: {
        "image_0": { type: "image", x: 380, y: 120, bitmap: "bath.bath_heater", scale: 3.2 },
        "debug": { type: "text", x: 380, y: 80, width: 1e3, height: 20, text: "текст", font: {size: 8}},
        "blend": {
            type: "slot", x: 479, y: 120, size: 58, bitmap: "bath.slot_default", isValid: function (id, count, data) {
                return blend.isValid(id);
            }
        },
        "fuel": {
            type: "slot", x: 479, y: 231, size: 58, bitmap: "bath.slot_default", isValid: function (id, count, data) {
                return Recipes.getFuelBurnDuration(id, data) > 0;
            }
        },
        "burn": { type: "scale", x: 486, y: 184, direction: 1, bitmap: "bath.burn", scale: 3.15, value: 0}, //burn
        "scale_0": { type: "scale", x: 547, y: 129, direction: 0, bitmap: "bath.scale_toLeft", scale: 3.2, value: 0 }, //right bubble
        "scale_1": { type: "scale", x: 377, y: 129, direction: 2, bitmap: "bath.scale_toRight", scale: 3.2, value: 0 }, //left bubble
    }
});
TileEntity.registerPrototype(BlockID.bath_heater, {
    defaultValues: {
        work: false,
        item: false,
        id: null,
        progressItem: 0,
        burn: 0,
        burnMax: 0
    },
    getFuel: function (slotName) {
        var fuelSlot = this.container.getSlot(slotName);
        if (fuelSlot.id > 0) {
            var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
            if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
                fuelSlot.count--;
                this.container.validateSlot(slotName);
                return burn;
            }
        }
        return 0;
    },//eff +25s every 5 secs, burns 1 minute
    genBubbles: function(x, y, z){
        for (var x1 = -3; 3 >= x1; x1++)
            for (var block, z1 = -3; 3 >= z1; z1++)
                block = World.getBlock(x + x1, y, z + z1),
                (block.id == 9 || block.id == 8 )&&
                Emit(x + x1, y, z + z1);
    },
    getGuiScreen: function () { return bathHeater_UI; },
    tick: function () {
        let ticks = World.getThreadTime();
        var item = this.container.getSlot("blend");
        (this.data.work && item.count >= 1 && this.data.item == false && !this.data.id && item.id in blend.list)&& 
            (item.count--,
            this.data.id = item.id,
            this.data.item = true,
            this.data.progressItem = 1200,
            blend.setPlayerEffect(blend.list[this.data.id], 25),
            this.container.validateSlot("blend")
        );

        this.data.burn <= 0 && (this.data.work = false, this.data.burn = this.data.burnMax = this.getFuel("fuel"));

        this.data.burn > 0 && (this.data.work = true, this.data.burn-- , (ticks % 40 === 0) && (this.genBubbles(this.x, this.y, this.z)));

        (this.data.burn > 0, this.data.item, this.data.progressItem != 0, this.data.id != null) &&
            (this.data.progressItem-- ,
                (ticks % 100 === 0 && this.data.progressItem > 100) &&
                    (blend.addPlayerEffect(blend.list[this.data.id], 500)
                    // Debug.addParticle(this.x + Math.random(), this.y+ 2 + Math.random(), this.z + Math.random(), 1, 0, 0 + Math.random(), 0, 0)
                )
            );

        this.data.progressItem==0 && (this.data.item=false, this.data.id=null);

        this.container.setScale("burn", this.data.burn / this.data.burnMax || 0);
        this.container.setScale("scale_0", this.data.progressItem / 1200 || 0);
        this.container.setScale("scale_1", this.data.progressItem / 1200 || 0);
            
        
        // if(ticks % 15 === 0){
        //     let x = this.x;
        //     let y = this.y;
        //     let z = this.z;
        //     this.genBubbles(x, y, z);
        // }
        
            // setText("debug", "spiritID: "+blend.list[this.data.id]+", Time: "+blend.time[blend.list[this.data.id]])
        // this.container.setTextSize("debug", 6)
        this.container.setText("debug", JSON.stringify(blend.time) + ", id - " + this.data.id + ", progress - "+this.data.progressItem)
        // this.container.setText("debug", "BlockID: "+block.id+", data: "+block.data)
    }
});

// Saver.addSavesScope("Effects",
//     function read(scope) {
//         blend.time = null;
//         blend.time = scope.time || {};
//     },
//     function save() {
//         return {
//             time: blend.time
//         };
        
//     }
// );