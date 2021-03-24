LIBRARY({
	name: 'Bow',
	version: 1,
	shared: true,
	api: 'CoreEngine',
	dependencies: ['Timer', 'SoundAPI', 'Inventory']
})
IMPORT('Timer', 'Timer')
IMPORT('SoundAPI', 'Sound')
IMPORT('Inventory', 'Inventory')
var McMath = {
	rtd(rotation, dgr) {
		return Math.floor(rotation * (dgr / Math.PI))
	},
	dtr(dgr) {
		return dgr * (Math.PI / 180)
	},
	getYaw(r) {
		var yawRTD = this.rtd(r, 180)
		var yaw = 0
		yaw = yawRTD % 360
		yaw = (yaw + 360) % 360
		return yaw
	},
	lookDirection(yaw, pitch) {
		return {
			x: -Math.sin(yaw) * Math.cos(pitch),
			y: Math.sin(pitch),
			z: Math.cos(yaw) * Math.cos(pitch)
		}
	},
	random(min, max) {
		var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round(rand)
		return rand
	}
}
var Color = android.graphics.Color,
	ColorDrawable = android.graphics.drawable.ColorDrawable,
	ImageView = android.widget.ImageView,
	PopupWindow = android.widget.PopupWindow,
	LinearLayout = android.widget.LinearLayout,
	LayoutParams = android.widget.RelativeLayout.LayoutParams,
	Gravity = android.view.Gravity,
	BitmapFactory = android.graphics.BitmapFactory,
	View = android.view.View,
	PARENT = LayoutParams.MATCH_PARENT,
	t_bool = java.lang.Boolean.TYPE,
	t_int = java.lang.Integer.TYPE,
	t_double = java.lang.Double.TYPE,
	t_string = java.lang.String,
	ctx = UI.getContext(),
	ImageHelper = {
		bmpToImg(string, sizeX, sizeY) {
			string = android.util.Base64.decode(string, 0)
			var decodedBmp = android.graphics.BitmapFactory.decodeByteArray(string, 0, string.length),
				bmp = android.graphics.Bitmap.createBitmap(sizeX || 32, sizeY || 32, android.graphics.Bitmap.Config.ARGB_8888)
			canvas = new android.graphics.Canvas(bmp)
			canvas.drawBitmap(decodedBmp, 0, 0, null)
			return bmp
		}
	},
	nativeItem = java.lang.Class.forName('zhekasmirnov.launcher.api.NativeItem', true, UI.getContext().getClass().getClassLoader()),
	overrideItemIcon = nativeItem.getMethod('overrideItemIcon', t_string, t_int),
	setItemRequiresIconOverride = nativeItem.getMethod('setItemRequiresIconOverride', t_int, t_bool)

Item.overrideItemIcon = function (name, index, id) {
	try {overrideItemIcon.invoke(null, name, new java.lang.Integer(index))} catch (e) {}
	Game.message('Name: ' + name + ', index: ' + index)
}
Item.setItemRequiresIconOverride = function (id, bool) {
	setItemRequiresIconOverride.invoke(null, new java.lang.Integer(id), bool)
}

var arrows = []
var Arrow = Particles.registerParticleType({
	texture: "arrow",
	size: [1, 1],
	lifetime: [1, 5],
	velocity: [0, 0, 0]
})
var emitter = new Particles.ParticleEmitter(0, 0, 0)
function Arrow() {
	this.spawn = function (params) {
		var lookAngle = Entity.getLookAngle(Player.get())
		if (lookAngle.yaw == 0) {this.spawn(params); return }
		var c = Entity.getPosition(Player.get()),
			v = McMath.lookDirection(lookAngle.yaw, lookAngle.pitch)
		entity = Entity.spawn(c.x + (v.x * .12), c.y + (v.y * .12), c.z + (v.z * .12), 80)
		Entity.setSkin(entity, params.skin)
		Entity.setVelocity(entity, v.x * params.speed, v.y * params.speed + 0.2, v.z * params.speed)
		Bows.addBullet({"entity": entity, damage: params.damage})
		this.entity = entity
		return entity
	}

	this.tick = function () {
		this.p = Entity.getPosition(this.entity)
		this.v = Entity.getVelocity(this.entity)
		if (this.v.y != 0) {
			this.animate()
		}
	}

	this.animate = function () {
		for (let i = -0.99; i < 0.99; i += 0.33) {
			var c = {
				x: this.p.x - (this.v.x * i),
				y: this.p.y - (this.v.y * i),
				z: this.p.z - (this.v.z * i)
			}
			emitter.emit(Arrow, 0, c.x, c.y, c.z)
		}
	}
}
Callback.addCallback("tick", function () {
	for (var i in arrows) Test(function () {
		arrows[i].tick()
	}, 'ParticleTick')
})

