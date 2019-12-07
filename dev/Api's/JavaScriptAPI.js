var __mod__ = "modName",
	__name__ = "DumpMaker",
	__dir__ = "/storage/emulated/0/games/com.mojang/mods/modName",
	__config__ = null,
	__debug_typecheck__ = null,
	runCustomSource = null,
	importLib = null,
	ItemID = 0,
	BlockID = 0;
function alert(msg) { };
function getCoreAPILevel() { };
function runOnMainThread(func) { };
function getMCPEVersion() { };

const Debug = {
	sysTime() { },
	addParticle(x, y, z, id, vx, vy, vz, data) { },
	message(message) { },
	warning(message) { },
	error(message) { },
	m() { },
	bitmap(bitmap, title) { },
}
const FileTools = {
	mntdir: "/mnt",
	root: "/storage/emulated/0/",
	workdir: "games/com.mojang/coreengine/",
	moddir: "games/com.mojang/mods/",
	modpedir: "games/com.mojang/modpe/",
	mkdir(dir) { },
	mkworkdirs() { },
	getFullPath(path) { },
	isExists(path) { },
	WriteText(file, text, add) { },
	ReadText(file) { },
	WriteImage(file, bitmap) { },
	ReadImage(file) { },
	ReadTextAsset(name) { },
	ReadImageAsset(name) { },
	ReadBytesAsset(name) { },
	GetListOfDirs(path) { },
	GetListOfFiles(path, ext) { },
	ReadKeyValueFile(dir, specialSeparator) { },
	WriteKeyValueFile(dir, data, specialSeparator) { },
	ReadJSON(dir) { },
	WriteJSON(dir, obj, beautify) { },
}
const Threading = {
	formatFatalErrorMessage(error, name, priority, formatFunc) { },
	initThread(name, func, priority, isErrorFatal, formatFunc) { },
	getThread(name) { },
}

// Config[JavaClass zhekasmirnov.launcher.api.mod.adaptedscript.AdaptedScriptAPI$Config]
const TileEntity = {
	resetEngine() { },
	registerPrototype(blockID, customPrototype) { },
	getPrototype(blockID) { },
	isTileEntityBlock(blockID) { },
	createTileEntityForPrototype(Prototype, addToUpdate) { },
	addTileEntity(x, y, z) { },
	addUpdatableAsTileEntity(updatable) { },
	getTileEntity(x, y, z) { },
	destroyTileEntity(tileEntity) { },
	destroyTileEntityAtCoords(x, y, z) { },
	isTileEntityLoaded(tileEntity) { },
	checkTileEntityForIndex(index) { },
	CheckTileEntities() { },
	DeployDestroyChecker(tileEntity) { },
}

const MobRegistry = {
	registerEntity(name) { },
	registerUpdatableAsEntity(updatable) { },
	spawnEntityAsPrototype(typeName, coords, extraData) { },
	getEntityUpdatable(entity) { },
	registerNativeEntity(entity) { },
	registerEntityRemove(entity) { },
	resetEngine() { },
}

const MobSpawnRegistry = {
	registerSpawn(entityType, rarity, condition, denyNaturalDespawn) { },
	getRandomSpawn(rarityMultiplier) { },
	getRandPosition() { },
	executeSpawn(spawn, position) { },
	/**@default 0 */
	counter: 0,
	tick() { },
	onChunkGenerated(x, z) { },
}

// GameObject GameObject(name, Prototype){}, 
const GameObject = {
	genUniqueName(name) { },
	registerClass(gameObjectClass) { },
	deployGameObject(gameobject) { },
	addGameObject(gameobject) { },
	removeGameObject(gameobject) { },
	resetEngine() { },
	getAllByType(type, clone) { },
	callForType() { },
	callForTypeSafe() { },
}

const ModAPI = {
	registerAPI(name, api, descr) { },
	requireAPI(name) { },
	requireGlobal(name) { },
	requireAPIdoc(name) { },
	requireAPIPropertyDoc(name, prop) { },
	getModByName(modName) { },
	isModLoaded(modName) { },
	addAPICallback(apiName, func) { },
	addModCallback(modName, func) { },
	getModList() { },
	getModPEList() { },
	addTexturePack(path) { },
	cloneAPI(api, deep) { },
	inheritPrototypes(source, target) { },
	cloneObject(source, deep, rec) { },
	debugCloneObject(source, deep, rec) { },
}

const Saver = {
	addSavesScope(name, loadFunc, saveFunc) { },
	registerScopeSaver(name, saver) { },
	registerObjectSaver(name, saver) { },
	registerObject(obj, saverId) { },
	setObjectIgnored(obj, ignore) { },
}
const Callback = {
	addCallback(name, func) {},
	invokeCallback(name, args) {},
}

