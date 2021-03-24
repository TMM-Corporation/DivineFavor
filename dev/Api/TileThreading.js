function DebugThis(func, name) {
	UI.getContext().runOnUiThread(new java.lang.Runnable({
		run() {
			// Logger.Log('Debuggung new function', ' DebugThis ' + ((name + ' ') || ''))
			try {
				func()
			} catch (e) {
				Logger.Log(e.name + ': [' + e.message + ']', "ERROR: " + e.fileName + '#' + e.lineNumber)
			}
		}
	}))
}

var TileThreading = {
	TileList: [],
	TICKING: false,
	InitThis(this_) {
		var key = this_.data.TTKEY_
		if (!key || key == "") key = Math.random().toString(36).substring(7)
		Logger.Log("TTKEY: [" + key + "] at [" + this_.x + "," + this_.y + "," + this_.z + "];", " Tile ADDED ")
		TileThreading.TileList[key] = this_
		return key
	},
	DestroyThis(this_) {
		var key = this_.data.TTKEY_
		Logger.Log("TTKEY: [" + key + "] at [" + this_.x + "," + this_.y + "," + this_.z + "];", " Tile DELETED ")
		delete TileThreading.TileList[key]
		// return key
	},
	RunTicking() {
		TileThreading.TICKING = true
	},
	StopTicking() {
		TileThreading.TICKING = false
		TileThreading.TileList = []
	},
	StartThread() {
		DebugThis(function () {
			new java.lang.Thread(function () {
				while (TileThreading.TICKING) {
					for (let KEY in TileThreading.TileList)
						TileThreading.TileList[KEY].ticking()
					java.lang.Thread.sleep(50)
				}
			}).start()
		}, 'Tile Threading')
	}
}
Callback.addCallback("LevelLoaded", function () {
	TileThreading.RunTicking()
})
Callback.addCallback("LevelLeft", function () {
	TileThreading.StopTicking()
})
TileThreading.StartThread()