function DebugThis(func, name) {
	ctx.runOnUiThread(new java.lang.Runnable({
		run() {
			try {
				func()
			} catch (e) {
				Logger.Log(e, ' Bow LIB Threads ' + ('] >-< [ ' + name + ' ') || '')
				Logger.LogError(e)
			}
		}
	}))
}
function Test(func, name) {
	try {
		func()
	} catch (e) {
		Logger.Log(e, ' Bow LIB ' + ('] >-< [ ' + name + ' ') || '')
		Logger.LogError(e)
	}
}
var Bows = {
	aim: "iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABoSURBVFhH7ddBCoAwDADB6q99gc+OCDl4yEKlRYrsXHJ0oaXELSLagDPn05HztT3nEowhxhBjiDFk9AWeymMixpD7AldrQKVaDXpXiK5veEzEGOILTIwhv7rA/sR9whhiDDGGLBTT2gXGSxO6RTVwBgAAAABJRU5ErkJggg==",
	inGame: false,
	currentBow: null,
	aimShown: false,
	bowInfo: {},
	dynamicProps: {
		bullets: [],
		hurt: [],
	},
	windowAim: null,
	addNewBow(info) {
		info.shooting = false
		info.state = 0
		Bows.bowInfo[info.id] = info
		Item.setItemRequiresIconOverride(info.id, true)
		Item.registerNoTargetUseFunction(info.id, function () {Bows.setShoot(info.id, true)})
		Item.registerIconOverrideFunction(info.id, function (item, name) {
			return {name: info.texture, meta: info.state}
		})
		Item.setEnchantType(info.id, 32, 14)
		Bows.addCallbacks(info)
		return info
	},
	setShoot(id, bool) {
		Bows.bowInfo[id].shooting = bool
	},
	getShoot(id) {
		return Bows.bowInfo[id].shooting || null
	},
	addBullet(bInfo) {
		this.dynamicProps.bullets.push(bInfo)
	},
	addHurt(hInfo) {
		this.dynamicProps.hurt.push(hInfo)
	},
	addUI() {
		DebugThis(function () {
			// Bows.windowAim = 
			// new PopupWindow(
			// 	new LinearLayout(ctx).setLayoutParams(
			//		A.PARENT, A.PARENT
			// 	).gravity = Gravity.CENTER.setOrientation(0) .addView(
			// 		new android.widget.ImageView(ctx) .setImageBitmap(ImageHelper.bmpToImg(Bows.aim))
			// 	),
			// 	PARENT, PARENT
			// ).setTouchable(false).setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
			var layoutMain = new LinearLayout(ctx),
				params = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT),
				aimIMG = new android.widget.ImageView(ctx)
			layoutMain.setOrientation(0)
			layoutMain.setGravity(Gravity.CENTER)
			layoutMain.setLayoutParams(params)
			layoutMain.addView(aimIMG)
			aimIMG.setImageBitmap(ImageHelper.bmpToImg(Bows.aim, 35, 35))
			var windowAim = new android.widget.PopupWindow(layoutMain, LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
			windowAim.setTouchable(false)
			windowAim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT))
			Bows.windowAim = windowAim
		}, 'Add UI')
	},
	getCurrentBow() {
		var id = Player.getCarriedItem().id, bow = Bows.setCurrentBow(id)
		//Logger.Log(bow)
		return bow
	},
	setCurrentBow(id) {
		if (id in Bows.bowInfo) {
			Bows.currentBow = Bows.bowInfo[id]
			Bows.aimShown = true
		} else {
			if (Bows.currentBow) {
				Bows.currentBow.state = 0
				Bows.currentBow.shooting = false
			}
			Bows.aimShown = false
			Bows.currentBow = null
		}
		Bows.updateAim()
		return Bows.currentBow
	},
	// addHurtFilter(a, v, d) {
	// 	var ent = -1;
	// 	Bows.dynamicProps.hurt = Bows.dynamicProps.hurt.filter(function (e) {
	// 		if (e.entity == v) {
	// 			ent = e;
	// 			return false;
	// 		}
	// 		if (ent != -1) {
	// 			Game.prevent();
	// 			Entity.damageEntity(ent.entity, bow.damage);
	// 			Callback.invokeCallback('BowArrowEntityDamage', a, v, d);
	// 			return true;
	// 		}
	// 	})
	// },
	addBulletFilter(p, i, t) {
		Bows.dynamicProps.bullets = Bows.dynamicProps.bullets.filter(function (bullet) {
			Callback.invokeCallback('BowArrowHit', p, i, t)
			if (bullet.entity == p) {
				if (t.entity != -1) {
					Bows.addHurt({
						entity: t.entity,
						damage: bullet.damage
					})
					Callback.invokeCallback('BowArrowEntityDamage', p, i, t)
				}
				return false
			}
			return true
		})
	},
	addCallbacks() {
		Callback.addCallback('ProjectileHit', function (p, i, t) {
			Bows.addBulletFilter(p, i, t)
		})
		// Callback.addCallback('EntityHurt', function (a, v, d) {
		// 	Bows.addHurtFilter(a, v, d)
		// });

		var shooting = new Timer('addCallbacks')
		shooting.create(function () {
			Test(function () {
				Bows.animateShoot()
			}, 'AnimateShoot')
		}, 5, 'tick', 'loop'); shooting.start()

		Callback.addCallback('NativeGuiChanged', function (sc) {
			Bows.inGame = (sc == 'hud_screen' || sc == 'in_game_play_screen') ? true : false
			Bows.updateAim()
		})

		Callback.addCallback('DestroyBlockStart', function () {
			if (Player.getCarriedItem().id in Bows.bowInfo)
				Game.prevent()
		})
	},
	getBullet(bullets) {
		for (let i in bullets)
			if (Inventory.haveItem(i))
				return bullets[i]
		return null
	},
	shoot() {
		var bow = Bows.currentBow, c = 0
		//for(let p in bow)Logger.Log("[ "+p+": "+bow[p]+" ]", c++);
		if (Player.getCarriedItem().id in Bows.bowInfo) {
			Inventory.damageItem(1)
			var arr = new Arrow()
			arrows.push(arr); arr.spawn(bow)
			var shootSound = new Sound()
			shootSound.setSource("Bow.ogg")
			shootSound.setOnCompletion(function () {
				shootSound.destroy()
			})
			shootSound.play()
			/** @callback BowOnShot return item */
			Callback.invokeCallback('BowOnShot', bow)
		}
	},
	animateShoot() {
		var bow = Bows.getCurrentBow()
		if (bow) {
			var bulletID = Bows.getBullet(bow.bullets)
			if (bulletID && bow.shooting == true && Inventory.haveItem(bulletID, 0)) {
				if (bow.state == bow.variations) {
					bow.state = 0
					bow.shooting = false
					if (Inventory.retrieveItem(bulletID)) {
						Bows.shoot()
						return
					}
				} else bow.state++
				Callback.invokeCallback('BowStateChange', bow)
			} else bow.shooting = false
		}
	},
	updateAim() {
		DebugThis(function () {
			if (Bows.aimShown && Bows.inGame)
				Bows.windowAim.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0)
			else {
				Bows.windowAim.dismiss()
				Bows.aimShown = false
			}
		}, 'Aim change')
	}
}

function Bow() {
	var bow = {damage: 0, speed: 0, skin: "", bullets: [], variations: 0, id: null}
	this.set = function (prototype) {
		bow = Bows.addNewBow(prototype)
	}
	this.get = function () {
		return this.bow
	}
	this.shoot = function () {
		Bows.shoot()
	}
}
Bows.addUI()

EXPORT('Bow', Bow)
EXPORT('Bows', Bows)