const World = {
	__inmenu: {
		nativeSetBlock() { },
		nativeGetBlockID() { },
		nativeGetBlockData(x, y, z) { },
		setBlock(x, y, z, id, data) { },
		setFullBlock(x, y, z, fullTile) { },
		getBlock(x, y, z) { },
		getBlockID(x, y, z) { },
		getBlockData(x, y, z) { },
		destroyBlock(x, y, z, drop) { },
		getLightLevel(x, y, z) { },
		isChunkLoaded(x, z) { },
		isChunkLoadedAt(x, y, z) { },
		getTileEntity(x, y, z) { },
		addTileEntity(x, y, z) { },
		removeTileEntity(x, y, z) { },
		getContainer(x, y, z) { },
		getWorldTime() { },
		setWorldTime(time) { },
		setDayMode(day) { },
		setNightMode(night) { },
		getWeather() { },
		setWeather(weather) { },
		drop(x, y, z, id, count, data) { },
		explode(x, y, z, power, fire) { },
		getBiome(x, z) { },
		getBiomeName(x, z) { },
		getGrassColor(x, z) { },
		setGrassColor(x, z, color) { },
		getGrassColorRGB(x, z) { },
		setGrassColorRGB(x, z, rgb) { },
		canSeeSky(x, y, z) { },
		playSound(x, y, z, name, volume, pitch) { },
		playSoundAtEntity(entity, name, volume, pitch) { },
	},
	__inworld: {
		nativeSetBlock(x, y, z, id, data) { },
		nativeGetBlockID(x, y, z) { },
		nativeGetBlockData(x, y, z) { },
		setBlocknull(x, y, z) { },
		setFullBlock(x, y, z, fullTile) { },
		getBlock(x, y, z) { },
		getBlockIDnull(x, y, z) { },
		getBlockDatanull(x, y, z) { },
		destroyBlock(x, y, z, drop) { },
		getLightLevelnull(x, y, z) { },
		isChunkLoaded(x, z) { },
		isChunkLoadedAt(x, y, z) { },
		getTileEntity(x, y, z) { },
		addTileEntity(x, y, z) { },
		removeTileEntity(x, y, z) { },
		getContainer(x, y, z) { },
		getWorldTime() { },
		setWorldTime(time) { },
		setDayMode(day) { },
		setNightMode(night) { },
		getWeather() { },
		setWeather(weather) { },
		drop(x, y, z, id, count, data) { },
		explode(x, y, z, power, fire) { },
		getBiome(x, z) { },
		getBiomeName(x, z) { },
		getGrassColor(x, z) { },
		setGrassColor(x, z, color) { },
		getGrassColorRGB(x, z) { },
		setGrassColorRGB(x, z, rgb) { },
		playSound(x, y, z, name, volume, pitch) { },
		playSoundAtEntity(entity, name, volume, pitch) { },
	},
	isLoaded: false,
	setLoaded(isLoaded) { },
	isWorldLoaded() { },
	getThreadTime() { },
	nativeSetBlock() { },
	nativeGetBlockID() { },
	nativeGetBlockData(x, y, z) { },
	setBlock(x, y, z, id, data) { },
	setFullBlock(x, y, z, fullTile) { },
	getBlock(x, y, z) { },
	getBlockID(x, y, z) { },
	getBlockData(x, y, z) { },
	destroyBlock(x, y, z, drop) { },
	getLightLevel(x, y, z) { },
	isChunkLoaded(x, z) { },
	isChunkLoadedAt(x, y, z) { },
	getTileEntity(x, y, z) { },
	addTileEntity(x, y, z) { },
	removeTileEntity(x, y, z) { },
	getContainer(x, y, z) { },
	getWorldTime() { },
	setWorldTime(time) { },
	setDayMode(day) { },
	setNightMode(night) { },
	getWeather() { },
	setWeather(weather) { },
	drop(x, y, z, id, count, data) { },
	explode(x, y, z, power, fire) { },
	getBiome(x, z) { },
	getBiomeName(x, z) { },
	getGrassColor(x, z) { },
	setGrassColor(x, z, color) { },
	getGrassColorRGB(x, z) { },
	setGrassColorRGB(x, z, rgb) { },
	canSeeSky(x, y, z) { },
	playSound(x, y, z, name, volume, pitch) { },
	playSoundAtEntity(entity, name, volume, pitch) { }
}

