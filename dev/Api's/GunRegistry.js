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
};

var t_bool = java.lang.Boolean.TYPE;
var t_int = java.lang.Integer.TYPE;
var t_double = java.lang.Double.TYPE;
var t_string = java.lang.String;

var nativeApi = java.lang.Class.forName("zhekasmirnov.launcher.api.NativeItem", true, UI.getContext().getClass().getClassLoader());
// var pressBack = java.lang.Class.forName("com.mojang.minecraftpe.MainActivity", true, UI.getContext().getClass().getClassLoader());

var overrideItemIcon = nativeApi.getMethod("overrideItemIcon", t_string, t_int);
var setItemRequiresIconOverride = nativeApi.getMethod("setItemRequiresIconOverride", t_int, t_bool);
Item.setItemRequiresIconOverride = function(id, bool){
  setItemRequiresIconOverride.invoke(null, new java.lang.Integer(id), bool);
}
Item.overrideItemIcon = function(name, index, id){
  try{overrideItemIcon.invoke(null, name, new java.lang.Integer(index));}catch(e){}
  Game.message("Name: "+name+", index: "+index)
}
var GunRegistry = {
  guns: [],
  bullets: [],
  hurt: [],
  inGame: false,
  registerGun: function (gun) {
    gun.shooting = false;
    GunRegistry.guns.push(gun);
    Item.setItemRequiresIconOverride(gun.gun, true);
    Item.registerNoTargetUseFunction(gun.gun, GunRegistry.animatedShoot);
    // Item.registerUseFunction(gun.gun, GunRegistry.animatedShoot);
    Item.registerIconOverrideFunction(gun.gun, function (item, name) {
      return { name: gun.texture, meta: gun.state }
    });
    Item.setEnchantType(gun.gun, 32, 14);
  },
  getGun: function (gunId) {
    for (var i in GunRegistry.guns) {
      let gun = GunRegistry.guns[i];
      if (gun.gun == gunId)
        return gun;
    }
    return false;
  },
  shoot: function () {
    let gun = GunRegistry.getGun(Player.getCarriedItem().id);
    let coords = Entity.getPosition(Player.get());
    let lookAngle = Entity.getLookAngle(Player.get());
    let velocity = {
      x: -Math.sin(lookAngle.yaw) * gun.speed,
      y: Math.sin(lookAngle.pitch) * gun.speed,
      z: Math.cos(lookAngle.yaw) * gun.speed
    }
    let entity = Entity.spawn(coords.x, coords.y, coords.z, 80);
    GunRegistry.bullets.push({
      entity: entity,
      damage: gun.damage
    });
    Entity.setSkin(entity, gun.skin);
    Entity.setVelocity(entity, velocity.x, velocity.y, velocity.z);
  },
  runAnim: function(gun) {
    if(PlayerInventory.haveItem(gun.bullet)){
      gun.state++;
      if (gun.state == gun.variations) {
        gun.state = 0;
        if (PlayerInventory.retrieveItem(gun.bullet)) {
          GunRegistry.shoot();
          PlayerInventory.damageItem(1);
        }
        gun.shooting = false;
      }
    }else{
      gun.shooting = false;
    }
  },
  animatedShoot: function() {
    let gun = GunRegistry.getGun(Player.getCarriedItem().id);
    gun.shooting=true;
  },
  showAim: function (gun) {
    if (GunRegistry.aimShown || !GunRegistry.inGame) return;
    runAsUI(function () {
      GunRegistry.aimShown = true;
      GunRegistry.aimImage.setImageBitmap(gun.aim);
      GunRegistry.windowAim.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
    });
  },
  hideAim: function () {
    if (!GunRegistry.aimShown) return;
    runAsUI(function () {
      GunRegistry.windowAim.dismiss();
      GunRegistry.aimShown = false;
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
      Entity.remove(projectile);
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

Callback.addCallback("tick", function () {
  let gun = GunRegistry.getGun(Player.getCarriedItem().id);
  let ticks = World.getThreadTime();
  if (ticks % 4 === 0) {
    if (gun) {
      if (gun != GunRegistry.currentGun) {
        GunRegistry.currentGun = gun;
        GunRegistry.hideAim();
      }
      if(gun.shooting){
        runAsUI(function () { GunRegistry.runAnim(gun) });
        }
      GunRegistry.showAim(gun);
    } else {
      GunRegistry.hideAim();
    }
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