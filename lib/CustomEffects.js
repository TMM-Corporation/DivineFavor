LIBRARY({
	name: "EffectAPI",
	version: 1,
	shared: false,
	api: "CoreEngine"
});


var EffectAPI = {
	list: {},
	effects: {},
	time: {},
	addEffect: function (obj) {
		EffectAPI.effects[obj.effectID] = { name: obj.effectName, desc: obj.desc || null, type: obj.type, func: obj.func };
	},
	//EffectAPI.addEffect({
	//	effectID: 0,
	// 	name: "Custom Effect Name",
	//	positive: true,
	//	function: function(){Player.addVelocity(0, 10, 0);}
	//})

	getEffect: function (e) {
		return EffectAPI.effects[e];
	},
	//returns {name: effectName, positive: positive, func: func}
	setPlayerEffect: function (e, t) {
		if (!EffectAPI.time[e]) EffectAPI.time[e] = t;
		Callback.invokeCallback("onPlayerEffectSet", e, t);
	},

	addEffectInRange: function(x, y, z, r, e, t){
		let c = Player.getPosition();
		let xx = Math.abs(x - c.x), yy = Math.abs(y - c.y), zz = Math.abs(z - c.z);
		if(Math.sqrt(xx*xx + yy*yy + zz*zz) <= radius){
			EffectAPI.setPlayerEffect(e, t);
		}
	},

	addTime: function (e, t) {
		if (EffectAPI.time[e] !== undefined) {
			EffectAPI.time[e] += Math.floor(t);
			Callback.invokeCallback("onPlayerEffectTimeAdded", e, EffectAPI.time[e]);
		} else Game.message("Cannot add effect time with {effectID: " + e + ", time: "+EffectAPI.time[e]+"}, effect not found."),
		this.setPlayerEffect(e, 120);
	},

	getPlayerEffect: function (e) {
		return EffectAPI.time[e];
	},

	getPlayerEffectList: function () {
		return EffectAPI.time;
	},

	removePlayerEffect: function (e) {
		Callback.invokeCallback("onEffectRemoved", e);
		delete EffectAPI.time[e];
	},

	clearPlayerEffects: function (type) {
		let time = EffectAPI.time;
		switch (type) {
			case 0:
				for (let i in time)
					if (time[i].type == 0) delete time[i]
				break;
			case 1:
				for (let i in time)
					if (time[i].type == 1) delete time[i]
				break;
			default:
				time = {};
				break
		}
		Callback.invokeCallback("onEffectsCleared");
	},
	
	effectFunction: function () {
		for (let i in EffectAPI.time) {
			EffectAPI.effects[i].func();
			EffectAPI.time[i]-=1;
			if (EffectAPI.time[i] < 21) EffectAPI.removePlayerEffect(i);
			Callback.invokeCallback("onEffectFunction", i, EffectAPI.effects[i].func);
		}
	}
}

Callback.addCallback("tick", function () {
	EffectAPI.effectFunction();
});


Callback.addCallback("onPlayerEffectSet", function (effectID, time) {
	Game.message("Set Effect - " + effectID + ", time: "+ EffectAPI.time[effectID]+"ticks");
});
Callback.addCallback("onPlayerEffectTimeAdded", function (effectID, time) {
	Game.message("Added time for Effect - " + effectID + ", total time: "+ EffectAPI.time[effectID]+"ticks");
});
Callback.addCallback("onEffectRemoved", function(e){
	Game.message("Deleted effect: "+ e);
});




var effectsUI = {
	isEnabled: false,
	container: null,
	Window: new UI.Window({
		location: { x: 0, y: 34, width: 1e3 / 2, height: 160 },
		drawing: [{ type: "background", color: 0 }],
		elements: {
			"text1": { type: "text", font: { size: 20, color: android.graphics.Color.WHITE }, x: 0, y: 0, width: 1e3, height: 30, multiline: true, format: true, text: "...No data..." },
		}
	})
}
effectsUI.Window.setAsGameOverlay(true);

var currentUIscreen;
Callback.addCallback("NativeGuiChanged", function (screenName) {
	currentUIscreen = screenName;
	if(screenName == "pause_screen")backCount=0, back = false;
	if (screenName != "hud_screen" && screenName != "in_game_play_screen") {
		if (effectsUI.container) {
			effectsUI.container.close();
			effectsUI.container = null;
		}
	}
});
Callback.addCallback("tick", function () {
	if(World.getThreadTime() % 20 == 0){
		if (currentUIscreen == "hud_screen" || currentUIscreen == "in_game_play_screen") {
			if (!effectsUI.container) {
				effectsUI.container = new UI.Container();
				effectsUI.container.openAs(effectsUI.Window);
			}
			let text = "", t =	EffectAPI.time;
			for(let i in t){
				// text+="EffectID: "+i+", time: "+t[i]+" (ticks)\n";
				text+="Name: "+EffectAPI.effects[i].name+", time: "+(t[i]/20)+" (sec)\n";
			}
			effectsUI.container.setText("text1", text);
		} else if (effectsUI.container) {
			effectsUI.container.close();
			effectsUI.container = null;
		}
	}
});





Saver.addSavesScope("Effects",
	function read(scope) {
		Callback.invokeCallback("onEffectsWorldLoaded", { time: scope.time });
		// delete EffectAPI.time;
		// EffectAPI.time = scope.time || {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
		// EffectAPI.time = scope.time || {};
		// for(let i in scope.time)
		// alert(scope.time[i]+" "+i);
	},
	function save() {
		Callback.invokeCallback("onEffectsWorldUnLoaded", { time: EffectAPI.time });
		return {
			time: EffectAPI.time
		};
	}
);
EXPORT("EffectAPI", EffectAPI);