const Entity = {
	getAll() { },
	getAllJS() { },
	EXTRA_DATA_PREFIX: "core.engine.",
	getExtra(ent, name) { },
	putExtra(ent, name, extra) { },
	getExtraJson(ent, name) { },
	putExtraJson(ent, name, obj) { },
	addEffect(ent, effectId, effectTime, effectData, strength, particles) { },
	clearEffect(ent, id) { },
	clearEffects(ent) { },
	damageEntity(ent, damage, cause, params) { },
	healEntity(ent, heal) { },
	getType(ent) { },
	setHitbox(ent, w, h) { },
	isExist(entity) { },
	spawn(x, y, z, type, skin) { },
	spawnCustom(name, x, y, z, extra) { },
	spawnCustomAtCoords(name, coords, extra) { },
	spawnAtCoords(coords, type, skin) { },
	remove(entity) { },
	getCustom(entity) { },
	getAge(ent) { },
	setAge(ent, age) { },
	getSkin(ent) { },
	setSkin(ent, skin) { },
	setTexture(ent, texture) { },
	getRender(ent) { },
	setRender(ent, render) { },
	rideAnimal(ent1, ent2) { },
	getNameTag(ent) { },
	setNameTag(ent, tag) { },
	getTarget(ent) { },
	setTarget(ent, target) { },
	getMobile(ent, mobile) { },
	setMobile(ent, mobile) { },
	getSneaking(ent) { },
	setSneaking(ent, sneak) { },
	getRider(ent) { },
	getRiding(ent) { },
	setFire(ent, fire, force) { },
	health(entity) { },
	getHealth(ent) { },
	setHealth(ent, health) { },
	getMaxHealth(ent) { },
	setMaxHealth(ent, health) { },
	setPosition(ent, x, y, z) { },
	getPosition(ent) { },
	addPosition(ent, x, y, z) { },
	setVelocity(ent, x, y, z) { },
	getVelocity(ent) { },
	addVelocity(ent, x, y, z) { },
	getDistanceBetweenCoords(coords1, coords2) { },
	getDistanceToCoords(ent, coords) { },
	getDistanceToEntity(ent1, ent2) { },
	getXZPlayerDis(entity) { },
	getLookAngle(ent) { },
	setLookAngle(ent, yaw, pitch) { },
	getLookVectorByAngle(angle) { },
	getLookVector(ent) { },
	getLookAt(ent, x, y, z) { },
	lookAt(ent, x, y, z) { },
	lookAtCoords(ent, coords) { },
	/**
	 * @param {array} params { speed: 0, denyY: false, jumpVel: 0 }
	 */
	moveToTarget(ent, target, params) { },
	/**
	 * @param {array} params { speed: 0, denyY: false, jumpVel: 0 }
	 */
	moveToAngle(ent, angle, params) { },
	/**
	 * @param {array} params { speed: 0, denyY: false, jumpVel: 0 }
	 */
	moveToLook(ent, params) { },
	/**
	 * @param ent - Entity id
	 * @returns x - проекция единичного вектора скорости сущности на ось x
	 * @returns y - проекция единичного вектора скорости сущности на ось y
	 * @returns z - проекция единичного вектора скорости сущности на ось z 
	 * @returns size - длина вектора скорости, численное значение скорости сущности
	 * @returns xzsize - скорость сущности в горизонтальной плоскости
	 */
	getMovingVector(ent) { },
	/**
	 * @param {number} ent - Entity id
	 * @returns pitch, yaw - возвращает угол передвижения сущности ent
	 */
	getMovingAngle(ent) { },
	getMovingAngleByPositions(pos1, pos2) { },
	findNearest(coords, type, maxRange) { },
	getAllInRange(coords, maxRange, type) { },
	getInventory(ent, handleNames, handleEnchant) { },
	getArmorSlot(ent, slot) { },
	setArmorSlot(ent, slot, id, count, data) { },
	getCarriedItem(ent, handleEnchant, handleNames) { },
	setCarriedItem(ent, id, count, data, enchant, name) { },
	getDroppedItem(ent) { },
	setDroppedItem(ent, id, count, data) { },
	getProjectileItem(projectile) { },
}

const Player = {
	get() { },
	getNameForEnt(ent) { },
	getName() { },
	getDimension() { },
	isPlayer(ent) { },
	getPointed() { },
	getInventory(loadPart, handleEnchant, handleNames) { },
	addItemToInventory(id, count, data) { },
	getCarriedItem(handleEnchant, handleNames) { },
	setCarriedItem(id, count, data, enchant, name) { },
	decreaseCarriedItem(count) { },
	getInventorySlot(slot) { },
	setInventorySlot(slot, id, count, data) { },
	getArmorSlot(slot) { },
	setArmorSlot(slot, id, count, data) { },
	getSelectedSlotId() { },
	setSelectedSlotId(slot) { },
	setPosition(x, y, z) { },
	getPosition() { },
	addPosition(x, y, z) { },
	setVelocity(x, y, z) { },
	getVelocity() { },
	addVelocity(x, y, z) { },
	experience() { },
	getExperience() { },
	setExperience(exp) { },
	addExperience(exp) { },
	level() { },
	getLevel() { },
	setLevel(level) { },
	addLevel(level) { },
	flying() { },
	getFlyingEnabled() { },
	setFlyingEnabled(enabled) { },
	getFlying() { },
	setFlying(enabled) { },
	exhaustion() { },
	getExhaustion() { },
	setExhaustion(value) { },
	hunger() { },
	getHunger() { },
	setHunger(value) { },
	saturation() { },
	getSaturation() { },
	setSaturation(value) { },
	health() { },
	getHealth() { },
	setHealth(value) { },
	score() { },
	getScore() { },
}

