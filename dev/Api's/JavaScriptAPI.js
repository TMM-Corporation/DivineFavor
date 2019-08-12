__mod__ = unknown
__name__ = string("DumpMaker");
__dir__ = string("/storage/emulated / 0 / games / com.mojang / mods / DumpMaker /");
__config__ = unknown
__debug_typecheck__null
runCustomSourcenull
importLibnull
getCoreAPILevel();
runOnMainThread(func);
getMCPEVersion();
Debug.sysTime();
Debug.addParticle(x, y, z, id, vx, vy, vz, data);
Debug.message(message);
Debug.warning(message);
Debug.error(message);
Debug.m();
Debug.bitmap(bitmap, title);

FileTools.mntdir = string("/mnt");
FileTools.root = string("/storage/emulated / 0 /");
FileTools.workdir = string("games / com.mojang / coreengine /");
FileTools.moddir = string("games / com.mojang / mods /");
FileTools.modpedir = string("games / com.mojang / modpe /");
FileTools.mkdir(dir); 
FileTools.mkworkdirs(); 
FileTools.getFullPath(path); 
FileTools.isExists(path); 
FileTools.WriteText(file, text, add); 
FileTools.ReadText(file); 
FileTools.WriteImage(file, bitmap); 
FileTools.ReadImage(file); 
FileTools.ReadTextAsset(name); 
FileTools.ReadImageAsset(name); 
FileTools.ReadBytesAsset(name); 
FileTools.GetListOfDirs(path); 
FileTools.GetListOfFiles(path, ext); 
FileTools.ReadKeyValueFile(dir, specialSeparator); 
FileTools.WriteKeyValueFile(dir, data, specialSeparator); 
FileTools.ReadJSON(dir); 
FileTools.WriteJSON(dir, obj, beautify); 

Threading.formatFatalErrorMessage(error, name, priority, formatFunc); 
Threading.initThread(name, func, priority, isErrorFatal, formatFunc); 
Threading.getThread(name); 

// Config[JavaClass zhekasmirnov.launcher.api.mod.adaptedscript.AdaptedScriptAPI$Config]
  TileEntity.resetEngine(); 
TileEntity.registerPrototype(blockID, customPrototype); 
TileEntity.getPrototype(blockID); 
TileEntity.isTileEntityBlock(blockID); 
TileEntity.createTileEntityForPrototype(Prototype, addToUpdate); 
TileEntity.addTileEntity(x, y, z); 
TileEntity.addUpdatableAsTileEntity(updatable); 
TileEntity.getTileEntity(x, y, z); 
TileEntity.destroyTileEntity(tileEntity); 
TileEntity.destroyTileEntityAtCoords(x, y, z); 
TileEntity.isTileEntityLoaded(tileEntity); 
TileEntity.checkTileEntityForIndex(index); 
TileEntity.CheckTileEntities(); 
TileEntity.DeployDestroyChecker(tileEntity); 

MobRegistry.registerEntity(name); 
MobRegistry.registerUpdatableAsEntity(updatable); 
MobRegistry.spawnEntityAsPrototype(typeName, coords, extraData); 
MobRegistry.getEntityUpdatable(entity); 
MobRegistry.registerNativeEntity(entity); 
MobRegistry.registerEntityRemove(entity); 
MobRegistry.resetEngine(); 

MobSpawnRegistry.registerSpawn(entityType, rarity, condition, denyNaturalDespawn); 
MobSpawnRegistry.getRandomSpawn(rarityMultiplier); 
MobSpawnRegistry.getRandPosition(); 
MobSpawnRegistry.executeSpawn(spawn, position); 
MobSpawnRegistry.counter = number(0);
MobSpawnRegistry.tick(); 
MobSpawnRegistry.onChunkGenerated(x, z); 

// GameObject GameObject(name, Prototype); 
GameObjectRegistry.genUniqueName(name); 
GameObjectRegistry.registerClass(gameObjectClass); 
GameObjectRegistry.deployGameObject(gameobject); 
GameObjectRegistry.addGameObject(gameobject); 
GameObjectRegistry.removeGameObject(gameobject); 
GameObjectRegistry.resetEngine(); 
GameObjectRegistry.getAllByType(type, clone); 
GameObjectRegistry.callForType(); 
GameObjectRegistry.callForTypeSafe(); 

ModAPI.registerAPI(name, api, descr); 
ModAPI.requireAPI(name); 
ModAPI.requireGlobal(name); 
ModAPI.requireAPIdoc(name); 
ModAPI.requireAPIPropertyDoc(name, prop); 
ModAPI.getModByName(modName); 
ModAPI.isModLoaded(modName); 
ModAPI.addAPICallback(apiName, func); 
ModAPI.addModCallback(modName, func); 
ModAPI.getModList(); 
ModAPI.getModPEList(); 
ModAPI.addTexturePack(path); 
ModAPI.cloneAPI(api, deep); 
ModAPI.inheritPrototypes(source, target); 
ModAPI.cloneObject(source, deep, rec); 
ModAPI.debugCloneObject(source, deep, rec); 

Saver.addSavesScope(name, loadFunc, saveFunc); 
Saver.registerScopeSaver(name, saver); 
Saver.registerObjectSaver(name, saver); 
Saver.registerObject(obj, saverId); 
Saver.setObjectIgnored(obj, ignore); 

World.isLoaded = boolean(false);
World.setLoaded(isLoaded); 
World.isWorldLoaded(); 
World.getThreadTime(); 
World.__inworld.nativeSetBlock(x, y, z, id, data); 
World.__inworld.nativeGetBlockID(x, y, z); 
World.__inworld.nativeGetBlockData(x, y, z); 
World.__inworld.setBlocknull 
World.__inworld.setFullBlock(x, y, z, fullTile); 
World.__inworld.getBlock(x, y, z); 
World.__inworld.getBlockIDnull 
World.__inworld.getBlockDatanull 
World.__inworld.destroyBlock(x, y, z, drop); 
World.__inworld.getLightLevelnull 
World.__inworld.isChunkLoaded(x, z); 
World.__inworld.isChunkLoadedAt(x, y, z); 
World.__inworld.getTileEntity(x, y, z); 
World.__inworld.addTileEntity(x, y, z); 
World.__inworld.removeTileEntity(x, y, z); 
World.__inworld.getContainer(x, y, z); 
World.__inworld.getWorldTime(); 
World.__inworld.setWorldTime(time); 
World.__inworld.setDayMode(day); 
World.__inworld.setNightMode(night); 
World.__inworld.getWeather(); 
World.__inworld.setWeather(weather); 
World.__inworld.drop(x, y, z, id, count, data); 
World.__inworld.explode(x, y, z, power, someBoolean); 
World.__inworld.getBiome(x, z); 
World.__inworld.getBiomeName(x, z); 
World.__inworld.getGrassColor(x, z); 
World.__inworld.setGrassColor(x, z, color); 
World.__inworld.getGrassColorRGB(x, z); 
World.__inworld.setGrassColorRGB(x, z, rgb); 
World.__inworld.playSound(x, y, z, name, volume, pitch); 
World.__inworld.playSoundAtEntity(entity, name, volume, pitch); 

