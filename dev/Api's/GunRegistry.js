var context = UI.getContext();
var CurrentWindow;
var CurrentLayout;

function runAsGUI(f) {
	context.runOnUiThread(new java.lang.Runnable({
		run: function () {
			try {
				f();
			} catch (e) {
				alert(e);
			}
		}
	}));
}


IMPORT("Inventory");
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
		run: function () {
			try {
				func();
			} catch (err) {
				Game.message(err);
				alert(err);
			}
		}
	}));
}

var GunRegistry = {
	guns: [],
	bullets: [],
	hurt: [],
	inGame: false,
	registerGun: function (gun) {
		gun.shooting = false;
		GunRegistry.guns.push(gun);
		if (gun.automatic) {
			Item.registerNoTargetUseFunction(gun.gun, GunRegistry.switchShooting);
			Item.registerUseFunction(gun.gun, GunRegistry.switchShooting);
		} else {
			Item.registerNoTargetUseFunction(gun.gun, GunRegistry.shoot);
			Item.registerUseFunction(gun.gun, GunRegistry.shoot);
		}
	},



	getGun: function (gunId) {
		for (var i in GunRegistry.guns) {
			let gun = GunRegistry.guns[i];
			if (gun.gun == gunId)
				return gun;
		}
		return false;
	},

	switchShooting: function () {
		let gun = GunRegistry.getGun(Player.getCarriedItem().id);
		gun.shooting = !gun.shooting;
	},

	disableShooting: function () {
		for (var i in GunRegistry.guns) {
			GunRegistry.guns[i].shooting = false;
		}
	},



	shoot: function () {
		let gun = GunRegistry.getGun(Player.getCarriedItem().id);
		if (PlayerInventory.retrieveItem(gun.bullet)) {

			let coords = Entity.getPosition(Player.get());
			let lookAngle = Entity.getLookAngle(Player.get());
			let velocity = {
				x: -Math.sin(lookAngle.yaw) * gun.speed,
				y: Math.sin(lookAngle.pitch) * gun.speed,
				z: Math.cos(lookAngle.yaw) * gun.speed
			}
			let entity = Entity.spawn(coords.x, coords.y, coords.z, 80);

			GunRegistry.bullets.push({
				"entity": entity,
				damage: gun.damage
			});
			Entity.setSkin(entity, gun.skin);
			Entity.setVelocity(entity, velocity.x, velocity.y, velocity.z);
			// Item.overrideCurrentIcon("spell_bow_pulling_2", 0);
		}
	},

	showAim: function (gun) {
		if (GunRegistry.aimShown || !GunRegistry.inGame) return;
		runAsUI(function () {
			GunRegistry.aimShown = true;
			GunRegistry.aimImage.setImageBitmap(gun.aim);

			GunRegistry.windowAim.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
		});
		if (gun.fov) {
			// Player.setFov(gun.fov);
		}
	},
	hideAim: function () {

		if (!GunRegistry.aimShown) return;

		runAsUI(function () {
			GunRegistry.windowAim.dismiss();
			GunRegistry.aimShown = false;
			GunRegistry.disableShooting();
		});
		Player.resetFov();
	}
};

runAsUI(function () {
	//Main layout of the whole window
	var layoutMain = new LinearLayout(ctx);
	layoutMain.setOrientation(0);
	layoutMain.setGravity(Gravity.CENTER);
	var params = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);

	layoutMain.setLayoutParams(params);
	GunRegistry.aimImage = new android.widget.ImageView(ctx);
	layoutMain.addView(GunRegistry.aimImage);

	//Popup Window for displaying the staff
	GunRegistry.windowAim = new android.widget.PopupWindow(layoutMain, LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
	GunRegistry.windowAim.setTouchable(false);
	GunRegistry.windowAim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
});


Callback.addCallback("ProjectileHit", function (projectile, item, target) {
	GunRegistry.bullets = GunRegistry.bullets.filter(function (bullet) {
		if (bullet.entity == projectile) {
			// Entity.remove(projectile);
			if (target.entity != -1) {
				GunRegistry.hurt.push({
					entity: target.entity,
					damage: bullet.damage
				});
			}
			return false;
		}
		return true;
	});
});
// Callback.addCallback("ItemUse", function (coords, item, block) {
// 	alert("ID: " + item.id + ", Count: " + item.count + ", Data: " + item.data);
// });
Callback.addCallback("EntityHurt", function (attacker, victim, damage) {
	var entity = -1;
	let gun = GunRegistry.getGun(Player.getCarriedItem().id);
	GunRegistry.hurt = GunRegistry.hurt.filter(function (ent) {
		if (ent.entity == victim) {
			entity = ent;
			return false;
		}
		if (entity != -1) {
			Entity.damageEntity(entity.entity, entity.damage);
			Entity.addEffect(entity.entity, gun.effect, 1, gun.efftime, false, false);
			Entity.addEffect(Player.get(), gun.playereff, 1, gun.plefftime, false, false);
			Entity.setFire(entity.entity, gun.ftime);
			Game.prevent();
		}
		return true;
	})
});

let counter = 0;

function animatedShoot(gun) {
	var state = 0;
	for (let i = 0; i < gun.variations; i++){
		if (counter == gun.animTime) {
			state++;
			Player.setCarriedItem(gun.gun, 1, state);
			counter = 0;
		}
	}
	if (state == gun.variations)	GunRegistry.shoot();
}

Callback.addCallback("tick", function () {
	let gun = GunRegistry.getGun(Player.getCarriedItem().id);
	let ticks = World.getThreadTime();
	if (ticks % 5 === 0) {
		if (gun) {
			if (gun != GunRegistry.currentGun) {
				GunRegistry.currentGun = gun;
				GunRegistry.hideAim();
			}
			GunRegistry.showAim(gun);
		} else {
			GunRegistry.hideAim();
		}
	}

	if (gun && gun.automatic && gun.shooting && ticks % gun.automatic === 15) {
		counter++;
		animatedShoot(gun);
	}

});


Callback.addCallback("NativeGuiChanged", function (screenName) {
	if (screenName == "hud_screen" ||
		screenName == "in_game_play_screen") {
		GunRegistry.inGame = true;
	} else {
		GunRegistry.inGame = false;
		GunRegistry.hideAim();
	}
});

Callback.addCallback("DestroyBlockStart", function () {
	if (GunRegistry.getGun(Player.getCarriedItem().id) != false) {
		Game.prevent();
	}
});