const Logger = {
	Log(msg, prefix),
	LogError(error),
	Flush();
}

const Game = {
	message(msg) { },
	prevent() { },
	tipMessage(msg) { },
	dialogMessage(message, title) { },
	setDifficulty(difficulty) { },
	getDifficulty() { },
	getMinecraftVersion() { },
	getEngineVersion() { return "" },
	selectLevel(name) { },
	setCamera(entity) { },
	setTickingSpeed(speed) { }
}
// Render RenderAPI(params){}, 
// Texture Texture(path){}, 
// EntityModel ModelAPI(parentModel){}, 
// EntityModelWatcher ModelWatcher(entity, model){}, 
// EntityAIClass EntityAI(customPrototype){}, 
// EntityAIWatcher EntityAIWatcher(customPrototype){}, 
const EntityAI = {
	Idle: {
		getDefaultPriority() { },
		getDefaultName() { },
		setParams(params) { },
		executionStarted() { },
		executionEnded() { },
		executionPaused() { },
		executionResumed() { },
		execute() { },
		setExecutionTimer(timer) { },
		removeExecutionTimer() { },
		executionTimer() { },
		isInstance: false,
		instantiate(parent, name) { },
		aiEntityChanged(entity) { },
		finishExecution() { },
		changeSelfPriority(priority) { },
		enableAI(name, priority, extra) { },
		disableAI(name) { },
		setPriority(name, priority) { },
		getAI(name) { },
		getPriority(name) { },
		attackedBy(entity) { },
		hurtBy(entity) { },
		projectileHit(projectile) { },
		death(entity) { },
		getDefaultPrioriy() { },
	},
	Follow: {
		getDefaultPriority() { },
		getDefaultName() { },
		params: {
			speed: 0.2,
			jumpVel: 0.45,
			rotateSpeed: 0.4,
			rotateRatio: 0.5,
			rotateHead: true,
			denyY: true,
		},
		setParams(params) { },
		executionStarted() { },
		executionEnded() { },
		executionPaused() { },
		executionResumed() { },
		execute() { },
		setExecutionTimer(timer) { },
		removeExecutionTimer() { },
		movingYaw: 0,
		isInstance: false,
		instantiate(parent, name) { },
		aiEntityChanged(entity) { },
		finishExecution() { },
		changeSelfPriority(priority) { },
		enableAI(name, priority, extra) { },
		disableAI(name) { },
		setPriority(name, priority) { },
		getAI(name) { },
		getPriority(name) { },
		attackedBy(entity) { },
		hurtBy(entity) { },
		projectileHit(projectile) { },
		death(entity) { },
	},
	Panic: {
		getDefaultPriority() { },
		getDefaultName() { },
		params: {
			speed: 0.22,
			angular_speed: 0.5
		},
		setParams(params) { },
		executionStarted() { },
		executionEnded() { },
		executionPaused() { },
		executionResumed() { },
		execute() { },
		setExecutionTimer(timer) { },
		removeExecutionTimer() { },
		data: {
			yaw: 0,
			add: 0
		},
		isInstance: false,
		instantiate(parent, name) { },
		aiEntityChanged(entity) { },
		finishExecution() { },
		changeSelfPriority(priority) { },
		enableAI(name, priority, extra) { },
		disableAI(name) { },
		setPriority(name, priority) { },
		getAI(name) { },
		getPriority(name) { },
		attackedBy(entity) { },
		hurtBy(entity) { },
		projectileHit(projectile) { },
		death(entity) { },
		randomize() { },
	},
	Wander: {
		getDefaultPriority() { },
		getDefaultName() { },
		params: {
			speed: 0.08,
			angular_speed: 0.1,
			delay_weight: 0.3
		},
		setParams(params) { },
		executionStarted() { },
		executionEnded() { },
		executionPaused() { },
		executionResumed() { },
		execute() { },
		__execute() { },
		setExecutionTimer(timer) { },
		removeExecutionTimer() { },
		data: {
			yaw: 0,
			add: 0,
			delay: false,
			_delay: true
		},
		isInstance: false,
		instantiate(parent, name) { },
		aiEntityChanged(entity) { },
		finishExecution() { },
		changeSelfPriority(priority) { },
		enableAI(name, priority, extra) { },
		disableAI(name) { },
		setPriority(name, priority) { },
		getAI(name) { },
		getPriority(name) { },
		attackedBy(entity) { },
		hurtBy(entity) { },
		projectileHit(projectile) { },
		death(entity) { },
		randomize() { },
	},
	Attack: {
		getDefaultPriority() { },
		getDefaultName() { },
		params: {
			attack_damage: 5,
			attack_range: 2.5,
			attack_rate: 12
		},
		setParams(params) { },
		executionStarted() { },
		executionEnded() { },
		executionPaused() { },
		executionResumed() { },
		execute() { },
		setExecutionTimer(timer) { },
		removeExecutionTimer() { },
		data: {
			timer: 0
		},
		isInstance: false,
		instantiate(parent, name) { },
		aiEntityChanged(entity) { },
		finishExecution() { },
		changeSelfPriority(priority) { },
		enableAI(name, priority, extra) { },
		disableAI(name) { },
		setPriority(name, priority) { },
		getAI(name) { },
		getPriority(name) { },
		attackedBy(entity) { },
		hurtBy(entity) { },
		projectileHit(projectile) { },
		death(entity) { },
	},
	Swim: {
		getDefaultPriority() { },
		getDefaultName() { },
		params: {
			velocity: 0.2
		},
		setParams(params) { },
		executionStarted() { },
		executionEnded() { },
		executionPaused() { },
		executionResumed() { },
		execute() { },
		setExecutionTimer(timer) { },
		removeExecutionTimer() { },
		data: {
			executionTimer: -1
		},
		isInstance: false,
		instantiate(parent, name) { },
		aiEntityChanged(entity) { },
		finishExecution() { },
		changeSelfPriority(priority) { },
		enableAI(name, priority, extra) { },
		disableAI(name) { },
		setPriority(name, priority) { },
		getAI(name) { },
		getPriority(name) { },
		attackedBy(entity) { },
		hurtBy(entity) { },
		projectileHit(projectile) { },
		death(entity) { },
		inWater: false,
	},
	PanicWatcher: {


		getDefaultPriority() { },
		getDefaultName() { },
		params: {
			panic_time: 200,
			priority_panic: 5,
			priority_default: 1,
			name: "panic"
		},
		setParams(params) { },
		executionStarted() { },
		executionEnded() { },
		executionPaused() { },
		executionResumed() { },
		execute() { },
		__execute() { },
		setExecutionTimer(timer) { },
		removeExecutionTimer() { },
		data: {
			timer: -1
		},
		isInstance: false,
		instantiate(parent, name) { },
		aiEntityChanged(entity) { },
		finishExecution() { },
		changeSelfPriority(priority) { },
		enableAI(name, priority, extra) { },
		disableAI(name) { },
		setPriority(name, priority) { },
		getAI(name) { },
		getPriority(name) { },
		attackedBy(entity) { },
		hurtBy() { },
		projectileHit(projectile) { },
		death(entity) { },
	}
}