World.__inmenu.nativeSetBlock(); 
World.__inmenu.nativeGetBlockID(); 
World.__inmenu.nativeGetBlockData(x, y, z); 
World.__inmenu.setBlock(x, y, z, id, data); 
World.__inmenu.setFullBlock(x, y, z, fullTile); 
World.__inmenu.getBlock(x, y, z); 
World.__inmenu.getBlockID(x, y, z); 
World.__inmenu.getBlockData(x, y, z); 
World.__inmenu.destroyBlock(x, y, z, drop); 
World.__inmenu.getLightLevel(x, y, z); 
World.__inmenu.isChunkLoaded(x, z); 
World.__inmenu.isChunkLoadedAt(x, y, z); 
World.__inmenu.getTileEntity(x, y, z); 
World.__inmenu.addTileEntity(x, y, z); 
World.__inmenu.removeTileEntity(x, y, z); 
World.__inmenu.getContainer(x, y, z); 
World.__inmenu.getWorldTime(); 
World.__inmenu.setWorldTime(time); 
World.__inmenu.setDayMode(day); 
World.__inmenu.setNightMode(night); 
World.__inmenu.getWeather(); 
World.__inmenu.setWeather(weather); 
World.__inmenu.drop(x, y, z, id, count, data); 
World.__inmenu.explode(x, y, z, power, someBoolean); 
World.__inmenu.getBiome(x, z); 
World.__inmenu.getBiomeName(x, z); 
World.__inmenu.getGrassColor(x, z); 
World.__inmenu.setGrassColor(x, z, color); 
World.__inmenu.getGrassColorRGB(x, z); 
World.__inmenu.setGrassColorRGB(x, z, rgb); 
World.__inmenu.canSeeSky(x, y, z); 
World.__inmenu.playSound(x, y, z, name, volume, pitch); 
World.__inmenu.playSoundAtEntity(entity, name, volume, pitch); 

World.nativeSetBlock(); 
World.nativeGetBlockID(); 
World.nativeGetBlockData(x, y, z); 
World.setBlock(x, y, z, id, data); 
World.setFullBlock(x, y, z, fullTile); 
World.getBlock(x, y, z); 
World.getBlockID(x, y, z); 
World.getBlockData(x, y, z); 
World.destroyBlock(x, y, z, drop); 
World.getLightLevel(x, y, z); 
World.isChunkLoaded(x, z); 
World.isChunkLoadedAt(x, y, z); 
World.getTileEntity(x, y, z); 
World.addTileEntity(x, y, z); 
World.removeTileEntity(x, y, z); 
World.getContainer(x, y, z); 
World.getWorldTime(); 
World.setWorldTime(time); 
World.setDayMode(day); 
World.setNightMode(night); 
World.getWeather(); 
World.setWeather(weather); 
World.drop(x, y, z, id, count, data); 
World.explode(x, y, z, power, someBoolean); 
World.getBiome(x, z); 
World.getBiomeName(x, z); 
World.getGrassColor(x, z); 
World.setGrassColor(x, z, color); 
World.getGrassColorRGB(x, z); 
World.setGrassColorRGB(x, z, rgb); 
World.canSeeSky(x, y, z); 
World.playSound(x, y, z, name, volume, pitch); 
World.playSoundAtEntity(entity, name, volume, pitch); 

Entity.getAll(); 
Entity.getAllJS(); 
Entity.EXTRA_DATA_PREFIX = string("core.engine.");
Entity.getExtra(ent, name); 
Entity.putExtra(ent, name, extra); 
Entity.getExtraJson(ent, name); 
Entity.putExtraJson(ent, name, obj); 
Entity.addEffect(ent, effectId, effectTime, effectData, amplifier, particles); 
Entity.clearEffect(ent, id); 
Entity.clearEffects(ent); 
Entity.damageEntity(ent, damage, cause, params); 
Entity.healEntity(ent, heal); 
Entity.getType(ent); 
Entity.setHitbox(ent, w, h); 
Entity.isExist(entity); 
Entity.spawn(x, y, z, type, skin); 
Entity.spawnCustom(name, x, y, z, extra); 
Entity.spawnCustomAtCoords(name, coords, extra); 
Entity.spawnAtCoords(coords, type, skin); 
Entity.remove(entity); 
Entity.getCustom(entity); 
Entity.getAge(ent); 
Entity.setAge(ent, age); 
Entity.getSkin(ent); 
Entity.setSkin(ent, skin); 
Entity.setTexture(ent, texture); 
Entity.getRender(ent); 
Entity.setRender(ent, render); 
Entity.rideAnimal(ent1, ent2); 
Entity.getNameTag(ent); 
Entity.setNameTag(ent, tag); 
Entity.getTarget(ent); 
Entity.setTarget(ent, target); 
Entity.getMobile(ent, mobile); 
Entity.setMobile(ent, mobile); 
Entity.getSneaking(ent); 
Entity.setSneaking(ent, sneak); 
Entity.getRider(ent); 
Entity.getRiding(ent); 
Entity.setFire(ent, fire, force); 
Entity.health(entity); 
Entity.getHealth(ent); 
Entity.setHealth(ent, health); 
Entity.getMaxHealth(ent); 
Entity.setMaxHealth(ent, health); 
Entity.setPosition(ent, x, y, z); 
Entity.getPosition(ent); 
Entity.addPosition(ent, x, y, z); 
Entity.setVelocity(ent, x, y, z); 
Entity.getVelocity(ent); 
Entity.addVelocity(ent, x, y, z); 
Entity.getDistanceBetweenCoords(coords1, coords2); 
Entity.getDistanceToCoords(ent, coords); 
Entity.getDistanceToEntity(ent1, ent2); 
Entity.getXZPlayerDis(entity); 
Entity.getLookAngle(ent); 
Entity.setLookAngle(ent, yaw, pitch); 
Entity.getLookVectorByAngle(angle); 
Entity.getLookVector(ent); 
Entity.getLookAt(ent, x, y, z); 
Entity.lookAt(ent, x, y, z); 
Entity.lookAtCoords(ent, coords); 
Entity.moveToTarget(ent, target, params); 
Entity.moveToAngle(ent, angle, params); 
Entity.moveToLook(ent, params); 
Entity.getMovingVector(ent); 
Entity.getMovingAngle(ent); 
Entity.getMovingAngleByPositions(pos1, pos2); 
Entity.findNearest(coords, type, maxRange); 
Entity.getAllInRange(coords, maxRange, type); 
Entity.getInventory(ent, handleNames, handleEnchant); 
Entity.getArmorSlot(ent, slot); 
Entity.setArmorSlot(ent, slot, id, count, data); 
Entity.getCarriedItem(ent, handleEnchant, handleNames); 
Entity.setCarriedItem(ent, id, count, data, enchant, name); 
Entity.getDroppedItem(ent); 
Entity.setDroppedItem(ent, id, count, data); 
Entity.getProjectileItem(projectile); 

