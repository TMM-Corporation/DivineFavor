function rtd(rotation, dgr) {
	return Math.floor(rotation * (dgr / Math.PI));
}
function dtr(dgr) {
	return dgr * (Math.PI/180);
}
function getYaw(r) {
	var yawRTD = rtd(r, 180);
	var yaw = 0;
	yaw = yawRTD % 360;
	yaw = (yaw + 360) % 360;
	return yaw;
}
function lookDirection(yaw, pitch) {
	return {
		x: -Math.sin(yaw) * Math.cos(pitch),
		y: Math.sin(pitch),
		z: Math.cos(yaw) * Math.cos(pitch)
	};
}
//some stuff
var Color = android.graphics.Color;
var LinearLayout = android.widget.LinearLayout;
var LayoutParams = android.widget.RelativeLayout.LayoutParams;
var Gravity = android.view.Gravity;
var BitmapFactory = android.graphics.BitmapFactory;
var View = android.view.View;

var ctx = UI.getContext();

function runAsUI(func) {
	ctx.runOnUiThread(new java.lang.Runnable({
		run() {
			try {
				func();
			} catch (err) {
				Game.message(err);
				alert(err);
			}
		}
	}));
};
function decodeBmp(string) {
	string = android.util.Base64.decode(string, 0);
	return android.graphics.BitmapFactory.decodeByteArray(string, 0, string.length);
}
function bmpImg(string) {
	var decodedBmp = decodeBmp(string),
		bmp = android.graphics.Bitmap.createBitmap(35, 35, android.graphics.Bitmap.Config.ARGB_8888),
		canvas = new android.graphics.Canvas(bmp);
	canvas.drawBitmap(decodedBmp, 0, 0, null);
	return bmp;
}
var t_bool = java.lang.Boolean.TYPE;
var t_int = java.lang.Integer.TYPE;
var t_double = java.lang.Double.TYPE;
var t_string = java.lang.String;

// var pressBack = java.lang.Class.forName("com.mojang.minecraftpe.MainActivity", true, UI.getContext().getClass().getClassLoader());

var nativeApi = java.lang.Class.forName("zhekasmirnov.launcher.api.NativeItem", true, UI.getContext().getClass().getClassLoader());
var overrideItemIcon = nativeApi.getMethod("overrideItemIcon", t_string, t_int);
Item.overrideItemIcon = function (name, index, id) {
	try { overrideItemIcon.invoke(null, name, new java.lang.Integer(index)); } catch (e) { }
	Game.message("Name: " + name + ", index: " + index)
}
var setItemRequiresIconOverride = nativeApi.getMethod("setItemRequiresIconOverride", t_int, t_bool);
Item.setItemRequiresIconOverride = function (id, bool) {
	setItemRequiresIconOverride.invoke(null, new java.lang.Integer(id), bool);
}
var BowRegistry = {
	aim: "iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABoSURBVFhH7ddBCoAwDADB6q99gc+OCDl4yEKlRYrsXHJ0oaXELSLagDPn05HztT3nEowhxhBjiDFk9AWeymMixpD7AldrQKVaDXpXiK5veEzEGOILTIwhv7rA/sR9whhiDDGGLBTT2gXGSxO6RTVwBgAAAABJRU5ErkJggg==",
	bows: [],
	bullets: [],
	hurt: [],
	inGame: false,
	talisman: "none",
	talismans: [],
	regBow(bow) {
		bow.shooting = false;
		BowRegistry.bows.push(bow);
		Item.setItemRequiresIconOverride(bow.bow, true);
		// Item.registerUseFunctionForID(bow.bow, BowRegistry.inventory);
		Item.registerNoTargetUseFunction(bow.bow, BowRegistry.animatedShoot);
		Item.registerIconOverrideFunction(bow.bow, function (item, name) {
			return { name: bow.texture, meta: bow.state }
		});
		Item.setEnchantType(bow.bow, 32, 14);
	},
	getBow(bowId) {
		for (var i in BowRegistry.bows) {
			let bow = BowRegistry.bows[i];
			if (bow.bow == bowId)
				return bow;
		}
		return false;
	},
	shoot() {
		let bow = BowRegistry.getBow(Player.getCarriedItem().id);
		let coords = Entity.getPosition(Player.get());
		let lookAngle = Entity.getLookAngle(Player.get());
		var velocity = lookDirection(lookAngle.yaw, lookAngle.pitch);
		let entity = Entity.spawn(coords.x + (velocity.x * 2), coords.y + (velocity.y * 2), coords.z + (velocity.z * 2), 80);
		// Entity.setLookAngle(entity, getYaw(lookAngle.yaw), 0);
		BowRegistry.bullets.push({
			entity: entity,
			damage: bow.damage
		});
		Entity.setSkin(entity, bow.skin);
		Entity.setVelocity(entity, velocity.x*bow.speed, velocity.y*bow.speed+0.2, velocity.z*bow.speed);
		var itemBC = Player.getCarriedItem();
		if((itemBC.damage-1)>=Item.getMaxDamage(itemBC.id)){
			CIM.dropCIMItems();
		}
		PlayerInventory.damageItem(1);
	},
	runAnim(bow) {
		if (PlayerInventory.haveItem(bow.bullet)) {
			bow.state++;
			if (bow.state == bow.variations) {
				bow.state = 0;
				if (PlayerInventory.retrieveItem(bow.bullet)) {
					BowRegistry.shoot();
				}
				bow.shooting = false;
			}
		} else {
			bow.shooting = false;
		}
	},
	animatedShoot() {
		let bow = BowRegistry.getBow(Player.getCarriedItem().id);
		bow.shooting = true;
	},
	showAim(bow) {
		if (BowRegistry.aimShown || !BowRegistry.inGame) return;
		runAsUI(function () {
			BowRegistry.aimShown = true;
			BowRegistry.aimImage.setImageBitmap(bmpImg(BowRegistry.aim));
			BowRegistry.windowAim.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
		});
	},
	hideAim() {
		if (!BowRegistry.aimShown) return;
		runAsUI(function () {
			BowRegistry.windowAim.dismiss();
			BowRegistry.aimShown = false;
		});
		// Player.resetFov();
	}
};