const GenerationUtils = {
	isTerrainBlock(id) { },
	isTransparentBlock(id) { },
	canSeeSky(x, y, z) { },
	randomXZ(cx, cz) { },
	randomCoords(cx, cz, lowest, highest) { },
	findSurface(x, y, z) { },
	findHighSurface(x, z) { },
	findLowSurface(x, z) { },
	__lockedReal: {
		id: 0,
		data: 0
	},
	lockInBlock(id, data, checkerTile, checkerMode) { },
	setLockedBlock(x, y, z) { },
	genMinable(x, y, z, params) { },
	generateOre(x, y, z, id, data, amount, noStoneCheck) { },
}
Animation.Base(., ., .).
const Animation = {
	Base(x, y, z): {
		/**
		 * Создает анимацию в игре
		 */
		load(),
		/**
		 * Cоздает динамичную анимацию в игре, используя функцию callable для изменения рендера и положения. 
		 * @param {Function} callable 
		 */
		loadCustom(callable),
		/**
		 * @param {number} x новая позиция по x
		 * @param {number} y новая позиция по y
		 * @param {number} z новая позиция по z
		 */
		setPos(x, y, z),
		/**
		 * Получает координаты анимации в мире.
		 * @returns x y z
		 */
		coords,
		/** 
		 * Возвращает 0. Вдруг кому пригодится. 
		 */
		getAge(),
		/** 
		 * Обновляет объект рендера анимации.
		 */
		refresh(),
		/** 
		 * Уничтожает анимацию в мире.
		 */
		destroy(),
		/** 
		 * Задает настройки для анимации 
		 * @param {{}} description render: number,skin: string, scale: number
		 */
		describe(description){ },
}
}
// Animation.base AnimationBase(x, y, z){}, 
// Animation.Base AnimationBase(x, y, z){}, 
// Animation.item AnimationItem(x, y, z){}, 
// Animation.Item AnimationItem(x, y, z){}, 