Player.get(); 
Player.getNameForEnt(ent); 
Player.getName(); 
Player.getDimension(); 
Player.isPlayer(ent); 
Player.getPointed(); 
Player.getInventory(loadPart, handleEnchant, handleNames); 
Player.addItemToInventory(id, count, data); 
Player.getCarriedItem(handleEnchant, handleNames); 
Player.setCarriedItem(id, count, data, enchant, name); 
Player.decreaseCarriedItem(count); 
Player.getInventorySlot(slot); 
Player.setInventorySlot(slot, id, count, data); 
Player.getArmorSlot(slot); 
Player.setArmorSlot(slot, id, count, data); 
Player.getSelectedSlotId(); 
Player.setSelectedSlotId(slot); 
Player.setPosition(x, y, z); 
Player.getPosition(); 
Player.addPosition(x, y, z); 
Player.setVelocity(x, y, z); 
Player.getVelocity(); 
Player.addVelocity(x, y, z); 
Player.experience(); 
Player.getExperience(); 
Player.setExperience(exp); 
Player.addExperience(exp); 
Player.level(); 
Player.getLevel(); 
Player.setLevel(level); 
Player.addLevel(level); 
Player.flying(); 
Player.getFlyingEnabled(); 
Player.setFlyingEnabled(enabled); 
Player.getFlying(); 
Player.setFlying(enabled); 
Player.exhaustion(); 
Player.getExhaustion(); 
Player.setExhaustion(value); 
Player.hunger(); 
Player.getHunger(); 
Player.setHunger(value); 
Player.saturation(); 
Player.getSaturation(); 
Player.setSaturation(value); 
Player.health(); 
Player.getHealth(); 
Player.setHealth(value); 
Player.score(); 
Player.getScore(); 

Game.prevent(); 
Game.message(msg); 
Game.tipMessage(msg); 
Game.dialogMessage(message, title); 
Game.setDifficulty(difficulty); 
Game.getDifficulty(); 
Game.getMinecraftVersion(); 
Game.getEngineVersion(); 

// Render RenderAPI(params); 
// Texture Texture(path); 
// EntityModel ModelAPI(parentModel); 
// EntityModelWatcher ModelWatcher(entity, model); 
// EntityAIClass EntityAI(customPrototype); 
// EntityAIWatcher EntityAIWatcher(customPrototype); 
EntityAI.Idle.getDefaultPriority(); 
EntityAI.Idle.getDefaultName(); 
EntityAI.Idle.setParams(params); 
EntityAI.Idle.executionStarted(); 
EntityAI.Idle.executionEnded(); 
EntityAI.Idle.executionPaused(); 
EntityAI.Idle.executionResumed(); 
EntityAI.Idle.execute(); 
EntityAI.Idle.__execute(); 
EntityAI.Idle.setExecutionTimer(timer); 
EntityAI.Idle.removeExecutionTimer(); 
EntityAI.Idle.data.executionTimer = number(-1);

EntityAI.Idle.isInstance = boolean(false);
EntityAI.Idle.instantiate(parent, name); 
EntityAI.Idle.aiEntityChanged(entity); 
EntityAI.Idle.finishExecution(); 
EntityAI.Idle.changeSelfPriority(priority); 
EntityAI.Idle.enableAI(name, priority, extra); 
EntityAI.Idle.disableAI(name); 
EntityAI.Idle.setPriority(name, priority); 
EntityAI.Idle.getAI(name); 
EntityAI.Idle.getPriority(name); 
EntityAI.Idle.attackedBy(entity); 
EntityAI.Idle.hurtBy(entity); 
EntityAI.Idle.projectileHit(projectile); 
EntityAI.Idle.death(entity); 
EntityAI.Idle.getDefaultPrioriy(); 

EntityAI.Follow.getDefaultPriority(); 
EntityAI.Follow.getDefaultName(); 
EntityAI.Follow.params.speed = number(0.2);
EntityAI.Follow.params.jumpVel = number(0.45);
EntityAI.Follow.params.rotateSpeed = number(0.4);
EntityAI.Follow.params.rotateRatio = number(0.5);
EntityAI.Follow.params.rotateHead = boolean(true);
EntityAI.Follow.params.denyY = boolean(true);

EntityAI.Follow.setParams(params); 
EntityAI.Follow.executionStarted(); 
EntityAI.Follow.executionEnded(); 
EntityAI.Follow.executionPaused(); 
EntityAI.Follow.executionResumed(); 
EntityAI.Follow.execute(); 
EntityAI.Follow.__execute(); 
EntityAI.Follow.setExecutionTimer(timer); 
EntityAI.Follow.removeExecutionTimer(); 
EntityAI.Follow.data.movingYaw = number(0);

EntityAI.Follow.isInstance = boolean(false);
EntityAI.Follow.instantiate(parent, name); 
EntityAI.Follow.aiEntityChanged(entity); 
EntityAI.Follow.finishExecution(); 
EntityAI.Follow.changeSelfPriority(priority); 
EntityAI.Follow.enableAI(name, priority, extra); 
EntityAI.Follow.disableAI(name); 
EntityAI.Follow.setPriority(name, priority); 
EntityAI.Follow.getAI(name); 
EntityAI.Follow.getPriority(name); 
EntityAI.Follow.attackedBy(entity); 
EntityAI.Follow.hurtBy(entity); 
EntityAI.Follow.projectileHit(projectile); 
EntityAI.Follow.death(entity); 

EntityAI.Panic.getDefaultPriority(); 
EntityAI.Panic.getDefaultName(); 
EntityAI.Panic.params.speed = number(0.22);
EntityAI.Panic.params.angular_speed = number(0.5);

EntityAI.Panic.setParams(params); 
EntityAI.Panic.executionStarted(); 
EntityAI.Panic.executionEnded(); 
EntityAI.Panic.executionPaused(); 
EntityAI.Panic.executionResumed(); 
EntityAI.Panic.execute(); 
EntityAI.Panic.__execute(); 
EntityAI.Panic.setExecutionTimer(timer); 
EntityAI.Panic.removeExecutionTimer(); 
EntityAI.Panic.data.yaw = number(0);
EntityAI.Panic.data.add = number(0);

EntityAI.Panic.isInstance = boolean(false);
EntityAI.Panic.instantiate(parent, name); 
EntityAI.Panic.aiEntityChanged(entity); 
EntityAI.Panic.finishExecution(); 
EntityAI.Panic.changeSelfPriority(priority); 
EntityAI.Panic.enableAI(name, priority, extra); 
EntityAI.Panic.disableAI(name); 
EntityAI.Panic.setPriority(name, priority); 
EntityAI.Panic.getAI(name); 
EntityAI.Panic.getPriority(name); 
EntityAI.Panic.attackedBy(entity); 
EntityAI.Panic.hurtBy(entity); 
EntityAI.Panic.projectileHit(projectile); 
EntityAI.Panic.death(entity); 
EntityAI.Panic.randomize(); 

