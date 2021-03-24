LIBRARY({
	name: "Timer",
	version: 1,
	api: "CoreEngine"
});
function Test(func, name) {
	try {
		func();
	} catch (e) {
		Logger.Log(e, ' TimerJS  ' + ('] -•- [ ' + name + ' ') || '');
		Logger.LogError(e);
	}
};
function Timer(name) {
	this.create = function (func, time, timeType, timerType) {
		this.func = func;
		this.timerType = timerType || '';
		switch (timeType) {
			case 'sec': this.time = time * 20; break;
			case 'min': this.time = (time * 20) * 60; break;
			case 'tick': this.time = time; break;
			default: this.time = time; break;
		}
		Logger.Log('Creating one new timer', ' Timer ' + ('] >-< [ New ' + name + ' ') || '');
		this.ticks = 0;
	}
	this.reset = function () { this.ticks = 0; }
	this.start = function () {
		var ticks = this.ticks, time = this.time, work = this.working, func = this.func;
		work = true;
		if (this.timerType == 'loop')
			Callback.addCallback("tick", function () {
				if (ticks !== time && work) ticks++;
				else if (work) {
					ticks = 0;
					Test(function () {
						func();
					}, 'Loop Function');
				}
			});
		else
			Callback.addCallback("tick", function () {
				if (ticks !== time && work) ticks++;
				else if (work) {
					Test(function () {
						func();
					}, 'Function');
					work = false;
				}
			});
	}
	this.stop = function () {
		this.working = false;
		this.ticks = 0;
	}
	this.get = function () {
		return { time: this.time, ticks: this.ticks, func: this.func };
	}
};
EXPORT("Timer", Timer);