const Particles = {
	addParticlenull() { },
	addFarParticlenull() { },
	line(particle, coords1, coords2, gap, vel, data) { }
}

var texture_set = {
	bottom: { "название1", индекс1 }, // bottom
	top: { "название2", индекс2 }, // top
	back: { "название3", индекс3 }, // back
	front: { "название4", индекс4 }, // front
	left: { "название5", индекс5 }, // left
	right: { "название6", индекс6 }  // right
}

const BlockRenderer = {
	Model(): {
		addBox(x1, y1, z1, x2, y2, z2, id, data),
		addBox(x1, y1, z1, x2, y2, z2, "name", index), …
		addBox(x1, y1, z1, x2, y2, z2, [… texture_set …]),
		addMesh(mesh),
	},
	Model(x1, y1, z1, x2, y2, z2, [… texture_set …]),
	Model(x1, y1, z1, x2, y2, z2, "name", index),
	setCustomCollisionShape(id, data, model),
	Model(x1, y1, z1, x2, y2, z2, id, data),
	setStaticICRender(id, data, model),
	mapAtCoords(x, y, z, model),
	Model([… texture_set …]),
	unmapAtCoords(x, y, z),
	Model("name", index),
	Model(id, data)
	Model(mesh),
}

const ICRender = {
	Model(): {
		addEntry(): {
			setCondition()
		}
	},
	CollisionShape(): {
		addEntry(): {
			setCondition(),
			addBox(x1, y1, z1, x2, y2, z2)
		}
	},
	/**
	 * Получение группы
	 * @param {String} name - имя запрашиваемой групы
	 * 
	 * Возвращает группу, зарегистрированную под данным именем, если такой нет, создает новую и регистрирует. Имя нужно для удобства доступа и совместимости между модами
	 */
	getGroup(name): {
		/**
		 * добавляет блок с данным id и data в группу, если вместо data передано число -1, в группу будут добавлены все блоки с этим id
		 */
		add(id, data),
		/**
		 * возвращает имя группы
		 * @returns name
		 */
		getName()
	},
	/**
	 * Создает и возвращает новую группу без имени, используется для создания локальных групп
	 */
	getUnnamedGroup(): {
		/**
		 * добавляет блок с данным id и data в группу, если вместо data передано число -1, в группу будут добавлены все блоки с этим id
		 */
		add(id, data),
		/**
		 * возвращает имя группы
		 * @returns name
		 */
		getName()
	},
	/**
	 * Условие проверки одного блока на координатах (координаты задаются относительно позиции блока, к примеру, позиция на 1 блоквыше будет задаваться как 0, 1, 0). Если параметр exclude false, условие выполнится, если данная группа содержит блок на данных координатах, а если exclude true, то если группа его не содержит.
	 */
	/**
	 * 
	 * @param {number} x координаты блока
	 * @param {number} y координаты блока
	 * @param {number} z координаты блока
	 * @param {string} group группа
	 * @param {boolean} exclude будет выполняться если не стоит на координатах. если true
	 */
	BLOCK(x, y, z, group, exclude),
	/**
	 * Логический оператор НЕТ от данного условия, выполняется, если данное условие не выполняется.
	 * @param {*} condition условие
	 */
	NOT(condition),
	/**
	 * Логический оператор И, принимает 2 или больше условий на вход, выполняется, если все эти условия тоже выполняются.
	 * @param {*} condition1 условие 1
	 * @param {*} condition2 условие 2
	 */
	AND(condition1, condition2, …),
	/**
	 * 
	 * @param {*} condition1 условие 1
	 * @param {*} condition2 условие 2
	 */
	OR(condition1, condition2, …)
}
const Block = {
	getNumericId(id) { },
	createBlock(namedID, defineData, blockType) { },
	createBlockWithRotation(namedID, defineData, blockType) { },
	isNativeTile(id) { },
	registerDropFunctionForID(numericID, dropFunc, level) { },
	registerDropFunction(namedID, dropFunc, level) { },
	defaultDropFunction(blockCoords, blockID, blockData, diggingLevel) { },
	getDropFunction(id) { },
	setDestroyLevelForID(id, level) { },
	setDestroyLevel(namedID, level) { },
	setDestroyTime(namedID, time) { },
	getDestroyTime(numericID) { },
	setTempDestroyTime(numericID, time) { },
	setBlockMaterial(namedID, material, level) { },
	setRedstoneTile(namedID, data, isRedstone) { },
	onBlockDestroyed(coords, fullTile) { },
	getBlockDropViaItem(block, item, coords) { },
	registerPlaceFunctionForID(block, func) { },
	registerPlaceFunction(namedID, func) { },
	getPlaceFunc(block) { },
	setBlockShape(id, pos1, pos2, data) { },
	setShape(id, x1, y1, z1, x2, y2, z2, data) { },
	createSpecialType(description, nameKey) { },
	TYPE_BASE: "createBlock",
	TYPE_ROTATION: "createBlockWithRotation",
	setPrototype(namedID, Prototype) { },
}