EntityAI.Wander.getDefaultPriority(); 
EntityAI.Wander.getDefaultName(); 
EntityAI.Wander.params.speed = number(0.08);
EntityAI.Wander.params.angular_speed = number(0.1);
EntityAI.Wander.params.delay_weight = number(0.3);

EntityAI.Wander.setParams(params); 
EntityAI.Wander.executionStarted(); 
EntityAI.Wander.executionEnded(); 
EntityAI.Wander.executionPaused(); 
EntityAI.Wander.executionResumed(); 
EntityAI.Wander.execute(); 
EntityAI.Wander.__execute(); 
EntityAI.Wander.setExecutionTimer(timer); 
EntityAI.Wander.removeExecutionTimer(); 
EntityAI.Wander.data.yaw = number(0);
EntityAI.Wander.data.add = number(0);
EntityAI.Wander.data.delay = boolean(false);
EntityAI.Wander.data._delay = boolean(true);

EntityAI.Wander.isInstance = boolean(false);
EntityAI.Wander.instantiate(parent, name); 
EntityAI.Wander.aiEntityChanged(entity); 
EntityAI.Wander.finishExecution(); 
EntityAI.Wander.changeSelfPriority(priority); 
EntityAI.Wander.enableAI(name, priority, extra); 
EntityAI.Wander.disableAI(name); 
EntityAI.Wander.setPriority(name, priority); 
EntityAI.Wander.getAI(name); 
EntityAI.Wander.getPriority(name); 
EntityAI.Wander.attackedBy(entity); 
EntityAI.Wander.hurtBy(entity); 
EntityAI.Wander.projectileHit(projectile); 
EntityAI.Wander.death(entity); 
EntityAI.Wander.randomize(); 

EntityAI.Attack.getDefaultPriority(); 
EntityAI.Attack.getDefaultName(); 
EntityAI.Attack.params.attack_damage = number(5);
EntityAI.Attack.params.attack_range = number(2.5);
EntityAI.Attack.params.attack_rate = number(12);

EntityAI.Attack.setParams(params); 
EntityAI.Attack.executionStarted(); 
EntityAI.Attack.executionEnded(); 
EntityAI.Attack.executionPaused(); 
EntityAI.Attack.executionResumed(); 
EntityAI.Attack.execute(); 
EntityAI.Attack.__execute(); 
EntityAI.Attack.setExecutionTimer(timer); 
EntityAI.Attack.removeExecutionTimer(); 
EntityAI.Attack.data.timer = number(0);

EntityAI.Attack.isInstance = boolean(false);
EntityAI.Attack.instantiate(parent, name); 
EntityAI.Attack.aiEntityChanged(entity); 
EntityAI.Attack.finishExecution(); 
EntityAI.Attack.changeSelfPriority(priority); 
EntityAI.Attack.enableAI(name, priority, extra); 
EntityAI.Attack.disableAI(name); 
EntityAI.Attack.setPriority(name, priority); 
EntityAI.Attack.getAI(name); 
EntityAI.Attack.getPriority(name); 
EntityAI.Attack.attackedBy(entity); 
EntityAI.Attack.hurtBy(entity); 
EntityAI.Attack.projectileHit(projectile); 
EntityAI.Attack.death(entity); 

EntityAI.Swim.getDefaultPriority(); 
EntityAI.Swim.getDefaultName(); 
EntityAI.Swim.params.velocity = number(0.2);

EntityAI.Swim.setParams(params); 
EntityAI.Swim.executionStarted(); 
EntityAI.Swim.executionEnded(); 
EntityAI.Swim.executionPaused(); 
EntityAI.Swim.executionResumed(); 
EntityAI.Swim.execute(); 
EntityAI.Swim.__execute(); 
EntityAI.Swim.setExecutionTimer(timer); 
EntityAI.Swim.removeExecutionTimer(); 
EntityAI.Swim.data.executionTimer = number(-1);

EntityAI.Swim.isInstance = boolean(false);
EntityAI.Swim.instantiate(parent, name); 
EntityAI.Swim.aiEntityChanged(entity); 
EntityAI.Swim.finishExecution(); 
EntityAI.Swim.changeSelfPriority(priority); 
EntityAI.Swim.enableAI(name, priority, extra); 
EntityAI.Swim.disableAI(name); 
EntityAI.Swim.setPriority(name, priority); 
EntityAI.Swim.getAI(name); 
EntityAI.Swim.getPriority(name); 
EntityAI.Swim.attackedBy(entity); 
EntityAI.Swim.hurtBy(entity); 
EntityAI.Swim.projectileHit(projectile); 
EntityAI.Swim.death(entity); 
EntityAI.Swim.inWater = boolean(false);

EntityAI.PanicWatcher.getDefaultPriority(); 
EntityAI.PanicWatcher.getDefaultName(); 
EntityAI.PanicWatcher.params.panic_time = number(200);
EntityAI.PanicWatcher.params.priority_panic = number(5);
EntityAI.PanicWatcher.params.priority_default = number(1);
EntityAI.PanicWatcher.params.name = string(panic);

EntityAI.PanicWatcher.setParams(params); 
EntityAI.PanicWatcher.executionStarted(); 
EntityAI.PanicWatcher.executionEnded(); 
EntityAI.PanicWatcher.executionPaused(); 
EntityAI.PanicWatcher.executionResumed(); 
EntityAI.PanicWatcher.execute(); 
EntityAI.PanicWatcher.__execute(); 
EntityAI.PanicWatcher.setExecutionTimer(timer); 
EntityAI.PanicWatcher.removeExecutionTimer(); 
EntityAI.PanicWatcher.data.timer = number(-1);

EntityAI.PanicWatcher.isInstance = boolean(false);
EntityAI.PanicWatcher.instantiate(parent, name); 
EntityAI.PanicWatcher.aiEntityChanged(entity); 
EntityAI.PanicWatcher.finishExecution(); 
EntityAI.PanicWatcher.changeSelfPriority(priority); 
EntityAI.PanicWatcher.enableAI(name, priority, extra); 
EntityAI.PanicWatcher.disableAI(name); 
EntityAI.PanicWatcher.setPriority(name, priority); 
EntityAI.PanicWatcher.getAI(name); 
EntityAI.PanicWatcher.getPriority(name); 
EntityAI.PanicWatcher.attackedBy(entity); 
EntityAI.PanicWatcher.hurtBy(); 
EntityAI.PanicWatcher.projectileHit(projectile); 
EntityAI.PanicWatcher.death(entity); 


GenerationUtils.isTerrainBlock(id); 
GenerationUtils.isTransparentBlock(id); 
GenerationUtils.canSeeSky(x, y, z); 
GenerationUtils.randomXZ(cx, cz); 
GenerationUtils.randomCoords(cx, cz, lowest, highest); 
GenerationUtils.findSurface(x, y, z); 
GenerationUtils.findHighSurface(x, z); 
GenerationUtils.findLowSurface(x, z); 
GenerationUtils.__lockedReal.id = number(0);
GenerationUtils.__lockedReal.data = number(0);

