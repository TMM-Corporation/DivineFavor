/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 9
*/



// file: header.js

importLib("CIM", '*');
IMPORT("NativeAPI");




// file: Api's/FileApi.js

/*
	(╯°□°）╯︵ ┻━┻
*/
var File = java.io.File;
var FileReader = java.io.FileReader;
var BufferedReader = java.io.BufferedReader;
var FOS = java.io.FileOutputStream;
var String = java.lang.String;
var StringBuilder = java.lang.StringBuilder;
var sdcard = android.os.Environment.getExternalStorageDirectory();
var FileAPI={
	getName: function(dir){
		let name = new File(dir).name;
		return(name.replace('.png', ''));
	},
	select:function(dir,Name){
		return (new File(dir,Name));
	},
	createNewDir:function(dir, newDirName){
		return (new File(dir, newDirName).mkdir());
	},
	exists:function(file){
		return file.exist();
	},
	create:function(path, name){
		new File(path, name).createNewFile();
		return File;
	},
	deleteF:function(path){
		try{var filed = new java.io.File(path);
			if(filed.isDirectory()){
			var directoryFiles = filed.listFiles();
			for(var i in directoryFiles){
				FileAPI.deleteF(directoryFiles[i].getAbsolutePath());
			}
			filed.deleteF();
		}
			if(filed.isFile()){
			filed.deleteF();}
		}catch(e){
			print(e);
		}
	},
	read:function(selectedFile){
		var readed=(new BufferedReader(new FileReader(selectedFile)));
		var data=new StringBuilder();
		var string;
		while((string=readed.readLine())!=null){
			data.append(string);
			data.append('\n');
		}
		return data.toString();
	},
	readLine:function(selectedFile, line){
		var readT=new FileAPI.read(selectedFile);
		var lineArray=readT.split('\n');
		return lineArray[line-1];
	},
	write:function(selectedFile , text){
		FileAPI.rewrite(selectedFile,(new FileAPI.read(selectedFile)) + text);
	},
	rewrite:function(selectedFile, text){
		var writeFOS = new FOS(selectedFile);
		writeFOS.write(new String(text).getBytes());
	},
	getFilesList:function(path, endsWith){
		var c = [], d = (new java.io.File(path)).listFiles();
		for(var e = 0; e < d.length; e++) {
			var f = d[e];
			f.isDirectory() || endsWith && !f.getName().endsWith(endsWith) || c.push(f.getName())
		}
		return c
	},
	//my
	filesIfIsDirectory:function(path) {
		var files = new java.io.File(path);
		if (files.isDirectory()) {
			return files.listFiles();
		}
	},
	checkDir:function(name){
		for(let i in name){
			if(FileTools.isExists(__dir__+name[i])==false)
			FileAPI.createNewDir(__dir__, name[i]);
		}
	},
	list:function(dir) {
		let list = [];
		for(let i in dir){
			list.push(FileTools.GetListOfFiles(__dir__+dir[i]));
		}
		return list;
	},
	getFilesCount:function(list) {
		let count=0;
		for(let i in list)count++;
		return count;
	},
	getGuiItems: function(gui){
		let count = 0;
		for(let i in gui.elements){
			if(gui.elements[i]!=null){count++;}
		}
		if(count>0)return true; else return false;
	}
};
/*
	┬─┬ノ( º _ ºノ)
*/




// file: Api's/BowRegistry.js

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