const Item = {
	getNumericId(id) { },
	getItemById(id) { },
	createItem(namedID, name, texture, params) { },
	createFoodItem(namedID, name, texture, params) { },
	createFuelItem(namedID, name, texture, params) { },
	createArmorItem(namedID, name, texture, params) { },
	createThrowableItem(namedID, name, texture, params) { },
	isNativeItem(id) { },
	getMaxDamage(id) { },
	getMaxStack(id) { },
	getName(id, data, encode) { },
	isValid(id, data) { },
	addToCreative(id, count, data) { },
	describeItem(numericID, description) { },
	setCategory(id, category) { },
	setEnchantType(id, enchant, value) { },
	setToolRender(id, enabled) { },
	setMaxDamage(id, maxdamage) { },
	setGlint(id, enabled) { },
	setLiquidClip(id, enabled) { },
	setStackedByData(id, enabled) { },
	setProperties(id, props) { },
	setUseAnimation(id, animType) { },
	registerUseFunctionForID(numericID, useFunc) { },
	registerUseFunction(namedID, useFunc) { },
	onItemUsed(coords, item, block) { },
	registerThrowableFunctionForID(numericID, useFunc) { },
	registerThrowableFunction(namedID, useFunc) { },
	onProjectileHit(projectile, item, target) { },
	registerIconOverrideFunction(namedID, func) { },
	onIconOverride(item) { },
	registerNameOverrideFunction(namedID, func) { },
	onNameOverride(item, name) { },
	registerNoTargetUseFunction(namedID, func) { },
	onUseNoTarget(item) { },
	registerUsingReleasedFunction(namedID, func) { },
	onUsingReleased(item, ticks) { },
	registerUsingCompleteFunction(namedID, func) { },
	onUsingComplete(item) { },
	registerDispenseFunction(namedID, func) { },
	onDispense(coords, item) { },
	TYPE_BASE: "createItem",
	TYPE_FOOD: "createFoodItem",
	TYPE_ARMOR: "createArmorItem",
	TYPE_THROWABLE: "createThrowableItem",
	setPrototype(namedID, Prototype) { },
}