GenerationUtils.lockInBlock(id, data, checkerTile, checkerMode); 
GenerationUtils.setLockedBlock(x, y, z); 
GenerationUtils.genMinable(x, y, z, params); 
GenerationUtils.generateOre(x, y, z, id, data, amount, noStoneCheck); 

// Animation.base AnimationBase(x, y, z); 
// Animation.Base AnimationBase(x, y, z); 
// Animation.item AnimationItem(x, y, z); 
// Animation.Item AnimationItem(x, y, z); 

Particles.addParticlenull 
Particles.addFarParticlenull 
Particles.line(particle, coords1, coords2, gap, vel, data); 

Block.getNumericId(id); 
Block.createBlock(namedID, defineData, blockType); 
Block.createBlockWithRotation(namedID, defineData, blockType); 
Block.isNativeTile(id); 
Block.registerDropFunctionForID(numericID, dropFunc, level); 
Block.registerDropFunction(namedID, dropFunc, level); 
Block.defaultDropFunction(blockCoords, blockID, blockData, diggingLevel); 
Block.getDropFunction(id); 
Block.setDestroyLevelForID(id, level); 
Block.setDestroyLevel(namedID, level); 
Block.setDestroyTime(namedID, time); 
Block.getDestroyTime(numericID); 
Block.setTempDestroyTime(numericID, time); 
Block.setBlockMaterial(namedID, material, level); 
Block.setRedstoneTile(namedID, data, isRedstone); 
Block.onBlockDestroyed(coords, fullTile); 
Block.getBlockDropViaItem(block, item, coords); 
Block.registerPlaceFunctionForID(block, func); 
Block.registerPlaceFunction(namedID, func); 
Block.getPlaceFunc(block); 
Block.setBlockShape(id, pos1, pos2, data); 
Block.setShape(id, x1, y1, z1, x2, y2, z2, data); 
Block.createSpecialType(description, nameKey); 
Block.TYPE_BASE = string(createBlock);
Block.TYPE_ROTATION = string(createBlockWithRotation);
Block.setPrototype(namedID, Prototype); 

Item.getNumericId(id); 
Item.getItemById(id); 
Item.createItem(namedID, name, texture, params); 
Item.createFoodItem(namedID, name, texture, params); 
Item.createFuelItem(namedID, name, texture, params); 
Item.createArmorItem(namedID, name, texture, params); 
Item.createThrowableItem(namedID, name, texture, params); 
Item.isNativeItem(id); 
Item.getMaxDamage(id); 
Item.getMaxStack(id); 
Item.getName(id, data, encode); 
Item.isValid(id, data); 
Item.addToCreative(id, count, data); 
Item.describeItem(numericID, description); 
Item.setCategory(id, category); 
Item.setEnchantType(id, enchant, value); 
Item.setToolRender(id, enabled); 
Item.setMaxDamage(id, maxdamage); 
Item.setGlint(id, enabled); 
Item.setLiquidClip(id, enabled); 
Item.setStackedByData(id, enabled); 
Item.setProperties(id, props); 
Item.setUseAnimation(id, animType); 
Item.registerUseFunctionForID(numericID, useFunc); 
Item.registerUseFunction(namedID, useFunc); 
Item.onItemUsed(coords, item, block); 
Item.registerThrowableFunctionForID(numericID, useFunc); 
Item.registerThrowableFunction(namedID, useFunc); 
Item.onProjectileHit(projectile, item, target); 
Item.registerIconOverrideFunction(namedID, func); 
Item.onIconOverride(item); 
Item.registerNameOverrideFunction(namedID, func); 
Item.onNameOverride(item, name); 
Item.registerNoTargetUseFunction(namedID, func); 
Item.onUseNoTarget(item); 
Item.registerUsingReleasedFunction(namedID, func); 
Item.onUsingReleased(item, ticks); 
Item.registerUsingCompleteFunction(namedID, func); 
Item.onUsingComplete(item); 
Item.registerDispenseFunction(namedID, func); 
Item.onDispense(coords, item); 
Item.TYPE_BASE = string(createItem);
Item.TYPE_FOOD = string(createFoodItem);
Item.TYPE_ARMOR = string(createArmorItem);
Item.TYPE_THROWABLE = string(createThrowableItem);
Item.setPrototype(namedID, Prototype); 

ToolAPI.needDamagableItemFix = boolean(false);
ToolAPI.addBlockMaterial(name, breakingMultiplier); 
ToolAPI.addToolMaterial(name, material); 
ToolAPI.registerTool(id, toolMaterial, blockMaterials, params); 
ToolAPI.registerSword(id, toolMaterial, params); 
ToolAPI.registerBlockMaterial(uid, materialName, level, isNative); 
ToolAPI.registerBlockDiggingLevel(uid, level); 
ToolAPI.registerBlockMaterialAsArray(materialName, UIDs, isNative); 
ToolAPI.refresh(); 
ToolAPI.getBlockData(blockID); 
ToolAPI.getBlockMaterial(blockID); 
ToolAPI.getBlockDestroyLevel(blockID); 
ToolAPI.getEnchantExtraData(enchant); 
ToolAPI.fortuneDropModifier(drop, level); 
ToolAPI.getDestroyTimeViaTool(fullBlock, toolItem, coords, ignoreNative); 
ToolAPI.getToolData(itemID); 
ToolAPI.getToolLevel(itemID); 
ToolAPI.getToolLevelViaBlock(itemID, blockID); 
ToolAPI.getCarriedToolData(); 
ToolAPI.getCarriedToolLevel(); 
ToolAPI.startDestroyHook(coords, block, carried); 
ToolAPI.destroyBlockHook(coords, block, carried); 
ToolAPI.LastAttackTime = number(0);
ToolAPI.playerAttackHook(attackerPlayer, victimEntity, carried); 
ToolAPI.resetEngine(); 
ToolAPI.dropExpOrbs(x, y, z, value); 
ToolAPI.dropOreExp(coords, minVal, maxVal, modifier); 

Armor.registerFuncs(id, funcs); 
Armor.preventDamaging(id); 

LiquidRegistry.liquidStorageSaverId = number(1306847136);
LiquidRegistry.liquids.water.key = string(water);
LiquidRegistry.liquids.water.name = string(water);
// LiquidRegistry.liquids.water.uiTextures.0 = string(_liquid_water_texture_0);

LiquidRegistry.liquids.water.addUITexture(name); 
LiquidRegistry.liquids.water.addModelTexture(name); 

LiquidRegistry.liquids.lava.key = string(lava);
LiquidRegistry.liquids.lava.name = string(lava);
// LiquidRegistry.liquids.lava.uiTextures.0 = string(_liquid_lava_texture_0);

LiquidRegistry.liquids.lava.addUITexture(name); 
LiquidRegistry.liquids.lava.addModelTexture(name); 

LiquidRegistry.liquids.milk.key = string(milk);
LiquidRegistry.liquids.milk.name = string(milk);
// LiquidRegistry.liquids.milk.uiTextures.0 = string(_liquid_milk_texture_0);