var BowRegistry = {
  bows: [],
  bullets: [],
  hurt: [],
  inGame: false,
  registerBow: function (bow) {
    gun.shooting = false;
    BowRegistry.bows.push(bow);
    if (gun.automatic) {
      Item.registerNoTargetUseFunction(gun.bow, BowRegistry.switchShooting);
      Item.registerUseFunction(gun.bow, BowRegistry.switchShooting);
    } else if (gun.bow) {
//      Item.registerNoTargetUseFunction(gun.bow, BowRegistry.aler());
   //   Item.registerUsingReleasedFunction(gun.bow, BowRegistry.aler());
 //     Item.registerUsingCompleteFunction(gun.bow, BowRegistry.aler());
    } else {
      Item.registerNoTargetUseFunction(gun.bow, BowRegistry.shoot);
      Item.registerUseFunction(gun.bow, BowRegistry.shoot);
    }
  },
  aler: function(strings){
  	let bow = BowRegistry.getBow(Player.getCarriedItem().id);
  	if(bow){
	//  	Item.onUsingComplete(gun.bow);
	//      Item.onUseNoTarget(gun.bow);
	   //   Item.onUsingReleased(gun.bow, 100);
	      alert(strings);
      }
  },
  getBow: function (bowId) {
    for (var i in BowRegistry.bows) {
      let bow = BowRegistry.bows[i];
      if (gun.bow == bowId)
        return bow;
    }
    return false;
  },

  switchShooting: function () {
    let bow = BowRegistry.getBow(Player.getCarriedItem().id);
    gun.shooting = !gun.shooting;
  },

  disableShooting: function () {
    for (var i in BowRegistry.bows) {
      BowRegistry.bows[i].shooting = false;
    }
  },



  shoot: function () {
    let bow = BowRegistry.getBow(Player.getCarriedItem().id);
    if (PlayerInventory.retrieveItem(gun.bullet)) {

      let coords = Entity.getPosition(Player.get());
      let lookAngle = Entity.getLookAngle(Player.get());
      let velocity = {
        x: -Math.sin(lookAngle.yaw) * gun.speed,
        y: Math.sin(lookAngle.pitch) * gun.speed,
        z: Math.cos(lookAngle.yaw) * gun.speed
      }

      let entity = Entity.spawn(coords.x, coords.y, coords.z, 80);

      BowRegistry.bullets.push({
        "entity": entity,
        damage: gun.damage
      });
      Entity.setSkin(entity, gun.skin);
      Entity.setVelocity(entity, velocity.x, velocity.y, velocity.z);
      // Item.overrideCurrentIcon("spell_bow_pulling_2", 0);
    }
  },
  runAnim: function(bow) {
    gun.state++;
    Player.setCarriedItem(gun.bow, 1, gun.state);
   // Item.overrideCurrentIcon(gun.texture, gun.state);
    if (gun.state == gun.variations) {
      BowRegistry.shoot();
      gun.state = 0;
      Player.setCarriedItem(gun.bow, 1, 0);
      gun.shooting = false;
    }
  },
  animatedShoot: function() {
    let bow = BowRegistry.getBow(Player.getCarriedItem().id);
    gun.shooting=true;
  },

  showAim: function (bow) {
    if (BowRegistry.aimShown || !BowRegistry.inGame) return;
    runAsUI(function () {
      BowRegistry.aimShown = true;
      BowRegistry.aimImage.setImageBitmap(gun.aim);

      BowRegistry.windowAim.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
    });
    if (gun.fov) {
      // Player.setFov(gun.fov);
    }
  },
  hideAim: function () {
    if (!BowRegistry.aimShown) return;
    runAsUI(function () {
      BowRegistry.windowAim.dismiss();
      BowRegistry.aimShown = false;
      BowRegistry.disableShooting();
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
  BowRegistry.aimImage = new android.widget.ImageView(ctx);
  layoutMain.addView(BowRegistry.aimImage);

  //Popup Window for displaying the staff
  BowRegistry.windowAim = new android.widget.PopupWindow(layoutMain, LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
  BowRegistry.windowAim.setTouchable(false);
  BowRegistry.windowAim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
});


Callback.addCallback("ProjectileHit", function (projectile, item, target) {
  BowRegistry.bullets = BowRegistry.bullets.filter(function (bullet) {
    if (bullet.entity == projectile) {
      // Entity.remove(projectile);
      if (target.entity != -1) {
        BowRegistry.hurt.push({
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
  let bow = BowRegistry.getBow(Player.getCarriedItem().id);
  BowRegistry.hurt = BowRegistry.hurt.filter(function (ent) {
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
  let bow = BowRegistry.getBow(Player.getCarriedItem().id);
  let ticks = World.getThreadTime();
  if (ticks % 4 === 0) {
    if (bow) {
      if (bow != BowRegistry.currentBow) {
        BowRegistry.currentBow = bow;
        BowRegistry.hideAim();
      }
      if(gun.shooting){
        	runAsUI(function(){BowRegistry.runAnim(bow);});
        }
      BowRegistry.showAim(bow);
    } else {
      BowRegistry.hideAim();
    }
  }
  if (bow && gun.automatic && gun.shooting && ticks % gun.automatic === 15) {
    BowRegistry.shoot();
  }
});


Callback.addCallback("NativeGuiChanged", function (screenName) {
  if (screenName == "hud_screen" ||
    screenName == "in_game_play_screen") {
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




// file: mod/gui/guis.js

var pouch = new UI.StandartWindow({
	standart: {header: {text: {text: "Ritual pouch"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 490, y: 270, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_1": {type: "slot", x: 550, y: 270, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_2": {type: "slot", x: 610, y: 270, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_3": {type: "slot", x: 550, y: 210, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_4": {type: "slot", x: 490, y: 150, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_5": {type: "slot", x: 550, y: 150, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
		"slot_6": {type: "slot", x: 610, y: 150, size: 60, visual: false, bitmap: "custom.slot_default",  needClean: true, isTransparentBackground: true},
	}
});




// file: mod/gui/reg.js

CIM.reg(ItemID.ritual_pouch, {gui: pouch});




// file: mod/items.js

IDRegistry.genItemID("charcoal_blend");
Item.createItem("charcoal_blend", "Charcoal blend", {name: "charcoal_blend"}, {stack: 64});

IDRegistry.genItemID("ender_pearl_blend");
Item.createItem("ender_pearl_blend", "Ender pearl blend", {name: "ender_pearl_blend"}, {stack: 64});

IDRegistry.genItemID("ethereal_goo_blend");
Item.createItem("ethereal_goo_blend", "Ethereal goo blend", {name: "ethereal_goo_blend"}, {stack: 64});

IDRegistry.genItemID("feathers_blend");
Item.createItem("feathers_blend", "Feathers blend", {name: "feathers_blend"}, {stack: 64});

IDRegistry.genItemID("fleshy_blend");
Item.createItem("fleshy_blend", "Fleshy blend", {name: "fleshy_blend"}, {stack: 64});

IDRegistry.genItemID("flint_blend");
Item.createItem("flint_blend", "Flint blend", {name: "flint_blend"}, {stack: 64});

IDRegistry.genItemID("lapis_blend");
Item.createItem("lapis_blend", "Lapis blend", {name: "lapis_blend"}, {stack: 64});

IDRegistry.genItemID("redstone_blend");
Item.createItem("redstone_blend", "Redstone blend", {name: "redstone_blend"}, {stack: 64});

IDRegistry.genItemID("snow_blend");
Item.createItem("snow_blend", "Snow blend", {name: "snow_blend"}, {stack: 64});

IDRegistry.genItemID("wood_blend");
Item.createItem("wood_blend", "Wood blend", {name: "wood_blend"}, {stack: 64});

IDRegistry.genItemID("ice_arrow");
Item.createItem("ice_arrow", "Ice arrow", {name: "ice_arrow"}, {stack: 1});

IDRegistry.genItemID("memory_drop");
Item.createItem("memory_drop", "Memory drop", {name: "memory_drop"}, {stack: 1});

IDRegistry.genItemID("blade_green");
Item.createItem("blade_green", "Green Spell blade", {name: "blade_green"}, {stack: 1});

IDRegistry.genItemID("blade_red");
Item.createItem("blade_red", "Red Spell blade", {name: "blade_red"}, {stack: 1});

IDRegistry.genItemID("pick_blue");
Item.createItem("pick_blue", "Blue Spell pickaxe", {name: "pick_blue"}, {stack: 1});

IDRegistry.genItemID("pick_orange");
Item.createItem("pick_orange", "Orange Spell pickaxe", {name: "pick_orange"}, {stack: 1});

IDRegistry.genItemID("banishing_wand");
Item.createItem("banishing_wand", "Banishing wand", {name: "banishing_wand"}, {stack: 1});

IDRegistry.genItemID("paint");
Item.createItem("paint", "Paint Ethereal Brush", {name: "paint"}, {stack: 1});

IDRegistry.genItemID("big_vial");
Item.createItem("big_vial", "Goo vial", {name: "big_vial"}, {stack: 1});
Item.registerIconOverrideFunction(ItemID.big_vial, function (item, name) {
  return {name: "big_vial", meta: item.data}
});
IDRegistry.genItemID("medium_vial");
Item.createItem("medium_vial", "Goo vial", {name: "medium_vial"}, {stack: 1});
Item.registerIconOverrideFunction(ItemID.medium_vial, function (item, name) {
  return {name: "medium_vial", meta: item.data}
});

IDRegistry.genItemID("small_vial");
Item.createItem("small_vial", "Goo vial", {name: "small_vial"}, {stack: 1});
Item.registerIconOverrideFunction(ItemID.small_vial, function (item, name) {
  return {name: "small_vial", meta: item.data}
});

IDRegistry.genItemID("mystic_architect_stick");
Item.createItem("mystic_architect_stick", "Mystic architect stick", {name: "mystic_architect_stick"}, {stack: 1});

IDRegistry.genItemID("contract_binder");
Item.createItem("contract_binder", "Contract binder", {name: "contract_binder"}, {stack: 1});

IDRegistry.genItemID("grimoire");
Item.createItem("grimoire", "Grimoire", {name: "grimoire"}, {stack: 1});

IDRegistry.genItemID("memory_pouch");
Item.createItem("memory_pouch", "Memory pouch", {name: "memory_pouch"}, {stack: 1});


IDRegistry.genItemID("capacity_major");
Item.createItem("capacity_major", "Capacity major contract", {name: "capacity_major"}, {stack: 1});

IDRegistry.genItemID("capacity_minor");
Item.createItem("capacity_minor", "Capacity minor contract", {name: "capacity_minor"}, {stack: 1});

IDRegistry.genItemID("creative");
Item.createItem("creative", "Creative contract", {name: "creative"}, {stack: 1});

IDRegistry.genItemID("inform");
Item.createItem("inform", "Inform contract", {name: "inform"}, {stack: 1});

IDRegistry.genItemID("regen_major");
Item.createItem("regen_major", "Regen major contract", {name: "regen_major"}, {stack: 1});

IDRegistry.genItemID("regen_minor");
Item.createItem("regen_minor", "Regen minor contract", {name: "regen_minor"}, {stack: 1});

IDRegistry.genItemID("barrier");
Item.createItem("barrier", "Barrier rope", {name: "barrier"}, {stack: 1});

IDRegistry.genItemID("explosive");
Item.createItem("explosive", "Explosive rope", {name: "explosive"}, {stack: 1});

IDRegistry.genItemID("glowing");
Item.createItem("glowing", "Glowing rope", {name: "glowing"}, {stack: 1});

IDRegistry.genItemID("guide");
Item.createItem("guide", "Guide rope", {name: "guide"}, {stack: 1});

IDRegistry.genItemID("inert");
Item.createItem("inert", "Inert rope", {name: "inert"}, {stack: 1});

IDRegistry.genItemID("luminous");
Item.createItem("luminous", "Luminous rope", {name: "luminous"}, {stack: 1});

IDRegistry.genItemID("teleporting");
Item.createItem("teleporting", "Teleporting rope", {name: "teleporting"}, {stack: 1});

IDRegistry.genItemID("milky_apple");
Item.createItem("milky_apple", "Milky apple", {name: "milky_apple"}, {stack: 1});

IDRegistry.genItemID("ritual_pouch");
Item.createItem("ritual_pouch", "Ritual pouch", {name: "ritual_pouch"}, {stack: 1});

IDRegistry.genItemID("stone_ball");
Item.createItem("stone_ball", "Stone ball", {name: "stone_ball"}, {stack: 1});


IDRegistry.genItemID("arbow_wishing_stone");
Item.createItem("arbow_wishing_stone", "Arbow Wishing stone", {name: "arbow_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("blizrabi_wishing_stone");
Item.createItem("blizrabi_wishing_stone", "Blizrabi Wishing stone", {name: "blizrabi_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("endererer_wishing_stone");
Item.createItem("endererer_wishing_stone", "Endererer Wishing stone", {name: "endererer_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("loon_wishing_stone");
Item.createItem("loon_wishing_stone", "Loon Wishing stone", {name: "loon_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("materia_wishing_stone");
Item.createItem("materia_wishing_stone", "Materia Wishing stone", {name: "materia_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("neblaze_wishing_stone");
Item.createItem("neblaze_wishing_stone", "Neblaze Wishing stone", {name: "neblaze_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("redwind_wishing_stone");
Item.createItem("redwind_wishing_stone", "Redwind Wishing stone", {name: "redwind_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("romol_wishing_stone");
Item.createItem("romol_wishing_stone", "Romol Wishing stone", {name: "romol_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("squarefury_wishing_stone");
Item.createItem("squarefury_wishing_stone", "Squarefury Wishing stone", {name: "squarefury_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("timber_wishing_stone");
Item.createItem("timber_wishing_stone", "Timber Wishing stone", {name: "timber_wishing_stone"}, {stack: 1});

IDRegistry.genItemID("roots");
Item.createItem("roots", "Roots Cursed Arrow", {name: "roots"}, {stack: 1});

IDRegistry.genItemID("armor_of_pacifist");
Item.createItem("armor_of_pacifist", "Armor of pacifist Spell talisman", {name: "armor_of_pacifist"}, {stack: 1});

IDRegistry.genItemID("arrow_deflection");
Item.createItem("arrow_deflection", "Arrow deflection Spell talisman", {name: "arrow_deflection"}, {stack: 1});

IDRegistry.genItemID("arrow_throw");
Item.createItem("arrow_throw", "Arrow throw Spell talisman", {name: "arrow_throw"}, {stack: 1});

IDRegistry.genItemID("bind_ice_arrows");
Item.createItem("bind_ice_arrows", "Bind ice arrows Spell talisman", {name: "bind_ice_arrows"}, {stack: 1});

IDRegistry.genItemID("blade_of_grass");
Item.createItem("blade_of_grass", "Blade of grass Spell talisman", {name: "blade_of_grass"}, {stack: 1});

IDRegistry.genItemID("blazing_palm");
Item.createItem("blazing_palm", "Blazing palm Spell talisman", {name: "blazing_palm"}, {stack: 1});

IDRegistry.genItemID("blink");
Item.createItem("blink", "Blink Spell talisman", {name: "blink"}, {stack: 1});

IDRegistry.genItemID("blood_of_grass");
Item.createItem("blood_of_grass", "Blood of grass Spell talisman", {name: "blood_of_grass"}, {stack: 1});

IDRegistry.genItemID("bonemeal");
Item.createItem("bonemeal", "Bonemeal Spell talisman", {name: "bonemeal"}, {stack: 1});

IDRegistry.genItemID("build_block_relative");
Item.createItem("build_block_relative", "Build block relative Spell talisman", {name: "build_block_relative"}, {stack: 1});

IDRegistry.genItemID("build_column");
Item.createItem("build_column", "Build column Spell talisman", {name: "build_column"}, {stack: 1});

IDRegistry.genItemID("build_cylinder");
Item.createItem("build_cylinder", "Build cylinder Spell talisman", {name: "build_cylinder"}, {stack: 1});

IDRegistry.genItemID("build_extrusion");
Item.createItem("build_extrusion", "Build extrusion Spell talisman", {name: "build_extrusion"}, {stack: 1});

IDRegistry.genItemID("build_floor");
Item.createItem("build_floor", "Build floor Spell talisman", {name: "build_floor"}, {stack: 1});

IDRegistry.genItemID("build_from_surface");
Item.createItem("build_from_surface", "Build from surface Spell talisman", {name: "build_from_surface"}, {stack: 1});

IDRegistry.genItemID("build_hollow_sphere");
Item.createItem("build_hollow_sphere", "Build hollow sphere Spell talisman", {name: "build_hollow_sphere"}, {stack: 1});

IDRegistry.genItemID("build_horizontal_line");
Item.createItem("build_horizontal_line", "Build horizontal line Spell talisman", {name: "build_horizontal_line"}, {stack: 1});

IDRegistry.genItemID("build_sphere");
Item.createItem("build_sphere", "Build sphere Spell talisman", {name: "build_sphere"}, {stack: 1});

IDRegistry.genItemID("build_square_floor");
Item.createItem("build_square_floor", "Build square floor Spell talisman", {name: "build_square_floor"}, {stack: 1});

IDRegistry.genItemID("build_square_wall");
Item.createItem("build_square_wall", "Build square wall Spell talisman", {name: "build_square_wall"}, {stack: 1});

IDRegistry.genItemID("build_template");
Item.createItem("build_template", "Build template Spell talisman", {name: "build_template"}, {stack: 1});

IDRegistry.genItemID("build_wall");
Item.createItem("build_wall", "Build wall Spell talisman", {name: "build_wall"}, {stack: 1});

IDRegistry.genItemID("clock");
Item.createItem("clock", "Clock Spell talisman", {name: "clock"}, {stack: 1});

IDRegistry.genItemID("combustion");
Item.createItem("combustion", "Combustion Spell talisman", {name: "combustion"}, {stack: 1});

IDRegistry.genItemID("consuming_fury");
Item.createItem("consuming_fury", "Consuming fury Spell talisman", {name: "consuming_fury"}, {stack: 1});

IDRegistry.genItemID("copy_area");
Item.createItem("copy_area", "Copy area Spell talisman", {name: "copy_area"}, {stack: 1});

IDRegistry.genItemID("copy_blocks");
Item.createItem("copy_blocks", "Copy blocks Spell talisman", {name: "copy_blocks"}, {stack: 1});

IDRegistry.genItemID("copy_cuboid");
Item.createItem("copy_cuboid", "Copy cuboid Spell talisman", {name: "copy_cuboid"}, {stack: 1});

IDRegistry.genItemID("crushing_palm");
Item.createItem("crushing_palm", "Crushing palm Spell talisman", {name: "crushing_palm"}, {stack: 1});

IDRegistry.genItemID("crystalline_road");
Item.createItem("crystalline_road", "Crystalline road Spell talisman", {name: "crystalline_road"}, {stack: 1});

IDRegistry.genItemID("crystallize_memory");
Item.createItem("crystallize_memory", "Crystallize memory Spell talisman", {name: "crystallize_memory"}, {stack: 1});

IDRegistry.genItemID("deserialize_memory");
Item.createItem("deserialize_memory", "Deserialize memory Spell talisman", {name: "deserialize_memory"}, {stack: 1});

IDRegistry.genItemID("destroy_cuboid_remotely");
Item.createItem("destroy_cuboid_remotely", "Destroy cuboid remotely Spell talisman", {name: "destroy_cuboid_remotely"}, {stack: 1});

IDRegistry.genItemID("distant_spark");
Item.createItem("distant_spark", "Distant spark Spell talisman", {name: "distant_spark"}, {stack: 1});

IDRegistry.genItemID("earthen_dive");
Item.createItem("earthen_dive", "Earthen dive Spell talisman", {name: "earthen_dive"}, {stack: 1});

IDRegistry.genItemID("empower_axe");
Item.createItem("empower_axe", "Empower axe Spell talisman", {name: "empower_axe"}, {stack: 1});

IDRegistry.genItemID("empower_pickaxe");
Item.createItem("empower_pickaxe", "Empower pickaxe Spell talisman", {name: "empower_pickaxe"}, {stack: 1});

IDRegistry.genItemID("ender_pearl");
Item.createItem("ender_pearl", "Ender pearl Spell talisman", {name: "ender_pearl"}, {stack: 1});

IDRegistry.genItemID("escape_plan");
Item.createItem("escape_plan", "Escape plan Spell talisman", {name: "escape_plan"}, {stack: 1});

IDRegistry.genItemID("ethereal_flash");
Item.createItem("ethereal_flash", "Ethereal flash Spell talisman", {name: "ethereal_flash"}, {stack: 1});

IDRegistry.genItemID("ethereal_light");
Item.createItem("ethereal_light", "Ethereal light Spell talisman", {name: "ethereal_light"}, {stack: 1});

IDRegistry.genItemID("evil_eye");
Item.createItem("evil_eye", "Evil eye Spell talisman", {name: "evil_eye"}, {stack: 1});

IDRegistry.genItemID("extreme_buoyancy");
Item.createItem("extreme_buoyancy", "Extreme buoyancy Spell talisman", {name: "extreme_buoyancy"}, {stack: 1});

IDRegistry.genItemID("fall_negation");
Item.createItem("fall_negation", "Fall negation Spell talisman", {name: "fall_negation"}, {stack: 1});

IDRegistry.genItemID("fins");
Item.createItem("fins", "Fins Spell talisman", {name: "fins"}, {stack: 1});

IDRegistry.genItemID("flood");
Item.createItem("flood", "Flood Spell talisman", {name: "flood"}, {stack: 1});

IDRegistry.genItemID("focused_fury");
Item.createItem("focused_fury", "Focused fury Spell talisman", {name: "focused_fury"}, {stack: 1});

IDRegistry.genItemID("follow");
Item.createItem("follow", "Follow Spell talisman", {name: "follow"}, {stack: 1});

IDRegistry.genItemID("frost_wave");
Item.createItem("frost_wave", "Frost wave Spell talisman", {name: "frost_wave"}, {stack: 1});

IDRegistry.genItemID("gills");
Item.createItem("gills", "Gills Spell talisman", {name: "gills"}, {stack: 1});

IDRegistry.genItemID("green_cycle");
Item.createItem("green_cycle", "Green cycle Spell talisman", {name: "green_cycle"}, {stack: 1});

IDRegistry.genItemID("ground_flow");
Item.createItem("ground_flow", "Ground flow Spell talisman", {name: "ground_flow"}, {stack: 1});

IDRegistry.genItemID("grudge");
Item.createItem("grudge", "Grudge Spell talisman", {name: "grudge"}, {stack: 1});

IDRegistry.genItemID("harvest");
Item.createItem("harvest", "Harvest Spell talisman", {name: "harvest"}, {stack: 1});

IDRegistry.genItemID("heat_wave");
Item.createItem("heat_wave", "Heat wave Spell talisman", {name: "heat_wave"}, {stack: 1});

IDRegistry.genItemID("hellisphere");
Item.createItem("hellisphere", "Hellisphere Spell talisman", {name: "hellisphere"}, {stack: 1});

IDRegistry.genItemID("hovering");
Item.createItem("hovering", "Hovering Spell talisman", {name: "hovering"}, {stack: 1});

IDRegistry.genItemID("ice_bubble");
Item.createItem("ice_bubble", "Ice bubble Spell talisman", {name: "ice_bubble"}, {stack: 1});

IDRegistry.genItemID("ice_carving");
Item.createItem("ice_carving", "Ice carving Spell talisman", {name: "ice_carving"}, {stack: 1});

IDRegistry.genItemID("ice_surface");
Item.createItem("ice_surface", "Ice surface Spell talisman", {name: "ice_surface"}, {stack: 1});

IDRegistry.genItemID("ignition");
Item.createItem("ignition", "Ignition Spell talisman", {name: "ignition"}, {stack: 1});

IDRegistry.genItemID("infernal_touch");
Item.createItem("infernal_touch", "Infernal touch Spell talisman", {name: "infernal_touch"}, {stack: 1});

IDRegistry.genItemID("instant_dive");
Item.createItem("instant_dive", "Instant dive Spell talisman", {name: "instant_dive"}, {stack: 1});

IDRegistry.genItemID("invite_gem");
Item.createItem("invite_gem", "Invite gem Spell talisman", {name: "invite_gem"}, {stack: 1});

IDRegistry.genItemID("invite_pebble");
Item.createItem("invite_pebble", "Invite pebble Spell talisman", {name: "invite_pebble"}, {stack: 1});

IDRegistry.genItemID("lake_thawing");
Item.createItem("lake_thawing", "Lake thawing Spell talisman", {name: "lake_thawing"}, {stack: 1});

IDRegistry.genItemID("miners_focus");
Item.createItem("miners_focus", "Miners focus Spell talisman", {name: "miners_focus"}, {stack: 1});

IDRegistry.genItemID("mist_blade");
Item.createItem("mist_blade", "Mist blade Spell talisman", {name: "mist_blade"}, {stack: 1});

IDRegistry.genItemID("molten_skin");
Item.createItem("molten_skin", "Molten skin Spell talisman", {name: "molten_skin"}, {stack: 1});

IDRegistry.genItemID("nether_surge");
Item.createItem("nether_surge", "Nether surge Spell talisman", {name: "nether_surge"}, {stack: 1});

IDRegistry.genItemID("night_eye");
Item.createItem("night_eye", "Night eye Spell talisman", {name: "night_eye"}, {stack: 1});

IDRegistry.genItemID("obsidian_bubble");
Item.createItem("obsidian_bubble", "Obsidian bubble Spell talisman", {name: "obsidian_bubble"}, {stack: 1});

IDRegistry.genItemID("obsidian_road");
Item.createItem("obsidian_road", "Obsidian road Spell talisman", {name: "obsidian_road"}, {stack: 1});

IDRegistry.genItemID("overblink");
Item.createItem("overblink", "Overblink Spell talisman", {name: "overblink"}, {stack: 1});

IDRegistry.genItemID("overwarp");
Item.createItem("overwarp", "Overwarp Spell talisman", {name: "overwarp"}, {stack: 1});

IDRegistry.genItemID("pearl_crumbs");
Item.createItem("pearl_crumbs", "Pearl crumbs Spell talisman", {name: "pearl_crumbs"}, {stack: 1});

IDRegistry.genItemID("piercing_inferno");
Item.createItem("piercing_inferno", "Piercing inferno Spell talisman", {name: "piercing_inferno"}, {stack: 1});

IDRegistry.genItemID("ping");
Item.createItem("ping", "Ping Spell talisman", {name: "ping"}, {stack: 1});

IDRegistry.genItemID("place_block");
Item.createItem("place_block", "Place block Spell talisman", {name: "place_block"}, {stack: 1});

IDRegistry.genItemID("place_torch");
Item.createItem("place_torch", "Place torch Spell talisman", {name: "place_torch"}, {stack: 1});

IDRegistry.genItemID("prismatic_eyes");
Item.createItem("prismatic_eyes", "Prismatic eyes Spell talisman", {name: "prismatic_eyes"}, {stack: 1});

IDRegistry.genItemID("pull_side");
Item.createItem("pull_side", "Pull side Spell talisman", {name: "pull_side"}, {stack: 1});

IDRegistry.genItemID("push_side");
Item.createItem("push_side", "Push side Spell talisman", {name: "push_side"}, {stack: 1});

IDRegistry.genItemID("red_pulse");
Item.createItem("red_pulse", "Red pulse Spell talisman", {name: "red_pulse"}, {stack: 1});

IDRegistry.genItemID("red_signal");
Item.createItem("red_signal", "Red signal Spell talisman", {name: "red_signal"}, {stack: 1});

IDRegistry.genItemID("redo");
Item.createItem("redo", "Redo Spell talisman", {name: "redo"}, {stack: 1});

IDRegistry.genItemID("remote_chest");
Item.createItem("remote_chest", "Remote chest Spell talisman", {name: "remote_chest"}, {stack: 1});

IDRegistry.genItemID("replace_blocks");
Item.createItem("replace_blocks", "Replace blocks Spell talisman", {name: "replace_blocks"}, {stack: 1});

IDRegistry.genItemID("replace_cuboid");
Item.createItem("replace_cuboid", "Replace cuboid Spell talisman", {name: "replace_cuboid"}, {stack: 1});

IDRegistry.genItemID("replace_side");
Item.createItem("replace_side", "Replace side Spell talisman", {name: "replace_side"}, {stack: 1});

IDRegistry.genItemID("replace_surface");
Item.createItem("replace_surface", "Replace surface Spell talisman", {name: "replace_surface"}, {stack: 1});

IDRegistry.genItemID("rotten_might");
Item.createItem("rotten_might", "Rotten might Spell talisman", {name: "rotten_might"}, {stack: 1});

IDRegistry.genItemID("searing_pulse");
Item.createItem("searing_pulse", "Searing pulse Spell talisman", {name: "searing_pulse"}, {stack: 1});

IDRegistry.genItemID("serialize_memory");
Item.createItem("serialize_memory", "Serialize memory Spell talisman", {name: "serialize_memory"}, {stack: 1});

IDRegistry.genItemID("small_fireball_throw");
Item.createItem("small_fireball_throw", "Small fireball throw Spell talisman", {name: "small_fireball_throw"}, {stack: 1});

IDRegistry.genItemID("snowball_throw");
Item.createItem("snowball_throw", "Snowball throw Spell talisman", {name: "snowball_throw"}, {stack: 1});

IDRegistry.genItemID("spider_might");
Item.createItem("spider_might", "Spider might Spell talisman", {name: "spider_might"}, {stack: 1});

IDRegistry.genItemID("starvation");
Item.createItem("starvation", "Starvation Spell talisman", {name: "starvation"}, {stack: 1});

IDRegistry.genItemID("stone_fever");
Item.createItem("stone_fever", "Stone fever Spell talisman", {name: "stone_fever"}, {stack: 1});

IDRegistry.genItemID("stoneball_throw");
Item.createItem("stoneball_throw", "Stoneball throw Spell talisman", {name: "stoneball_throw"}, {stack: 1});

IDRegistry.genItemID("summon_blaze");
Item.createItem("summon_blaze", "Summon blaze Spell talisman", {name: "summon_blaze"}, {stack: 1});

IDRegistry.genItemID("summon_cave_spider");
Item.createItem("summon_cave_spider", "Summon cave spider Spell talisman", {name: "summon_cave_spider"}, {stack: 1});

IDRegistry.genItemID("summon_creeper");
Item.createItem("summon_creeper", "Summon creeper Spell talisman", {name: "summon_creeper"}, {stack: 1});

IDRegistry.genItemID("summon_husk");
Item.createItem("summon_husk", "Summon husk Spell talisman", {name: "summon_husk"}, {stack: 1});

IDRegistry.genItemID("summon_skeleton");
Item.createItem("summon_skeleton", "Summon skeleton Spell talisman", {name: "summon_skeleton"}, {stack: 1});

IDRegistry.genItemID("summon_spider");
Item.createItem("summon_spider", "Summon spider Spell talisman", {name: "summon_spider"}, {stack: 1});

IDRegistry.genItemID("summon_stray");
Item.createItem("summon_stray", "Summon stray Spell talisman", {name: "summon_stray"}, {stack: 1});

IDRegistry.genItemID("summon_zombie");
Item.createItem("summon_zombie", "Summon zombie Spell talisman", {name: "summon_zombie"}, {stack: 1});

IDRegistry.genItemID("surface_blink");
Item.createItem("surface_blink", "Surface blink Spell talisman", {name: "surface_blink"}, {stack: 1});

IDRegistry.genItemID("surface_shift");
Item.createItem("surface_shift", "Surface shift Spell talisman", {name: "surface_shift"}, {stack: 1});

IDRegistry.genItemID("target");
Item.createItem("target", "Target Spell talisman", {name: "target"}, {stack: 1});

IDRegistry.genItemID("tell_time");
Item.createItem("tell_time", "Tell time Spell talisman", {name: "tell_time"}, {stack: 1});

IDRegistry.genItemID("toadic_jump");
Item.createItem("toadic_jump", "Toadic jump Spell talisman", {name: "toadic_jump"}, {stack: 1});

IDRegistry.genItemID("undo");
Item.createItem("undo", "Undo Spell talisman", {name: "undo"}, {stack: 1});

IDRegistry.genItemID("vitalize");
Item.createItem("vitalize", "Vitalize Spell talisman", {name: "vitalize"}, {stack: 1});

IDRegistry.genItemID("wall_slip");
Item.createItem("wall_slip", "Wall slip Spell talisman", {name: "wall_slip"}, {stack: 1});

IDRegistry.genItemID("warp");
Item.createItem("warp", "Warp Spell talisman", {name: "warp"}, {stack: 1});

IDRegistry.genItemID("warp_gem");
Item.createItem("warp_gem", "Warp gem Spell talisman", {name: "warp_gem"}, {stack: 1});

IDRegistry.genItemID("warp_pebble");
Item.createItem("warp_pebble", "Warp pebble Spell talisman", {name: "warp_pebble"}, {stack: 1});

IDRegistry.genItemID("wild_sprint");
Item.createItem("wild_sprint", "Wild sprint Spell talisman", {name: "wild_sprint"}, {stack: 1});

IDRegistry.genItemID("wind_step");
Item.createItem("wind_step", "Wind step Spell talisman", {name: "wind_step"}, {stack: 1});

IDRegistry.genItemID("winter_breath");
Item.createItem("winter_breath", "Winter breath Spell talisman", {name: "winter_breath"}, {stack: 1});

IDRegistry.genItemID("wooden_punch");
Item.createItem("wooden_punch", "Wooden punch Spell talisman", {name: "wooden_punch"}, {stack: 1});

IDRegistry.genItemID("blade_of_snow");
Item.createItem("blade_of_snow", "Blade of snow Blade Talisman", {name: "blade_of_snow"}, {stack: 1});

IDRegistry.genItemID("butchering_strike");
Item.createItem("butchering_strike", "Butchering strike Blade Talisman", {name: "butchering_strike"}, {stack: 1});

IDRegistry.genItemID("confusion");
Item.createItem("confusion", "Confusion Blade Talisman", {name: "confusion"}, {stack: 1});

IDRegistry.genItemID("corrosion");
Item.createItem("corrosion", "Corrosion Blade Talisman", {name: "corrosion"}, {stack: 1});

IDRegistry.genItemID("crawling_mist");
Item.createItem("crawling_mist", "Crawling mist Blade Talisman", {name: "crawling_mist"}, {stack: 1});

IDRegistry.genItemID("fiery_mark");
Item.createItem("fiery_mark", "Fiery mark Blade Talisman", {name: "fiery_mark"}, {stack: 1});

IDRegistry.genItemID("fill_lungs");
Item.createItem("fill_lungs", "Fill lungs Blade Talisman", {name: "fill_lungs"}, {stack: 1});

IDRegistry.genItemID("gamble");
Item.createItem("gamble", "Gamble Blade Talisman", {name: "gamble"}, {stack: 1});

IDRegistry.genItemID("hand_swap");
Item.createItem("hand_swap", "Hand swap Blade Talisman", {name: "hand_swap"}, {stack: 1});

IDRegistry.genItemID("heavy_blade");
Item.createItem("heavy_blade", "Heavy blade Blade Talisman", {name: "heavy_blade"}, {stack: 1});

IDRegistry.genItemID("holy_blade");
Item.createItem("holy_blade", "Holy blade Blade Talisman", {name: "holy_blade"}, {stack: 1});

IDRegistry.genItemID("hungry_blade");
Item.createItem("hungry_blade", "Hungry blade Blade Talisman", {name: "hungry_blade"}, {stack: 1});

IDRegistry.genItemID("inflame");
Item.createItem("inflame", "Inflame Blade Talisman", {name: "inflame"}, {stack: 1});

IDRegistry.genItemID("lucky");
Item.createItem("lucky", "Lucky Blade Talisman", {name: "lucky"}, {stack: 1});

IDRegistry.genItemID("lucky_strike");
Item.createItem("lucky_strike", "Lucky strike Blade Talisman", {name: "lucky_strike"}, {stack: 1});

IDRegistry.genItemID("memory_blade");
Item.createItem("memory_blade", "Memory blade Blade Talisman", {name: "memory_blade"}, {stack: 1});

IDRegistry.genItemID("obliteration");
Item.createItem("obliteration", "Obliteration Blade Talisman", {name: "obliteration"}, {stack: 1});

IDRegistry.genItemID("poison_coating");
Item.createItem("poison_coating", "Poison coating Blade Talisman", {name: "poison_coating"}, {stack: 1});

IDRegistry.genItemID("rain_sword");
Item.createItem("rain_sword", "Rain sword Blade Talisman", {name: "rain_sword"}, {stack: 1});

IDRegistry.genItemID("skyfall");
Item.createItem("skyfall", "Skyfall Blade Talisman", {name: "skyfall"}, {stack: 1});

IDRegistry.genItemID("suffocating_fumes");
Item.createItem("suffocating_fumes", "Suffocating fumes Blade Talisman", {name: "suffocating_fumes"}, {stack: 1});

IDRegistry.genItemID("temp");
Item.createItem("temp", "Temp Blade Talisman", {name: "temp"}, {stack: 1});

IDRegistry.genItemID("vengeful_blade");
Item.createItem("vengeful_blade", "Vengeful blade Blade Talisman", {name: "vengeful_blade"}, {stack: 1});

IDRegistry.genItemID("wind_leash");
Item.createItem("wind_leash", "Wind leash Blade Talisman", {name: "wind_leash"}, {stack: 1});

IDRegistry.genItemID("wither_coating");
Item.createItem("wither_coating", "Wither coating Blade Talisman", {name: "wither_coating"}, {stack: 1});

IDRegistry.genItemID("yummy_smell");
Item.createItem("yummy_smell", "Yummy smell Blade Talisman", {name: "yummy_smell"}, {stack: 1});

IDRegistry.genItemID("book_green");
Item.createItem("book_green", "Book green Spell blade", {name: "book_green"}, {stack: 1});

IDRegistry.genItemID("book_red");
Item.createItem("book_red", "Book red Spell blade", {name: "book_red"}, {stack: 1});

IDRegistry.genItemID("spell_bow_book");
Item.createItem("spell_bow_book", "Spell bow book", {name: "spell_bow_book"}, {stack: 1});

IDRegistry.genItemID("arbow_calling_stone");
Item.createItem("arbow_calling_stone", "Arbow Calling Stone", {name: "arbow_calling_stone"}, {stack: 1});

IDRegistry.genItemID("blizrabi_calling_stone");
Item.createItem("blizrabi_calling_stone", "Blizrabi Calling Stone", {name: "blizrabi_calling_stone"}, {stack: 1});

IDRegistry.genItemID("endererer_calling_stone");
Item.createItem("endererer_calling_stone", "Endererer Calling Stone", {name: "endererer_calling_stone"}, {stack: 1});

IDRegistry.genItemID("loon_calling_stone");
Item.createItem("loon_calling_stone", "Loon Calling Stone", {name: "loon_calling_stone"}, {stack: 1});

IDRegistry.genItemID("materia_calling_stone");
Item.createItem("materia_calling_stone", "Materia Calling Stone", {name: "materia_calling_stone"}, {stack: 1});

IDRegistry.genItemID("neblaze_calling_stone");
Item.createItem("neblaze_calling_stone", "Neblaze Calling Stone", {name: "neblaze_calling_stone"}, {stack: 1});

IDRegistry.genItemID("redwind_calling_stone");
Item.createItem("redwind_calling_stone", "Redwind Calling Stone", {name: "redwind_calling_stone"}, {stack: 1});

IDRegistry.genItemID("romol_calling_stone");
Item.createItem("romol_calling_stone", "Romol Calling Stone", {name: "romol_calling_stone"}, {stack: 1});

IDRegistry.genItemID("squarefury_calling_stone");
Item.createItem("squarefury_calling_stone", "Squarefury Calling Stone", {name: "squarefury_calling_stone"}, {stack: 1});

IDRegistry.genItemID("timber_calling_stone");
Item.createItem("timber_calling_stone", "Timber Calling Stone", {name: "timber_calling_stone"}, {stack: 1});

IDRegistry.genItemID("aquatic");
Item.createItem("aquatic", "Aquatic Tool talisman", {name: "aquatic"}, {stack: 1});

IDRegistry.genItemID("break_blocks");
Item.createItem("break_blocks", "Break blocks Tool talisman", {name: "break_blocks"}, {stack: 1});

IDRegistry.genItemID("break_radius");
Item.createItem("break_radius", "Break radius Tool talisman", {name: "break_radius"}, {stack: 1});

IDRegistry.genItemID("break_side");
Item.createItem("break_side", "Break side Tool talisman", {name: "break_side"}, {stack: 1});

IDRegistry.genItemID("break_surface");
Item.createItem("break_surface", "Break surface Tool talisman", {name: "break_surface"}, {stack: 1});

IDRegistry.genItemID("destroy_blocks");
Item.createItem("destroy_blocks", "Destroy blocks Tool talisman", {name: "destroy_blocks"}, {stack: 1});

IDRegistry.genItemID("destroy_cuboid");
Item.createItem("destroy_cuboid", "Destroy cuboid Tool talisman", {name: "destroy_cuboid"}, {stack: 1});

IDRegistry.genItemID("destroy_side");
Item.createItem("destroy_side", "Destroy side Tool talisman", {name: "destroy_side"}, {stack: 1});

IDRegistry.genItemID("destroy_surface");
Item.createItem("destroy_surface", "Destroy surface Tool talisman", {name: "destroy_surface"}, {stack: 1});

IDRegistry.genItemID("fell_tree");
Item.createItem("fell_tree", "Fell tree Tool talisman", {name: "fell_tree"}, {stack: 1});

IDRegistry.genItemID("ground_pick");
Item.createItem("ground_pick", "Ground pick Tool talisman", {name: "ground_pick"}, {stack: 1});

IDRegistry.genItemID("ice_carving");
Item.createItem("ice_carving", "Ice carving Tool talisman", {name: "ice_carving"}, {stack: 1});

IDRegistry.genItemID("memory_tool");
Item.createItem("memory_tool", "Memory tool Tool talisman", {name: "memory_tool"}, {stack: 1});

IDRegistry.genItemID("molten_tool");
Item.createItem("molten_tool", "Molten tool Tool talisman", {name: "molten_tool"}, {stack: 1});

IDRegistry.genItemID("obsidian_carving");
Item.createItem("obsidian_carving", "Obsidian carving Tool talisman", {name: "obsidian_carving"}, {stack: 1});

IDRegistry.genItemID("void_tool");
Item.createItem("void_tool", "Void tool Tool talisman", {name: "void_tool"}, {stack: 1});

IDRegistry.genItemID("volcanic_glass_cutter");
Item.createItem("volcanic_glass_cutter", "Volcanic glass cutter Tool talisman", {name: "volcanic_glass_cutter"}, {stack: 1});

IDRegistry.genItemID("wood_peck");
Item.createItem("wood_peck", "Wood peck Tool talisman", {name: "wood_peck"}, {stack: 1});

IDRegistry.genItemID("anti_gravity");
Item.createItem("anti_gravity", "Anti gravity Arrow Talisman", {name: "anti_gravity"}, {stack: 1});

IDRegistry.genItemID("armor_corrosion");
Item.createItem("armor_corrosion", "Armor corrosion Arrow Talisman", {name: "armor_corrosion"}, {stack: 1});

IDRegistry.genItemID("blast");
Item.createItem("blast", "Blast Arrow Talisman", {name: "blast"}, {stack: 1});

IDRegistry.genItemID("blink");
Item.createItem("blink", "Blink Arrow Talisman", {name: "blink"}, {stack: 1});

IDRegistry.genItemID("climbing");
Item.createItem("climbing", "Climbing Arrow Talisman", {name: "climbing"}, {stack: 1});

IDRegistry.genItemID("crawling_mist");
Item.createItem("crawling_mist", "Crawling mist Arrow Talisman", {name: "crawling_mist"}, {stack: 1});

IDRegistry.genItemID("cripple");
Item.createItem("cripple", "Cripple Arrow Talisman", {name: "cripple"}, {stack: 1});

IDRegistry.genItemID("disarm");
Item.createItem("disarm", "Disarm Arrow Talisman", {name: "disarm"}, {stack: 1});

IDRegistry.genItemID("explosive");
Item.createItem("explosive", "Explosive Arrow Talisman", {name: "explosive"}, {stack: 1});

IDRegistry.genItemID("extinguish_fire");
Item.createItem("extinguish_fire", "Extinguish fire Arrow Talisman", {name: "extinguish_fire"}, {stack: 1});

IDRegistry.genItemID("fiery_mark");
Item.createItem("fiery_mark", "Fiery mark Arrow Talisman", {name: "fiery_mark"}, {stack: 1});

IDRegistry.genItemID("fill_lungs");
Item.createItem("fill_lungs", "Fill lungs Arrow Talisman", {name: "fill_lungs"}, {stack: 1});

IDRegistry.genItemID("flak");
Item.createItem("flak", "Flak Arrow Talisman", {name: "flak"}, {stack: 1});

IDRegistry.genItemID("force");
Item.createItem("force", "Force Arrow Talisman", {name: "force"}, {stack: 1});

IDRegistry.genItemID("gamble");
Item.createItem("gamble", "Gamble Arrow Talisman", {name: "gamble"}, {stack: 1});

IDRegistry.genItemID("hand_swap");
Item.createItem("hand_swap", "Hand swap Arrow Talisman", {name: "hand_swap"}, {stack: 1});

IDRegistry.genItemID("high_speed");
Item.createItem("high_speed", "High speed Arrow Talisman", {name: "high_speed"}, {stack: 1});

IDRegistry.genItemID("hollow_leg");
Item.createItem("hollow_leg", "Hollow leg Arrow Talisman", {name: "hollow_leg"}, {stack: 1});

IDRegistry.genItemID("hover_bubble");
Item.createItem("hover_bubble", "Hover bubble Arrow Talisman", {name: "hover_bubble"}, {stack: 1});

IDRegistry.genItemID("hyper_speed");
Item.createItem("hyper_speed", "Hyper speed Arrow Talisman", {name: "hyper_speed"}, {stack: 1});

IDRegistry.genItemID("ice_breaker");
Item.createItem("ice_breaker", "Ice breaker Arrow Talisman", {name: "ice_breaker"}, {stack: 1});

IDRegistry.genItemID("ice_sphere");
Item.createItem("ice_sphere", "Ice sphere Arrow Talisman", {name: "ice_sphere"}, {stack: 1});

IDRegistry.genItemID("impulse");
Item.createItem("impulse", "Impulse Arrow Talisman", {name: "impulse"}, {stack: 1});

IDRegistry.genItemID("incendiary");
Item.createItem("incendiary", "Incendiary Arrow Talisman", {name: "incendiary"}, {stack: 1});

IDRegistry.genItemID("life_steal");
Item.createItem("life_steal", "Life steal Arrow Talisman", {name: "life_steal"}, {stack: 1});

IDRegistry.genItemID("limp_leg");
Item.createItem("limp_leg", "Limp leg Arrow Talisman", {name: "limp_leg"}, {stack: 1});

IDRegistry.genItemID("lucky_arrow");
Item.createItem("lucky_arrow", "Lucky arrow Arrow Talisman", {name: "lucky_arrow"}, {stack: 1});

IDRegistry.genItemID("mine");
Item.createItem("mine", "Mine Arrow Talisman", {name: "mine"}, {stack: 1});

IDRegistry.genItemID("nether_swap");
Item.createItem("nether_swap", "Nether swap Arrow Talisman", {name: "nether_swap"}, {stack: 1});

IDRegistry.genItemID("nuke");
Item.createItem("nuke", "Nuke Arrow Talisman", {name: "nuke"}, {stack: 1});

IDRegistry.genItemID("petrification");
Item.createItem("petrification", "Petrification Arrow Talisman", {name: "petrification"}, {stack: 1});

IDRegistry.genItemID("piercing");
Item.createItem("piercing", "Piercing Arrow Talisman", {name: "piercing"}, {stack: 1});

IDRegistry.genItemID("ricochet");
Item.createItem("ricochet", "Ricochet Arrow Talisman", {name: "ricochet"}, {stack: 1});

IDRegistry.genItemID("roots");
Item.createItem("roots", "Roots Arrow Talisman", {name: "roots"}, {stack: 1});

IDRegistry.genItemID("skybound");
Item.createItem("skybound", "Skybound Arrow Talisman", {name: "skybound"}, {stack: 1});

IDRegistry.genItemID("skyfall");
Item.createItem("skyfall", "Skyfall Arrow Talisman", {name: "skyfall"}, {stack: 1});

IDRegistry.genItemID("sniper");
Item.createItem("sniper", "Sniper Arrow Talisman", {name: "sniper"}, {stack: 1});

IDRegistry.genItemID("spooky");
Item.createItem("spooky", "Spooky Arrow Talisman", {name: "spooky"}, {stack: 1});

IDRegistry.genItemID("stasis");
Item.createItem("stasis", "Stasis Arrow Talisman", {name: "stasis"}, {stack: 1});

IDRegistry.genItemID("suffocating_fumes");
Item.createItem("suffocating_fumes", "Suffocating fumes Arrow Talisman", {name: "suffocating_fumes"}, {stack: 1});

IDRegistry.genItemID("tracer");
Item.createItem("tracer", "Tracer Arrow Talisman", {name: "tracer"}, {stack: 1});

IDRegistry.genItemID("vacuum");
Item.createItem("vacuum", "Vacuum Arrow Talisman", {name: "vacuum"}, {stack: 1});

IDRegistry.genItemID("wind_leash");
Item.createItem("wind_leash", "Wind leash Arrow Talisman", {name: "wind_leash"}, {stack: 1});

IDRegistry.genItemID("yummy_smell");
Item.createItem("yummy_smell", "Yummy smell Arrow Talisman", {name: "yummy_smell"}, {stack: 1});

IDRegistry.genItemID("zero_g");
Item.createItem("zero_g", "Zero g Arrow Talisman", {name: "zero_g"}, {stack: 1});

IDRegistry.genItemID("arbow_favor_mark");
Item.createItem("arbow_favor_mark", "Arbow Favor mark", {name: "arbow"}, {stack: 1});

IDRegistry.genItemID("blizrabi_favor_mark");
Item.createItem("blizrabi_favor_mark", "Blizrabi Favor mark", {name: "blizrabi"}, {stack: 1});

IDRegistry.genItemID("endererer_favor_mark");
Item.createItem("endererer_favor_mark", "Endererer Favor mark", {name: "endererer"}, {stack: 1});

IDRegistry.genItemID("loon_favor_mark");
Item.createItem("loon_favor_mark", "Loon Favor mark", {name: "loon"}, {stack: 1});

IDRegistry.genItemID("materia_favor_mark");
Item.createItem("materia_favor_mark", "Materia Favor mark", {name: "materia"}, {stack: 1});

IDRegistry.genItemID("neblaze_favor_mark");
Item.createItem("neblaze_favor_mark", "Neblaze Favor mark", {name: "neblaze"}, {stack: 1});

IDRegistry.genItemID("redwind_favor_mark");
Item.createItem("redwind_favor_mark", "Redwind Favor mark", {name: "redwind"}, {stack: 1});

IDRegistry.genItemID("romol_favor_mark");
Item.createItem("romol_favor_mark", "Romol Favor mark", {name: "romol"}, {stack: 1});

IDRegistry.genItemID("squarefury_favor_mark");
Item.createItem("squarefury_favor_mark", "Squarefury Favor mark", {name: "squarefury"}, {stack: 1});

IDRegistry.genItemID("timber_favor_mark");
Item.createItem("timber_favor_mark", "Timber Favor mark", {name: "timber"}, {stack: 1});

IDRegistry.genItemID("book_blue");
Item.createItem("book_blue", "Book blue Spell pickaxe", {name: "book_blue"}, {stack: 1});

IDRegistry.genItemID("book_orange");
Item.createItem("book_orange", "Book orange Spell pickaxe", {name: "book_orange"}, {stack: 1});

IDRegistry.genItemID("arbow_symbol");
Item.createItem("arbow_symbol", "Arbow symbol", {name: "arbow_symbol"}, {stack: 1});

IDRegistry.genItemID("blizrabi_symbol");
Item.createItem("blizrabi_symbol", "Blizrabi symbol", {name: "blizrabi_symbol"}, {stack: 1});

IDRegistry.genItemID("endererer_symbol");
Item.createItem("endererer_symbol", "Endererer symbol", {name: "endererer_symbol"}, {stack: 1});

IDRegistry.genItemID("loon_symbol");
Item.createItem("loon_symbol", "Loon symbol", {name: "loon_symbol"}, {stack: 1});

IDRegistry.genItemID("materia_symbol");
Item.createItem("materia_symbol", "Materia symbol", {name: "materia_symbol"}, {stack: 1});

IDRegistry.genItemID("neblaze_symbol");
Item.createItem("neblaze_symbol", "Neblaze symbol", {name: "neblaze_symbol"}, {stack: 1});

IDRegistry.genItemID("redwind_symbol");
Item.createItem("redwind_symbol", "Redwind symbol", {name: "redwind_symbol"}, {stack: 1});

IDRegistry.genItemID("romol_symbol");
Item.createItem("romol_symbol", "Romol symbol", {name: "romol_symbol"}, {stack: 1});

IDRegistry.genItemID("squarefury_symbol");
Item.createItem("squarefury_symbol", "Squarefury symbol", {name: "squarefury_symbol"}, {stack: 1});

IDRegistry.genItemID("timber_symbol");
Item.createItem("timber_symbol", "Timber symbol", {name: "timber_symbol"}, {stack: 1});

IDRegistry.genItemID("hand_swap");
Item.createItem("hand_swap", "Hand swap Spell arrow", {name: "hand_swap"}, {stack: 1});

IDRegistry.genItemID("bone_key");
Item.createItem("bone_key", "Bone key", {name: "bone_key"}, {stack: 1});

IDRegistry.genItemID("caving_rope");
Item.createItem("caving_rope", "Caving rope", {name: "caving_rope"}, {stack: 1});

IDRegistry.genItemID("clock");
Item.createItem("clock", "Clock", {name: "clock"}, {stack: 1});

IDRegistry.genItemID("immaterial_guide");
Item.createItem("immaterial_guide", "Immaterial guide", {name: "immaterial_guide"}, {stack: 1});

IDRegistry.genItemID("invite_gem");
Item.createItem("invite_gem", "Invite gem", {name: "invite_gem"}, {stack: 1});

IDRegistry.genItemID("invite_pebble");
Item.createItem("invite_pebble", "Invite pebble", {name: "invite_pebble"}, {stack: 1});

IDRegistry.genItemID("marked_glass");
Item.createItem("marked_glass", "Marked glass", {name: "marked_glass"}, {stack: 1});

IDRegistry.genItemID("storage_gem");
Item.createItem("storage_gem", "Storage gem", {name: "storage_gem"}, {stack: 1});

IDRegistry.genItemID("warp_gem");
Item.createItem("warp_gem", "Warp gem", {name: "warp_gem"}, {stack: 1});

IDRegistry.genItemID("warp_pebble");
Item.createItem("warp_pebble", "Warp pebble", {name: "warp_pebble"}, {stack: 1});





// file: mod/items/Bone_Dagger.js

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
IDRegistry.genItemID("bone_dagger");
Item.createItem("bone_dagger", "Bone dagger", {name: "bone_dagger"}, {stack: 1});
Recipes.addShaped({
  id: ItemID.bone_dagger,
  count: 1,
  data: 0
}, ["  a", "bc ", "db "], ['a', 352, 0, 'b', 2, 0, 'c', 264, 0, 'd', 280, 0]);

IDRegistry.genItemID("bone_dagger_awakened");
Item.createItem("bone_dagger_awakened", "Bone dagger awakened", {name: "bone_dagger_awakened"}, {stack: 1});

function dropByEntity(victim, entityID, item, drop) {
  if (Entity.getType(victim) == entityID && Player.getCarriedItem().id == item) {
    var pos = Entity.getPosition(victim);
    World.drop(pos.x, pos.y, pos.z, drop.id, drop.count, drop.data);
  }
}
Callback.addCallback("PlayerAttack", function (player, victim) {
  var rand = random(0, 10);
  if (rand == 10 && Player.getCarriedItem().id === ItemID.bone_dagger) {
    Player.setCarriedItem(ItemID.bone_dagger_awakened, 1, 0);
    Game.message("Awakened bone Dagger");
  }
  dropByEntity(victim, 38, ItemID.bone_dagger_awakened, {id: ItemID.end_shard, count: 1, data: 0}); //ENDERMAN
  dropByEntity(victim, 15, ItemID.bone_dagger_awakened, {id: ItemID.mind_shard, count: 1, data: 0}); //VILLAGER

  dropByEntity(victim, 42, ItemID.bone_dagger_awakened, {id: ItemID.nether_shard, count: 1, data: 0}); //LAVA SLIME
  dropByEntity(victim, 43, ItemID.bone_dagger_awakened, {id: ItemID.nether_shard, count: 1, data: 0}); //BLAZE
  dropByEntity(victim, 41, ItemID.bone_dagger_awakened, {id: ItemID.nether_shard, count: 1, data: 0}); //GHAST
  dropByEntity(victim, 36, ItemID.bone_dagger_awakened, {id: ItemID.nether_shard, count: 1, data: 0}); //PIGMAN
  dropByEntity(victim, 48, ItemID.bone_dagger_awakened, {id: ItemID.nether_shard, count: 1, data: 0}); //WITHER SKELETON

  dropByEntity(victim, 11, ItemID.bone_dagger_awakened, {id: ItemID.peace_shard, count: 1, data: 0}); //COW
  dropByEntity(victim, 10, ItemID.bone_dagger_awakened, {id: ItemID.peace_shard, count: 1, data: 0}); //CHICKEN
  dropByEntity(victim, 16, ItemID.bone_dagger_awakened, {id: ItemID.peace_shard, count: 1, data: 0}); //MUSHROOM COW
  dropByEntity(victim, 22, ItemID.bone_dagger_awakened, {id: ItemID.peace_shard, count: 1, data: 0}); //OCELOT
  dropByEntity(victim, 12, ItemID.bone_dagger_awakened, {id: ItemID.peace_shard, count: 1, data: 0}); //PIG
  dropByEntity(victim, 18, ItemID.bone_dagger_awakened, {id: ItemID.peace_shard, count: 1, data: 0}); //RABBIT
  dropByEntity(victim, 13, ItemID.bone_dagger_awakened, {id: ItemID.peace_shard, count: 1, data: 0}); //SHEEP

  dropByEntity(victim, 32, ItemID.bone_dagger_awakened, {id: ItemID.undeath_shard, count: 1, data: 0}); //ZOMBIE
  dropByEntity(victim, 34, ItemID.bone_dagger_awakened, {id: ItemID.undeath_shard, count: 1, data: 0}); //SKELETON

  dropByEntity(victim, 17, ItemID.bone_dagger_awakened, {id: ItemID.water_shard, count: 1, data: 0}); //SQUID
  dropByEntity(victim, 49, ItemID.bone_dagger_awakened, {id: ItemID.water_shard, count: 1, data: 0}); //GUARDIANS
  
  dropByEntity(victim, 37, ItemID.bone_dagger_awakened, {id: ItemID.wild_shard, count: 1, data: 0}); //SLIME
  dropByEntity(victim, 33, ItemID.bone_dagger_awakened, {id: ItemID.wild_shard, count: 1, data: 0}); //CREEPER
  dropByEntity(victim, 35, ItemID.bone_dagger_awakened, {id: ItemID.wild_shard, count: 1, data: 0}); //SPIDER

  dropByEntity(victim, 63, ItemID.bone_dagger_awakened, {id: ItemID.end_shard, count: 1, data: 0});
});




// file: mod/items/gun.js

IDRegistry.genItemID("spell_bow");
Item.createItem("spell_bow", "Spell bow standby Spell bow", {name: "spell_bow", meta: 0}, {stack: 1});
Item.registerIconOverrideFunction(ItemID.spell_bow, function (item, name) {
  return {name: "spell_bow", meta: item.data}
});
Item.describeItem(ItemID.spell_bow, {
  category: 1, // категория в креативе
  toolRender: true, // рендер в руке, как инструмент
  stackByData: false, // стакается по data
  properties: {
    "use_animation": "bow",
    "use_duration": 100
  }, // родной объект параметров MCPE
  useAnimation: 4 // анимация использозвания
})
BowRegistry.registerBow({
  bow: ItemID.spell_bow,
  texture: "spell_bow",
  bullet: 262,
  skin: "entity/projectiles/arrow.png",
  speed: 4,
  damage: 4,
  aim: BitmapFactory.decodeFile(__dir__ + "gui/aim_0.png"),
  fov: 90,
  animTime: 45,
  variations: 4,
  state: 0,
  bow: true
});




// file: mod/items/shards.js

IDRegistry.genItemID("end_shard");
Item.createItem("end_shard", "End Soul shard", {name: "end"}, {stack: 64});

IDRegistry.genItemID("mind_shard");
Item.createItem("mind_shard", "Mind Soul shard", {name: "mind"}, {stack: 64});

IDRegistry.genItemID("nether_shard");
Item.createItem("nether_shard", "Nether Soul shard", {name: "nether"}, {stack: 64});

IDRegistry.genItemID("peace_shard");
Item.createItem("peace_shard", "Peace Soul shard", {name: "peace"}, {stack: 64});

IDRegistry.genItemID("undeath_shard");
Item.createItem("undeath_shard", "Undeath Soul shard", {name: "undeath"}, {stack: 64});

IDRegistry.genItemID("water_shard");
Item.createItem("water_shard", "Water Soul shard", {name: "water"}, {stack: 64});

IDRegistry.genItemID("wild_shard");
Item.createItem("wild_shard", "Wild Soul shard", {name: "wild"}, {stack: 64});

IDRegistry.genItemID("will_shard");
Item.createItem("will_shard", "Will Soul shard", {name: "will"}, {stack: 64});

IDRegistry.genItemID("wither_shard");
Item.createItem("wither_shard", "Wither Soul shard", {name: "wither"}, {stack: 64});