Container = {
	getSlot(name) { },
	setSlot(name, id, count, data) { },
	clearSlot(name) { },
	validateSlot(name) { },
	validateAll() { },
	dropAt(x, y, z) { },
	refreshSlots() { },
	applyChanges() { },
	openAs(obj) { },
	isOpened() { },
	close() { },
	getGuiContent() { },
	getGuiScreen() { },
	getElement(name) { },
	requireElement(name, type) { },
	setScale(name, value) { },
	setScaleAsLiquid(name, id, value) { },
	setText(name, text) { },
	setTextSize(name, size) { },
	setTextColor(name, color) { },
	setTextShadow(name, shadow) { },
}
const ToolAPI = {
	/**
	 * @argument false 
	 * @default false
	 */
	needDamagableItemFix: false,
	/**
	 * Добавляет материал блоку
	 * @param {string} name имя самого материала
	 * @param {number} breakingMultiplier число которые будет уровнем ломания блока
	 */
	addBlockMaterial(name, breakingMultiplier) { },
	/**
	 * Добавляет материал инструменту
	 * @param {string} name имя материала
	 * @param {string} material материал который будет создан для инструмента
	 */
	addToolMaterial(name, material) { },
	/**
	 * Регистрирует инструмент
	 * @param {number} id уникальный идентификатор
	 * @param {string} toolMaterial материал из которого сделан инструмент
	 * @param {string} blockMaterials материалы которые может ломать
	 * @param {Array} params параметры
	 */
	registerTool(id, toolMaterial, blockMaterials, params) { },
	/**
	 * Регистрирует меч
	 * @param {number} id уникальный идентификатор
	 * @param {string} toolMaterial материал из которого сделан инструмент
	 * @param {Array} params параметры
	 */
	registerSword(id, toolMaterial, params) { },
	/**
	 * Регистрация материала для блока
	 * @param {String} uid уникальный идентификатор
	 * @param {String} materialName имя материала
	 * @param {number} level уровень
	 * @param {boolean} isNative является ли ванильным предметом
	 */
	registerBlockMaterial(uid, materialName, level, isNative) { },
	/**
	 * Регистрация уровня ломания для блока
	 * @param {number} uid уникальный идентификатор
	 * @param {number} level уровень
	 */
	registerBlockDiggingLevel(uid, level) { },
	/**
	 * Регистрирует для блоков в массиве UIDs материал
	 * @param {string} materialName имя материала
	 * @param {object} UIDs уникальные идентификаторы
	 * @param {boolean} isNative является ли ванильным предметом
	 */
	registerBlockMaterialAsArray(materialName, UIDs, isNative) { },
	/**
	 * Обновляет список
	 */
	refresh() { },
	/**
	 * Возвращает данные блока
	 * @param {number} blockID идентификатор блока
	 * @return {number} data
	 */
	getBlockData(blockID) { },
	/**
	 * Возвращает материал блока
	 * @param {number} blockID идентификатор блока
	 * @return {string} material
	 */
	getBlockMaterial(blockID) { },
	/**
	 * Возвращает уровень ломания блока
	 * @param {number} blockID идентификатор блока
	 * @return {number} level
	 */
	getBlockDestroyLevel(blockID) { },
	/**
	 * Возвращает зачарование из extra
	 * @param {number} enchant 
	 */
	getEnchantExtraData(enchant) { },

	fortuneDropModifier(drop, level) { },

	getDestroyTimeViaTool(fullBlock, toolItem, coords, ignoreNative) { },

	getToolData(itemID) { },
	getToolLevel(itemID) { },
	getToolLevelViaBlock(itemID, blockID) { },
	getCarriedToolData() { },
	getCarriedToolLevel() { },
	startDestroyHook(coords, block, carried) { },
	destroyBlockHook(coords, block, carried) { },
	LastAttackTime: 0,
	playerAttackHook(attackerPlayer, victimEntity, carried) { },
	resetEngine() { },
	dropExpOrbs(x, y, z, value) { },
	dropOreExp(coords, minVal, maxVal, modifier) { },
}

const Armor = {
	registerFuncs(id, funcs) { },
	preventDamaging(id) { }
}

const LiquidRegistry = {
	liquidStorageSaverId: 1306847136,
	liquids: {
		water: {
			key: "water",
			name: "water",
			uiTextures: {
				0: string(_liquid_water_texture_0),
			},
			addUITexture(name) { },
			addModelTexture(name) { },
		},
		lava: {
			key: "lava",
			name: "lava",
			uiTextures: {
				0: string(_liquid_lava_texture_0),
			},
			addUITexture(name) { },
			addModelTexture(name) { }
		},
		milk: {
			key: "milk",
			name: "milk",
			uiTextures: {
				0: string(_liquid_milk_texture_0),
			},
			addUITexture(name) { },
			addModelTexture(name) { }
		}
	},
	registerLiquid(key, name, uiTextures, modelTextures) { },
	getLiquidData(key) { },
	isExists(key) { },
	getLiquidName(key) { },
	getLiquidUITexture(key, width, height) { },
	getLiquidUIBitmap(key, width, height) { },
	FullByEmpty: {
		325: [{ water: { id: 325, data: 8 } }],
		374: [{ water: { id: 373, data: 0 } }],
		325: [{ lava: { id: 325, data: 10 } }],
		325: [{ milk: { id: 325, data: 1 } }]
	},
	EmptyByFull: {
		325: [{ 8: { id: 325, data: 0, liquid: "water" } }],
		373: [{ 0: { id: 374, data: 0, liquid: "water" } }],
		325: [{ 10: { id: 325, data: 0, liquid: "lava" } }],
		325: [{ 1: { id: 325, data: 0, liquid: "milk" } }]
	},
	registerItem(liquid, empty, full) { },
	getEmptyItem(id, data) { },
	getItemLiquid(id, data) { },
	getFullItem(id, data, liquid) { },
	Storage(tileEntity) { }
}

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
		movementSpeed: 1,
		movementSlowdown: 2,
		digSpeed: 3,
		digSlowdown: 4,
		damageBoost: 5,
		heal: 6,
		harm: 7,
		jump: 8,
		confusion: 9,
		regeneration: 10,
		damageResistance: 11,
		fireResistance: 12,
		waterBreathing: 13,
		invisibility: 14,
		blindness: 15,
		nightVision: 16,
		hunger: 17,
		weakness: 18,
		poison: 19,
		wither: 20
		healthBoost: 21,
		absorption: 22,
		saturation: 23,
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
}