LiquidRegistry.liquids.milk.addUITexture(name); 
LiquidRegistry.liquids.milk.addModelTexture(name); 


LiquidRegistry.registerLiquid(key, name, uiTextures, modelTextures); 
LiquidRegistry.getLiquidData(key); 
LiquidRegistry.isExists(key); 
LiquidRegistry.getLiquidName(key); 
LiquidRegistry.getLiquidUITexture(key, width, height); 
LiquidRegistry.getLiquidUIBitmap(key, width, height); 
// LiquidRegistry.FullByEmpty.325: 0: water.id = number(325);
// LiquidRegistry.FullByEmpty.325: 0: water.data = number(8);

// LiquidRegistry.FullByEmpty.374: 0: water.id = number(373);
// LiquidRegistry.FullByEmpty.374: 0: water.data = number(0);

// LiquidRegistry.FullByEmpty.325: 0: lava.id = number(325);
// LiquidRegistry.FullByEmpty.325: 0: lava.data = number(10);

// LiquidRegistry.FullByEmpty.325: 0: milk.id = number(325);
// LiquidRegistry.FullByEmpty.325: 0: milk.data = number(1);


// LiquidRegistry.EmptyByFull.325: 8.id = number(325);
// LiquidRegistry.EmptyByFull.325: 8.data = number(0);
// LiquidRegistry.EmptyByFull.325: 8.liquid = string(water);

// LiquidRegistry.EmptyByFull.373: 0.id = number(374);
// LiquidRegistry.EmptyByFull.373: 0.data = number(0);
// LiquidRegistry.EmptyByFull.373: 0.liquid = string(water);

// LiquidRegistry.EmptyByFull.325: 10.id = number(325);
// LiquidRegistry.EmptyByFull.325: 10.data = number(0);
// LiquidRegistry.EmptyByFull.325: 10.liquid = string(lava);

// LiquidRegistry.EmptyByFull.325: 1.id = number(325);
// LiquidRegistry.EmptyByFull.325: 1.data = number(0);
// LiquidRegistry.EmptyByFull.325: 1.liquid = string(milk);


LiquidRegistry.registerItem(liquid, empty, full); 
LiquidRegistry.getEmptyItem(id, data); 
LiquidRegistry.getItemLiquid(id, data); 
LiquidRegistry.getFullItem(id, data, liquid); 
LiquidRegistry.Storage(tileEntity); 

const Native = {
  ArmorType: {
    helmet: 0,
    chestplate: 1,
    leggings: 2,
    boots: 3
  },
  ItemCategory: {
    DECORATION: 2,
    FOOD: 4,
    INTERNAL: 0,
    MATERIAL: 1,
    TOOL: 3
  },
  ParticleType: {
    angryVillager: 30,
    bubble: 1,
    carrotboost: "carrotboost",
    cloud: 4,
    crit: 2,
    dripLava: 22,
    dripWater: 21,
    enchantmenttable: 32,
    fallingDust: 23,
    flame: 6,
    happyVillager: 31,
    heart: 15,
    hugeexplosion: 13,
    hugeexplosionSeed: 12,
    ink: 27,
    itemBreak: 10,
    largeexplode: 5,
    lava: 7,
    mobFlame: 14,
    note: 24,
    portal: 18,
    rainSplash: 29,
    redstone: 9,
    slime: 28,
    smoke: 3,
    smoke2: 8,
    snowballpoof: 11,
    spell: 24,
    spell2: 25,
    spell3: 26,
    splash: 19,
    suspendedTown: 17,
    terrain: 16,
    waterWake: 20,
    witchspell: "witchspell"
  },
  Color: {
    AQUA: "§b",
    BEGIN: "§",
    BLACK: "§0",
    BLUE: "§9",
    BOLD: "§l",
    DARK_AQUA: "§3",
    DARK_BLUE: "§1",
    DARK_GRAY: "§8",
    DARK_GREEN: "§2",
    DARK_PURPLE: "§5",
    DARK_RED: "§4",
    GOLD: "§6",
    GRAY: "§7",
    GREEN: "§a",
    LIGHT_PURPLE: "§d",
    RED: "§c",
    RESET: "§r",
    WHITE: "§f",
    YELLOW: "§e"
  },
  EntityType: {
    ARROW: 80,
    BAT: 19,
    BLAZE: 43,
    BOAT: 90,
    CAVE_SPIDER: 40,
    CHICKEN: 10,
    COW: 11,
    CREEPER: 33,
    EGG: 82,
    ENDERMAN: 38,
    EXPERIENCE_ORB: 69,
    EXPERIENCE_POTION: 68,
    FALLING_BLOCK: 66,
    FIREBALL: 85,
    FISHING_HOOK: 77,
    GHAST: 41,
    IRON_GOLEM: 20,
    ITEM: 64,
    LAVA_SLIME: 42,
    LIGHTNING_BOLT: 93,
    MINECART: 84,
    MUSHROOM_COW: 16,
    OCELOT: 22,
    PAINTING: 83,
    PIG: 12,
    PIG_ZOMBIE: 36,
    PLAYER: 63,
    POLAR_BEAR: 28,
    PRIMED_TNT: 65,
    RABBIT: 18,
    SHEEP: 13,
    SILVERFISH: 39,
    SKELETON: 34,
    SLIME: 37,
    SMALL_FIREBALL: 94,
    SNOWBALL: 81,
    SNOW_GOLEM: 21,
    SPIDER: 35,
    SQUID: 17,
    THROWN_POTION: 86,
    VILLAGER: 15,
    WOLF: 14,
    ZOMBIE: 32,
    ZOMBIE_VILLAGER: 44
  },
  MobRenderType: {
    arrow: 25,
    bat: 10,
    blaze: 18,
    boat: 35,
    camera: 48,
    chicken: 5,
    cow: 6,
    creeper: 22,
    egg: 28,
    enderman: 24,
    expPotion: 45,
    experienceOrb: 40,
    fallingTile: 33,
    fireball: 37,
    fishHook: 26,
    ghast: 17,
    human: 3,
    ironGolem: 42,
    item: 4,
    lavaSlime: 16,
    lightningBolt: 41,
    map: 50,
    minecart: 34,
    mushroomCow: 7,
    ocelot: 43,
    painting: 32,
    pig: 8,
    player: 27,
    rabbit: 46,
    sheep: 9,
    silverfish: 21,
    skeleton: 19,
    slime: 23,
    smallFireball: 38,
    snowGolem: 44,
    snowball: 29,
    spider: 20,
    squid: 36,
    thrownPotion: 31,
    tnt: 2,
    unknownItem: 30,
    villager: 12,
    villagerZombie: 39,
    witch: 47,
    wolf: 11,
    zombie: 14,
    zombiePigman: 15
  },
  PotionEffect: {
    absorption: 22,
    blindness: 15,
    confusion: 9,
    damageBoost: 5,
    damageResistance: 11,
    digSlowdown: 4,
    digSpeed: 3,
    fireResistance: 12,
    harm: 7,
    heal: 6,
    healthBoost: 21,
    hunger: 17,
    invisibility: 14,
    jump: 8,
    movementSlowdown: 2,
    movementSpeed: 1,
    nightVision: 16,
    poison: 19,
    regeneration: 10,
    saturation: 23,
    waterBreathing: 13,
    weakness: 18,
    wither: 20
  },
  Dimension: {
    END: 2,
    NETHER: 1,
    NORMAL: 0
  },
  ItemAnimation: {
    bow: 4,
    normal: 0
  },
  BlockSide: {
    DOWN: 0,
    EAST: 5,
    NORTH: 2,
    SOUTH: 3,
    UP: 1,
    WEST: 4
  },
  Enchantment: {
    AQUA_AFFINITY: 7,
    BANE_OF_ARTHROPODS: 11,
    BLAST_PROTECTION: 3,
    DEPTH_STRIDER: 8,
    EFFICIENCY: 15,
    FEATHER_FALLING: 2,
    FIRE_ASPECT: 13,
    FIRE_PROTECTION: 1,
    FLAME: 21,
    FORTUNE: 18,
    INFINITY: 22,
    KNOCKBACK: 12,
    LOOTING: 14,
    LUCK_OF_THE_SEA: 23,
    LURE: 24,
    POWER: 19,
    PROJECTILE_PROTECTION: 4,
    PROTECTION: 0,
    PUNCH: 20,
    RESPIRATION: 6,
    SHARPNESS: 9,
    SILK_TOUCH: 16,
    SMITE: 10,
    THORNS: 5,
    UNBREAKING: 17
  },
  EnchantType: {
    all: 16383,
    axe: 512,
    book: 16383,
    bow: 32,
    fishingRod: 4096,
    flintAndSteel: 256,
    hoe: 64,
    pickaxe: 1024,
    shears: 128,
    shovel: 2048,
    weapon: 16
  },
  BlockRenderLayer: {
    alpha: 4099,
    alpha_seasons: 5,
    alpha_single_side: 4,
    blend: 6,
    doubleside: 2,
    far: 9,
    opaque: 0,
    opaque_seasons: 1,
    seasons_far: 10,
    seasons_far_alpha: 11,
    water: 7
  }
};
Native.ArmorType.boots = number(3);
Native.ArmorType.chestplate = number(1);
Native.ArmorType.helmet = number(0);
Native.ArmorType.leggings = number(2);