runAsUI(function () {
	//Main layout of the whole window
	var layoutMain = new LinearLayout(ctx);
	layoutMain.setOrientation(0);
	layoutMain.setGravity(Gravity.CENTER);
	var params = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);

	layoutMain.setLayoutParams(params);
	BowRegistry.aimImage = new android.widget.ImageView(ctx);
	layoutMain.addView(BowRegistry.aimImage);

	//Popup Window for displaying the staff
	BowRegistry.windowAim = new android.widget.PopupWindow(layoutMain, LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
	BowRegistry.windowAim.setTouchable(false);
	BowRegistry.windowAim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
});
//talismans.useTalisman(CIM.containers["e" + item.extra.getInt("extraCount")].getSlot("slot_27").id, 1, { Entity: entity.entity });
Callback.addCallback("ProjectileHit", function (projectile, item, target) {
	BowRegistry.bullets = BowRegistry.bullets.filter(function (bullet) {
		if (bullet.entity == projectile) {
			// alert(CIM.containers["e" + itemC.extra.getInt("extraCount")].getSlot("slot_27").id)
			talismans.useTalisman({ x: target.x, y: target.y, z: target.z, Entity: target.entity, block: World.getBlock(target.x, target.y-(1/16), target.z) });
			if (target.entity != -1) {
				BowRegistry.hurt.push({
					entity: target.entity,
					damage: bullet.damage
				});
			}
			// Entity.remove(projectile);
			return false;
		}
		return true;
	});
});

Callback.addCallback("EntityHurt", function (attacker, victim, damage) {
	var entity = -1, item = Player.getCarriedItem();
	let bow = BowRegistry.getBow(item.id);
	BowRegistry.hurt = BowRegistry.hurt.filter(function (ent) {
		if (ent.entity == victim) {
			entity = ent;
			return false;
		}
		if (entity != -1) {
			Game.prevent();
			Entity.damageEntity(entity.entity, bow.damage);
			// Entity.addEffect(entity.entity, bow.effect, 1, bow.efftime, false, false);
			// Entity.addEffect(Player.get(), bow.playereff, 1, bow.plefftime, false, false);
			// Entity.setFire(entity.entity, bow.ftime);
			Game.prevent();
		}
		return true;
	})
});

Callback.addCallback("tick", function () {
	let bow = BowRegistry.getBow(Player.getCarriedItem().id);
	let ticks = World.getThreadTime();
	if (ticks % 5 === 0) {
		if (bow.shooting) {
			runAsUI(function () { BowRegistry.runAnim(bow) });
		}
	}
	if (bow != BowRegistry.currentbow) {
		bow.state = 0;
		bow.shooting=false;
		BowRegistry.currentbow = bow;
		BowRegistry.hideAim();
	}
	if(bow)BowRegistry.showAim(bow);
	else BowRegistry.hideAim();
});


Callback.addCallback("NativeGuiChanged", function (screenName) {
	if (screenName == "hud_screen" || screenName == "in_game_play_screen") {
		BowRegistry.inGame = true;
	} else {
		BowRegistry.inGame = false;
		BowRegistry.hideAim();
	}
});

Callback.addCallback("DestroyBlockStart", function () {
	if (BowRegistry.getBow(Player.getCarriedItem().id) != false) {
		Game.prevent();
	}
});