Native.ItemCategory.DECORATION = number(2);
Native.ItemCategory.FOOD = number(4);
Native.ItemCategory.INTERNAL = number(0);
Native.ItemCategory.MATERIAL = number(1);
Native.ItemCategory.TOOL = number(3);

Native.ParticleType.angryVillager = number(30);
Native.ParticleType.bubble = number(1);
Native.ParticleType.carrotboost = string(carrotboost);
Native.ParticleType.cloud = number(4);
Native.ParticleType.crit = number(2);
Native.ParticleType.dripLava = number(22);
Native.ParticleType.dripWater = number(21);
Native.ParticleType.enchantmenttable = number(32);
Native.ParticleType.fallingDust = number(23);
Native.ParticleType.flame = number(6);
Native.ParticleType.happyVillager = number(31);
Native.ParticleType.heart = number(15);
Native.ParticleType.hugeexplosion = number(13);
Native.ParticleType.hugeexplosionSeed = number(12);
Native.ParticleType.ink = number(27);
Native.ParticleType.itemBreak = number(10);
Native.ParticleType.largeexplode = number(5);
Native.ParticleType.lava = number(7);
Native.ParticleType.mobFlame = number(14);
Native.ParticleType.note = number(34);
Native.ParticleType.portal = number(18);
Native.ParticleType.rainSplash = number(29);
Native.ParticleType.redstone = number(9);
Native.ParticleType.slime = number(28);
Native.ParticleType.smoke = number(3);
Native.ParticleType.smoke2 = number(8);
Native.ParticleType.snowballpoof = number(11);
Native.ParticleType.spell = number(24);
Native.ParticleType.spell2 = number(25);
Native.ParticleType.spell3 = number(26);
Native.ParticleType.splash = number(19);
Native.ParticleType.suspendedTown = number(17);
Native.ParticleType.terrain = number(16);
Native.ParticleType.waterWake = number(20);
Native.ParticleType.witchspell = string(witchspell);

Native.Color.AQUA = string("§b");
Native.Color.BEGIN = string("§");
Native.Color.BLACK = string("§0");
Native.Color.BLUE = string("§9");
Native.Color.BOLD = string("§l");
Native.Color.DARK_AQUA = string("§3");
Native.Color.DARK_BLUE = string("§1");
Native.Color.DARK_GRAY = string("§8");
Native.Color.DARK_GREEN = string("§2");
Native.Color.DARK_PURPLE = string("§5");
Native.Color.DARK_RED = string("§4");
Native.Color.GOLD = string("§6");
Native.Color.GRAY = string("§7");
Native.Color.GREEN = string("§a");
Native.Color.LIGHT_PURPLE = string("§d");
Native.Color.RED = string("§c");
Native.Color.RESET = string("§r");
Native.Color.WHITE = string("§f");
Native.Color.YELLOW = string("§e");

Native.EntityType.ARROW = number(80);
Native.EntityType.BAT = number(19);
Native.EntityType.BLAZE = number(43);
Native.EntityType.BOAT = number(90);
Native.EntityType.CAVE_SPIDER = number(40);
Native.EntityType.CHICKEN = number(10);
Native.EntityType.COW = number(11);
Native.EntityType.CREEPER = number(33);
Native.EntityType.EGG = number(82);
Native.EntityType.ENDERMAN = number(38);
Native.EntityType.EXPERIENCE_ORB = number(69);
Native.EntityType.EXPERIENCE_POTION = number(68);
Native.EntityType.FALLING_BLOCK = number(66);
Native.EntityType.FIREBALL = number(85);
Native.EntityType.FISHING_HOOK = number(77);
Native.EntityType.GHAST = number(41);
Native.EntityType.IRON_GOLEM = number(20);
Native.EntityType.ITEM = number(64);
Native.EntityType.LAVA_SLIME = number(42);
Native.EntityType.LIGHTNING_BOLT = number(93);
Native.EntityType.MINECART = number(84);
Native.EntityType.MUSHROOM_COW = number(16);
Native.EntityType.OCELOT = number(22);
Native.EntityType.PAINTING = number(83);
Native.EntityType.PIG = number(12);
Native.EntityType.PIG_ZOMBIE = number(36);
Native.EntityType.PLAYER = number(63);
Native.EntityType.POLAR_BEAR = number(28);
Native.EntityType.PRIMED_TNT = number(65);
Native.EntityType.RABBIT = number(18);
Native.EntityType.SHEEP = number(13);
Native.EntityType.SILVERFISH = number(39);
Native.EntityType.SKELETON = number(34);
Native.EntityType.SLIME = number(37);
Native.EntityType.SMALL_FIREBALL = number(94);
Native.EntityType.SNOWBALL = number(81);
Native.EntityType.SNOW_GOLEM = number(21);
Native.EntityType.SPIDER = number(35);
Native.EntityType.SQUID = number(17);
Native.EntityType.THROWN_POTION = number(86);
Native.EntityType.VILLAGER = number(15);
Native.EntityType.WOLF = number(14);
Native.EntityType.ZOMBIE = number(32);
Native.EntityType.ZOMBIE_VILLAGER = number(44);

Native.MobRenderType.arrow = number(25);
Native.MobRenderType.bat = number(10);
Native.MobRenderType.blaze = number(18);
Native.MobRenderType.boat = number(35);
Native.MobRenderType.camera = number(48);
Native.MobRenderType.chicken = number(5);
Native.MobRenderType.cow = number(6);
Native.MobRenderType.creeper = number(22);
Native.MobRenderType.egg = number(28);
Native.MobRenderType.enderman = number(24);
Native.MobRenderType.expPotion = number(45);
Native.MobRenderType.experienceOrb = number(40);
Native.MobRenderType.fallingTile = number(33);
Native.MobRenderType.fireball = number(37);
Native.MobRenderType.fishHook = number(26);
Native.MobRenderType.ghast = number(17);
Native.MobRenderType.human = number(3);
Native.MobRenderType.ironGolem = number(42);
Native.MobRenderType.item = number(4);
Native.MobRenderType.lavaSlime = number(16);
Native.MobRenderType.lightningBolt = number(41);
Native.MobRenderType.map = number(50);
Native.MobRenderType.minecart = number(34);
Native.MobRenderType.mushroomCow = number(7);
Native.MobRenderType.ocelot = number(43);
Native.MobRenderType.painting = number(32);
Native.MobRenderType.pig = number(8);
Native.MobRenderType.player = number(27);
Native.MobRenderType.rabbit = number(46);
Native.MobRenderType.sheep = number(9);
Native.MobRenderType.silverfish = number(21);
Native.MobRenderType.skeleton = number(19);
Native.MobRenderType.slime = number(23);
Native.MobRenderType.smallFireball = number(38);
Native.MobRenderType.snowGolem = number(44);
Native.MobRenderType.snowball = number(29);
Native.MobRenderType.spider = number(20);
Native.MobRenderType.squid = number(36);
Native.MobRenderType.thrownPotion = number(31);
Native.MobRenderType.tnt = number(2);
Native.MobRenderType.unknownItem = number(30);
Native.MobRenderType.villager = number(12);
Native.MobRenderType.villagerZombie = number(39);
Native.MobRenderType.witch = number(47);
Native.MobRenderType.wolf = number(11);
Native.MobRenderType.zombie = number(14);
Native.MobRenderType.zombiePigman = number(15);

Native.PotionEffect.absorption = number(22);
Native.PotionEffect.blindness = number(15);
Native.PotionEffect.confusion = number(9);
Native.PotionEffect.damageBoost = number(5);
Native.PotionEffect.damageResistance = number(11);
Native.PotionEffect.digSlowdown = number(4);
Native.PotionEffect.digSpeed = number(3);
Native.PotionEffect.fireResistance = number(12);
Native.PotionEffect.harm = number(7);
Native.PotionEffect.heal = number(6);
Native.PotionEffect.healthBoost = number(21);
Native.PotionEffect.hunger = number(17);
Native.PotionEffect.invisibility = number(14);
Native.PotionEffect.jump = number(8);
Native.PotionEffect.movementSlowdown = number(2);
Native.PotionEffect.movementSpeed = number(1);
Native.PotionEffect.nightVision = number(16);
Native.PotionEffect.poison = number(19);
Native.PotionEffect.regeneration = number(10);
Native.PotionEffect.saturation = number(23);
Native.PotionEffect.waterBreathing = number(13);
Native.PotionEffect.weakness = number(18);
Native.PotionEffect.wither = number(20);

Native.Dimension.END = number(2);
Native.Dimension.NETHER = number(1);
Native.Dimension.NORMAL = number(0);

Native.ItemAnimation.bow = number(4);
Native.ItemAnimation.normal = number(0);

Native.BlockSide.DOWN = number(0);
Native.BlockSide.EAST = number(5);
Native.BlockSide.NORTH = number(2);
Native.BlockSide.SOUTH = number(3);
Native.BlockSide.UP = number(1);
Native.BlockSide.WEST = number(4);

Native.Enchantment.AQUA_AFFINITY = number(7);
Native.Enchantment.BANE_OF_ARTHROPODS = number(11);
Native.Enchantment.BLAST_PROTECTION = number(3);
Native.Enchantment.DEPTH_STRIDER = number(8);
Native.Enchantment.EFFICIENCY = number(15);
Native.Enchantment.FEATHER_FALLING = number(2);
Native.Enchantment.FIRE_ASPECT = number(13);
Native.Enchantment.FIRE_PROTECTION = number(1);
Native.Enchantment.FLAME = number(21);
Native.Enchantment.FORTUNE = number(18);
Native.Enchantment.INFINITY = number(22);
Native.Enchantment.KNOCKBACK = number(12);
Native.Enchantment.LOOTING = number(14);
Native.Enchantment.LUCK_OF_THE_SEA = number(23);
Native.Enchantment.LURE = number(24);
Native.Enchantment.POWER = number(19);
Native.Enchantment.PROJECTILE_PROTECTION = number(4);
Native.Enchantment.PROTECTION = number(0);
Native.Enchantment.PUNCH = number(20);
Native.Enchantment.RESPIRATION = number(6);
Native.Enchantment.SHARPNESS = number(9);
Native.Enchantment.SILK_TOUCH = number(16);
Native.Enchantment.SMITE = number(10);
Native.Enchantment.THORNS = number(5);
Native.Enchantment.UNBREAKING = number(17);

Native.EnchantType.all = number(16383);
Native.EnchantType.axe = number(512);
Native.EnchantType.book = number(16383);
Native.EnchantType.bow = number(32);
Native.EnchantType.fishingRod = number(4096);
Native.EnchantType.flintAndSteel = number(256);
Native.EnchantType.hoe = number(64);
Native.EnchantType.pickaxe = number(1024);
Native.EnchantType.shears = number(128);
Native.EnchantType.shovel = number(2048);
Native.EnchantType.weapon = number(16);

Native.BlockRenderLayer.alpha = number(4099);
Native.BlockRenderLayer.alpha_seasons = number(5);
Native.BlockRenderLayer.alpha_single_side = number(4);
Native.BlockRenderLayer.blend = number(6);
Native.BlockRenderLayer.doubleside = number(2);
Native.BlockRenderLayer.far = number(9);
Native.BlockRenderLayer.opaque = number(0);
Native.BlockRenderLayer.opaque_seasons = number(1);
Native.BlockRenderLayer.seasons_far = number(10);
Native.BlockRenderLayer.seasons_far_alpha = number(11);
Native.BlockRenderLayer.water = number(7);