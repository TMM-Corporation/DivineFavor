declare function alert(message: string): void
declare function getCoreAPILevel(): String
declare function runOnMainThread(func: Function): void
declare function getMCPEVersion(): String | '1.0.3.12'
declare function IMPORT(name: String, func: String): {}
declare function importLib(name: String): {}
declare var __mod__: {}
declare var __name__: String | 'DivineFavor'
declare var __dir__: String | 'sdcard/games/com.mojang/mods/DivineFavor'
declare var __config__: {}
declare var __debug_typecheck__: any
declare var runCustomSource: any
declare var ItemID: Number[]
declare var BlockID: Number[]
declare namespace Debug {
	/**
	 * Вывод системное время
	 */
	function sysTime(): String
	/**
	 * Создает отладочные частицы
	 * @param x координата
	 * @param y координата
	 * @param z координата
	 * @param id идентификатор частицы
	 * @param vx вектор
	 * @param vy вектор
	 * @param vz вектор
	 * @param data дата
	 */
	function addParticle(x: Number, y: Number, z: Number, id: Number, vx: Number, vy: Number, vz: Number, data: Number): void
	/**
	 * Выводит отладочное сообщение в чат
	 * @param message сообщение
	 */
	function message(message: String): void
	/**
	 * Выводит отладочное сообщение в чат
	 * @param message сообщение
	 */
	function warning(message: String): void
	/**
	 * Выводит отладочное сообщение в чат
	 * @param message сообщение
	 */
	function error(message: String): void
	/**
	 * Выводит Диалоговое окно с картинкой Bitmap и заголовком title
	 * @param bitmap изображение android.graphics.Bitmap
	 * @param title заголовок
	 */
	function bitmap(bitmap: any, title: String): void
}
/**
 * Инструментарий работы с файлами
 */
declare namespace FileTools {
	const mntdir: String
	const root: 'sdcard/'
	const workdir: 'games/com.mojang/innercore/'
	const moddir: 'games/com.mojang/mods'
	const modpedir: 'games/com.mojang/modpe'
	/** 
	 * Создает новою папку по пути path
	 * @param path путь к папке
	 */
	function mkdir(path: String): void
	/**
	 * Создает рабочие папки Core Engine (workdir, moddir, modpedir)
	 */
	function mkworkdirs(): void
	/** 
	 * Возвращает полный путь к папке
	 * @param path путь
	 */
	function getFullPath(path: String): void
	/** 
	 * Проверяет по пути path существует ли файл
	 * @param path 
	 */
	function isExists(path: String): Boolean
	/**
	 * Записывает текст в файл по пути path
	 * @param path путь к файлу
	 * @param text записываемый текст
	 * @param add добавлять ли в файл
	 */
	function WriteText(path: String, text: String, add: Boolean): void
	/**
	 * Читает текст по пути path
	 * @param path путь к файлу
	 */
	function ReadText(path: String): String
	/**
	 * Записывает изображение, объект типа Bitmap, в файл по пути path
	 * @param path путь к файлу
	 * @param bitmap android.graphics.Bitmap
	 */
	function WriteImage(path: String, bitmap: any): void
	/**
	 * Считывает изображение по пути path в объект типа Bitmap
	 * @param path путь к файлу
	 */
	function ReadImage(path: String): void
	/**
	 * Считывает файл из ресурспака по пути path в строку
	 * @param path 
	 */
	function ReadTextAsset(path: String): String
	/**
	 * Считывает изображение из ресурспака по пути path в объект типа Bitmap
	 * @param path путь к файлу
	 */
	function ReadImageAsset(path: String): void
	/**
	 * Считывает байты из ресурспака по пути path в Java-массив типа byte
	 * @param path путь к файлу
	 */
	function ReadBytesAsset(path: String): void
	/**
	 * Возвращает список каталогов по данному пути в виде Javascript-массива объектов File
	 * @param path путь к файлу
	 */
	function GetListOfDirs(path: String): String[]
	/**
	 * Возвращает список файлов по данному пути в виде Javascript-массива объектов File. Если задан второй аргумент, возвращает только файлы с заданным расширением
	 * @param path путь к файлу
	 * @param extension расширение 
	 */
	function GetListOfFiles(path: String, extension: String): String[]
	/**
	 * Возвращает объект, состоящих из пар ключ:значение, считанных из файла по пути path. При этом ни ключ, ни значение не очищаются от пробелов, поэтому следует делать это вручную при необходимости
	 * @param path путь к файлу
	 * @param specialSeparator разделитель, по умолчанию используется ':'
	 */
	function ReadKeyValueFile(path: String, specialSeparator: String): void
	/**
	 * Записывает объект, состоящий из пар ключ:значение.
	 * @param path путь к файлу
	 * @param object записываемый объект 
	 * @param specialSeparator разделитель, по умолчанию используется ':'
	 */
	function WriteKeyValueFile(path: String, object: [], specialSeparator: String): void
	/**
	 * Считывает файл с объектом JSON по заданому пути в Javascript-объект
	 * @param path путь к файлу
	 */
	function ReadJSON(path: String): {}
	/**
	 * записывает в JSON-файл по заданому пути Javascript-объект
	 * @param path путь к файлу
	 * @param JSON JSON объект 
	 * @param beautify если beautify равен true, то вывод будет красиво отформатирован
	 */
	function WriteJSON(path: String, JSON: {}, beautify: Boolean): void
}
declare namespace Threading {
	function formatFatalErrorMessage(error: any, name: String, priority: Number, formatfunc: Function): void
	/**
	 * Создает поток с именем name, выполняющий функцию func приоритетом priority.
	 * @param name имя потока
	 * @param func функция
	 * @param priority приоритет
	 * @param isErrorFatal может содержать критические ошибки
	 * @param formatfunc формат функции
	 */
	function initThread(name: String, func: Function, priority: Number, isErrorFatal: any, formatfunc: Function): void
	/**
	 * Возвращаяет поток по имени name
	 * @param name имя потока
	 */
	function getThread(name: String): void
}

declare namespace TileEntity {
	// interface customPrototype {
	// 	defaultValues: {};
	// 	container: {};
	// 	liquidStorage: {};
	// 	created(): void;
	// 	init():void;
	// 	tick():void
	// }
	function resetEngine(): void
	/**
	 * Регистрирует новое TileEntity на блок blockID прототип prototype
	 * @param blockID идентификатор блока 
	 * @param prototype прототип 
	 */
	function registerPrototype(blockID: Number, prototype: {}): void
	/**
	 * Возвращает прототип блока по его ид blockID
	 * @param blockID идентификатор блока
	 */
	function getPrototype(blockID: Number): {}
	/**
	 * Возвращает значение true если blockID является TileEntity, если нет то false
	 * @param blockID идентификатор блока
	 */
	function isTileEntityBlock(blockID: Number): Boolean
	/**
	 * Добавляет к существующему прототипу Prototype объект addToUpdate
	 * @param Prototype прототип
	 * @param addToUpdate объект к добавлению
	 */
	function createTileEntityForPrototype(Prototype: any, addToUpdate: {}): void
	/**
	 * Устанавливает на координаты x, y, z - TileEntity
	 * @param x Координата
	 * @param y Координата
	 * @param z Координата
	 */
	function addTileEntity(x: Number, y: Number, z: Number): void
	/**
	 * Добавляет TileEntity модуль обновляемых обьектов Updatable
	 * @param updatable объект
	 */
	function addUpdatableAsTileEntity(updatable: any): void
	/**
	 * Возвращает TileEntity на координатах x, y, z
	 * @param x Координата
	 * @param y Координата
	 * @param z Координата
	 */
	function getTileEntity(x: Number, y: Number, z: Number): void
	/**
	 * Уничтожает объект tileEntity
	 * @param tileEntity объект
	 */
	function destroyTileEntity(tileEntity: any): void
	/**
	 * Убирает TileEntity с координат x, y, z
	 * @param x Координата
	 * @param y Координата
	 * @param z Координата
	 */
	function destroyTileEntityAtCoords(x: Number, y: Number, z: Number): void
	/**
	 * Возвращает значение true если tileEntity был загружен, если нет то false
	 * @param tileEntity объект
	 */
	function isTileEntityLoaded(tileEntity: any): void
	/**
	 * Проверяет TileEntity по индексу index
	 * @param index индекс
	 */
	function checkTileEntityForIndex(index: Number): void
	/**
	 * Проверяет все существующие TileEntity
	 */
	function CheckTileEntities(): void
	/**
	 * Запускает проверку на удаление TileEntity
	 * @param tileEntity объект
	 */
	function DeployDestroyChecker(tileEntity: any): void
}
declare namespace MobRegistry {
	/**
	 * Региструриет новое существо с имененм name
	 * @param name имя существа
	 */
	function registerEntity(name: String): void
	/**
	 * Регистрирует модуль обновляемых обьектов как Entity
	 * @param updatable объект
	 */
	function registerUpdatableAsEntity(updatable: {}): void
	/**
	 * 
	 * @param typename тип существа
	 * @param coords координаты {x: x, y: y, z: z}
	 * @param extraData экстра дата сущности
	 */
	function spawnEntityAsPrototype(typename: String, coords: { x: Number, y: Number, z: Number }, extraData: any): void
	/**
	 * Возвращает обновляемый модуль Updatable с сущности Entity
	 * @param entity существо
	 */
	function getEntityUpdatable(entity: Number): void
	/**
	 * Регистрирует существо entity как нативное
	 * @param entity существо
	 */
	function registerNativeEntity(entity: Number): void
	/**
	 * Удаляет существо entity
	 * @param entity существо
	 */
	function registerEntityRemove(entity: Number): void
	function resetEngine(): void
}

declare namespace Updatable {
	/**
	 * Создает новый обновляемый объект Updatable
	 * @param updatable объект
	 */
	function addUpdatable(updatable: {}): {}
	/**
	 * удаляет объект updatable
	 * @param updatable объект
	 */
	function removeUpdatable(updatable: {}): void
	/**
	 * Возвращает значение true если объект updatable обновляется иначе false
	 * @param updatable объект
	 */
	function isInUpdate(updatable: {}): Boolean
}
declare namespace MobSpawnRegistry {
	function registerSpawn(entityType: any, rarity: Number, condition: any, denyNaturalDespawn: any): void
	function getRandomSpawn(rarityMultiplier: any): void
	function getRandPosition(): void
	function executeSpawn(spawn: any, position: any): void
	const counter: Number
	function tick(): void
	function onChunkGenerated(x: Number, z: Number): void
}
declare namespace GameObject {
	function genUniqueName(name: String): void
	function registerClass(gameObjectClass: any): void
	function deployGameObject(gameobject: any): void
	function addGameObject(gameobject: any): void
	function removeGameObject(gameobject: any): void
	function resetEngine(): void
	function getAllByType(type: Number, clone: any): void
	function callForType(): void
	function callForTypeSafe(): void
}
declare namespace ModAPI {
	function registerAPI(name: String, api: any, descr: any): void
	function requireAPI(name: String): void
	function requireGlobal(name: String): void
	function requireAPIdoc(name: String): void
	function requireAPIPropertyDoc(name: String, prop: any): void
	function getModByName(modname: String): void
	function isModLoaded(modname: String): void
	function addAPICallback(apiname: String, func: Function): void
	function addModCallback(modname: String, func: Function): void
	function getModList(): void
	function getModPEList(): void
	function addTexturePack(path: String): void
	function cloneAPI(api: any, deep: any): void
	function inheritPrototypes(source: any, target: any): void
	function cloneObject(source: any, deep: any, rec: any): void
	function debugCloneObject(source: any, deep: any, rec: any): void
}
declare namespace Saver {
	function addSavesScope(name: String, loadfunc: Function, savefunc: Function): void
	function registerScopeSaver(name: String, saver: any): void
	function registerObjectSaver(name: String, saver: any): void
	function registerObject(obj: any, saverId: any): void
	function setObjectIgnored(obj: any, ignore: any): void
}
declare namespace Callback {
	function addCallback(name: String, func: Function): void
	function invokeCallback(name: String, args: any): void
}
declare namespace World {
	namespace __inmenu {
		function nativeSetBlock(): void
		function nativeGetBlockID(): void
		function nativeGetBlockData(x: Number, y: Number, z: Number): void
		function setBlock(x: Number, y: Number, z: Number, id: Number, data: Number): void
		function setFullBlock(x: Number, y: Number, z: Number, fullTile: any): void
		function getBlock(x: Number, y: Number, z: Number): void
		function getBlockID(x: Number, y: Number, z: Number): void
		function getBlockData(x: Number, y: Number, z: Number): void
		function destroyBlock(x: Number, y: Number, z: Number, drop: any): void
		function getLightLevel(x: Number, y: Number, z: Number): void
		function isChunkLoaded(x: Number, z: Number): void
		function isChunkLoadedAt(x: Number, y: Number, z: Number): void
		function getTileEntity(x: Number, y: Number, z: Number): void
		function addTileEntity(x: Number, y: Number, z: Number): void
		function removeTileEntity(x: Number, y: Number, z: Number): void
		function getContainer(x: Number, y: Number, z: Number): void
		function getWorldTime(): void
		function setWorldTime(time: any): void
		function setDayMode(day: Number): void
		function setNightMode(night: any): void
		function getWeather(): void
		function setWeather(weather: any): void
		function drop(x: Number, y: Number, z: Number, id: Number, count: Number, data: Number): void
		function explode(x: Number, y: Number, z: Number, power: any, fire: any): void
		function getBiome(x: Number, z: Number): void
		function getBiomeName(x: Number, z: Number): void
		function getGrassColor(x: Number, z: Number): void
		function setGrassColor(x: Number, z: Number, color: any): void
		function getGrassColorRGB(x: Number, z: Number): void
		function setGrassColorRGB(x: Number, z: Number, rgb: any): void
		function canSeeSky(x: Number, y: Number, z: Number): void
		function playSound(x: Number, y: Number, z: Number, name: String, volume: any, pitch: any): void
		function playSoundAtEntity(entity: Number, name: String, volume: any, pitch: any): void
	}
	namespace __inworld {
		function nativeSetBlock(x: Number, y: Number, z: Number, id: Number, data: Number): void
		function nativeGetBlockID(x: Number, y: Number, z: Number): void
		function nativeGetBlockData(x: Number, y: Number, z: Number): void
		function setBlocknull(x: Number, y: Number, z: Number): void
		function setFullBlock(x: Number, y: Number, z: Number, fullTile: any): void
		function getBlock(x: Number, y: Number, z: Number): void
		function getBlockIDnull(x: Number, y: Number, z: Number): void
		function getBlockDatanull(x: Number, y: Number, z: Number): void
		function destroyBlock(x: Number, y: Number, z: Number, drop: any): void
		function getLightLevelnull(x: Number, y: Number, z: Number): void
		function isChunkLoaded(x: Number, z: Number): void
		function isChunkLoadedAt(x: Number, y: Number, z: Number): void
		function getTileEntity(x: Number, y: Number, z: Number): void
		function addTileEntity(x: Number, y: Number, z: Number): void
		function removeTileEntity(x: Number, y: Number, z: Number): void
		function getContainer(x: Number, y: Number, z: Number): void
		function getWorldTime(): void
		function setWorldTime(time: any): void
		function setDayMode(day: Number): void
		function setNightMode(night: any): void
		function getWeather(): void
		function setWeather(weather: any): void
		function drop(x: Number, y: Number, z: Number, id: Number, count: Number, data: Number): void
		function explode(x: Number, y: Number, z: Number, power: any, fire: any): void
		function getBiome(x: Number, z: Number): void
		function getBiomeName(x: Number, z: Number): void
		function getGrassColor(x: Number, z: Number): void
		function setGrassColor(x: Number, z: Number, color: any): void
		function getGrassColorRGB(x: Number, z: Number): void
		function setGrassColorRGB(x: Number, z: Number, rgb: any): void
		function playSound(x: Number, y: Number, z: Number, name: String, volume: any, pitch: any): void
		function playSoundAtEntity(entity: Number, name: String, volume: any, pitch: any): void
	}
	const isLoaded: Boolean
	function setLoaded(isLoaded: any): void
	function isWorldLoaded(): void
	function getThreadTime(): void
	function nativeSetBlock(): void
	function nativeGetBlockID(): void
	function nativeGetBlockData(x: Number, y: Number, z: Number): void
	function setBlock(x: Number, y: Number, z: Number, id: Number, data: Number): void
	function setFullBlock(x: Number, y: Number, z: Number, fullTile: any): void
	function getBlock(x: Number, y: Number, z: Number): {
		id: Number
		data: Number
	}
	function getBlockID(x: Number, y: Number, z: Number): Number
	function getBlockData(x: Number, y: Number, z: Number): Number
	function destroyBlock(x: Number, y: Number, z: Number, drop: any): void
	function getLightLevel(x: Number, y: Number, z: Number): Number
	function isChunkLoaded(x: Number, z: Number): Boolean
	function isChunkLoadedAt(x: Number, y: Number, z: Number): Boolean
	function getTileEntity(x: Number, y: Number, z: Number): {}
	function addTileEntity(x: Number, y: Number, z: Number): void
	function removeTileEntity(x: Number, y: Number, z: Number): void
	function getContainer(x: Number, y: Number, z: Number): {}
	function getWorldTime(): Number
	function setWorldTime(time: any): void
	function setDayMode(day: Number): void
	function setNightMode(night: any): void
	function getWeather(): String
	function setWeather(weather: any): void
	function drop(x: Number, y: Number, z: Number, id: Number, count: Number, data: Number): void
	function explode(x: Number, y: Number, z: Number, power: any, fire: any): void
	function getBiome(x: Number, z: Number): void
	function getBiomeName(x: Number, z: Number): void
	function getGrassColor(x: Number, z: Number): void
	function setGrassColor(x: Number, z: Number, color: any): void
	function getGrassColorRGB(x: Number, z: Number): void
	function setGrassColorRGB(x: Number, z: Number, rgb: any): void
	function canSeeSky(x: Number, y: Number, z: Number): void
	function playSound(x: Number, y: Number, z: Number, name: String, volume: any, pitch: any): void
	function playSoundAtEntity(entity: Number, name: String, volume: any, pitch: any): void
}
declare namespace Entity {
	function getAll(): void
	function getAllJS(): void
	const EXTRA_DATA_PREFIX: String
	function getExtra(ent: Number, name: String): void
	function putExtra(ent: Number, name: String, extra: any): void
	function getExtraJson(ent: Number, name: String): void
	function putExtraJson(ent: Number, name: String, obj: any): void
	function addEffect(ent: Number, effectId: any, effectTime: any, effectData: any, strength: any, particles: any): void
	function clearEffect(ent: Number, id: Number): void
	function clearEffects(ent: Number): void
	function damageEntity(ent: Number, damage: any, cause: any, params: any): void
	function healEntity(ent: Number, heal: any): void
	function getType(ent: Number): void
	function setHitbox(ent: Number, w: any, h: any): void
	function isExist(entity: Number): void
	function spawn(x: Number, y: Number, z: Number, type: Number, skin: any): void
	function spawnCustom(name: String, x: Number, y: Number, z: Number, extra: any): void
	function spawnCustomAtCoords(name: String, coords: { x: Number, y: Number, z: Number }, extra: any): void
	function spawnAtCoords(coords: { x: Number, y: Number, z: Number }, type: Number, skin: any): void
	function remove(entity: Number): void
	function getCustom(entity: Number): void
	function getAge(ent: Number): void
	function setAge(ent: Number, age: any): void
	function getSkin(ent: Number): void
	function setSkin(ent: Number, skin: any): void
	function setTexture(ent: Number, texture: any): void
	function getRender(ent: Number): void
	function setRender(ent: Number, render: any): void
	function rideAnimal(ent1: any, ent2: any): void
	function getNameTag(ent: Number): void
	function setNameTag(ent: Number, tag: any): void
	function getTarget(ent: Number): void
	function setTarget(ent: Number, target: any): void
	function getMobile(ent: Number, mobile: any): void
	function setMobile(ent: Number, mobile: any): void
	function getSneaking(ent: Number): void
	function setSneaking(ent: Number, sneak: any): void
	function getRider(ent: Number): void
	function getRiding(ent: Number): void
	function setFire(ent: Number, fire: any, force: any): void
	function health(entity: Number): void
	function getHealth(ent: Number): void
	function setHealth(ent: Number, health: any): void
	function getMaxHealth(ent: Number): void
	function setMaxHealth(ent: Number, health: any): void
	function setPosition(ent: Number, x: Number, y: Number, z: Number): void
	function getPosition(ent: Number): void
	function addPosition(ent: Number, x: Number, y: Number, z: Number): void
	function setVelocity(ent: Number, x: Number, y: Number, z: Number): void
	function getVelocity(ent: Number): void
	function addVelocity(ent: Number, x: Number, y: Number, z: Number): void
	function getDistanceBetweenCoords(coords1: any, coords2: any): void
	function getDistanceToCoords(ent: Number, coords: { x: Number, y: Number, z: Number }): void
	function getDistanceToEntity(ent1: any, ent2: any): void
	function getXZPlayerDis(entity: Number): void
	function getLookAngle(ent: Number): void
	function setLookAngle(ent: Number, yaw: any, pitch: any): void
	function getLookVectorByAngle(angle: any): void
	function getLookVector(ent: Number): void
	function getLookAt(ent: Number, x: Number, y: Number, z: Number): void
	function lookAt(ent: Number, x: Number, y: Number, z: Number): void
	function lookAtCoords(ent: Number, coords: { x: Number, y: Number, z: Number }): void
	/**
	 * @param params { speed: 0, denyY: false, jumpVel: 0 }
	 */
	function moveToTarget(ent: Number, target: any, params: any): void
	/**
	 * @param params { speed: 0, denyY: false, jumpVel: 0 }
	 */
	function moveToAngle(ent: Number, angle: any, params: any): void
	/**
	 * @param params { speed: 0, denyY: false, jumpVel: 0 }
	 */
	function moveToLook(ent: Number, params: any): void
	/**
	 * @param ent - Entity id
	 * @returns x - проекция единичного вектора скорости сущности на ось x
	 * @returns y - проекция единичного вектора скорости сущности на ось y
	 * @returns z - проекция единичного вектора скорости сущности на ось z
	 * @returns size - длина вектора скорости, численное значение скорости сущности
	 * @returns xzsize - скорость сущности в горизонтальной плоскости
	 */
	function getMovingVector(ent: Number): void
	/**
	 * @param ent - Entity id
	 * @returns pitch, yaw - возвращает угол передвижения сущности ent
	 */
	function getMovingAngle(ent: Number): void
	function getMovingAngleByPositions(pos1: any, pos2: any): void
	function findNearest(coords: { x: Number, y: Number, z: Number }, type: Number, maxRange: any): void
	function getAllInRange(coords: { x: Number, y: Number, z: Number }, maxRange: any, type: Number): void
	function getInventory(ent: Number, handleNames: any, handleEnchant: any): void
	function getArmorSlot(ent: Number, slot: Number): void
	function setArmorSlot(ent: Number, slot: Number, id: Number, count: Number, data: Number): void
	function getCarriedItem(ent: Number, handleEnchant: any, handleNames: any): void
	function setCarriedItem(ent: Number, id: Number, count: Number, data: Number, extra: any): void
	function getDroppedItem(ent: Number): void
	/**
	 * Устанавливает сущности с идентификатором ent предмет с данными: идентификатор, количество, метадата, экстра-дата
	 * @param ent Entity id
	 * @param id идентификатор предмета
	 * @param count количество
	 * @param data метадата
	 * @param extra экстра-дата
	 */
	function setDroppedItem(ent: Number, id: Number, count: Number, data: Number, extra: Object): void
	function getProjectileItem(projectile: any): void
}
declare const Player: {
	get(): void
	getNameForEnt(ent: Number): void
	getName(): void
	getDimension(): void
	isPlayer(ent: Number): void
	getPointed(): void
	getInventory(loadPart: any, handleEnchant: any, handleNames: any): void
	addItemToInventory(id: Number, count: Number, data: Number): void
	getCarriedItem(handleEnchant: any, handleNames: any): void
	setCarriedItem(id: Number, count: Number, data: Number, enchant: any, name: String): void
	decreaseCarriedItem(count: Number): void
	getInventorySlot(slot: Number): void
	setInventorySlot(slot: Number, id: Number, count: Number, data: Number): void
	getArmorSlot(slot: Number): void
	setArmorSlot(slot: Number, id: Number, count: Number, data: Number): void
	getSelectedSlotId(): void
	setSelectedSlotId(slot: Number): void
	setPosition(x: Number, y: Number, z: Number): void
	getPosition(): void
	addPosition(x: Number, y: Number, z: Number): void
	setVelocity(x: Number, y: Number, z: Number): void
	getVelocity(): void
	addVelocity(x: Number, y: Number, z: Number): void
	experience(): void
	getExperience(): void
	setExperience(exp: any): void
	addExperience(exp: any): void
	level(): void
	getLevel(): void
	setLevel(level: any): void
	addLevel(level: any): void
	flying(): void
	getFlyingEnabled(): void
	setFlyingEnabled(enabled: any): void
	getFlying(): void
	setFlying(enabled: any): void
	exhaustion(): void
	getExhaustion(): void
	setExhaustion(value: any): void
	hunger(): void
	getHunger(): void
	setHunger(value: any): void
	saturation(): void
	getSaturation(): void
	setSaturation(value: any): void
	health(): void
	getHealth(): void
	setHealth(value: any): void
	score(): void
	getScore(): void
}
declare namespace Logger {
	function Log(msg: String, prefix: String): void
	function LogError(error: String): void
	function Flush(): void
}
declare namespace Game {
	function message(msg: any): void
	function prevent(): void
	function tipMessage(msg: any): void
	function dialogMessage(message: any, title: any): void
	function setDifficulty(difficulty: Number): void
	function getDifficulty(): void
	function getMinecraftVersion(): void
	function getEngineVersion(): String
	function selectLevel(name: String): void
	function setCamera(entity: Number): void
	function setTickingSpeed(speed: any): void
	//
}
declare namespace EntityAI {
	namespace Idle {
		function getDefaultPriority(): void
		function getDefaultName(): void
		function setParams(params: any): void
		function execution2Started(): void
		function executionEnded(): void
		function executionPaused(): void
		function executionResumed(): void
		function execute(): void
		function setExecutionTimer(timer: any): void
		function removeExecutionTimer(): void
		function executionTimer(): void
		const isInstance: Boolean
		function instantiate(parent: Number, name: String): void
		function aiEntityChanged(entity: Number): void
		function finishExecution(): void
		function changeSelfPriority(priority: Number): void
		function enableAI(name: String, priority: Number, extra: any): void
		function disableAI(name: String): void
		function setPriority(name: String, priority: Number): void
		function getAI(name: String): void
		function getPriority(name: String): void
		function attackedBy(entity: Number): void
		function hurtBy(entity: Number): void
		function projectileHit(projectile: any): void
		function death(entity: Number): void
		function getDefaultPrioriy(): void
	}
	namespace Follow {
		function getDefaultPriority(): void
		function getDefaultName(): void
		namespace params {
			const speed: Number
			const jumpVel: Number
			const rotateSpeed: Number
			const rotateRatio: Number
			const rotateHead: Boolean
			const denyY: Boolean
		}
		function setParams(params: any): void
		function executionStarted(): void
		function executionEnded(): void
		function executionPaused(): void
		function executionResumed(): void
		function execute(): void
		function setExecutionTimer(timer: any): void
		function removeExecutionTimer(): void
		const movingYaw: Number
		const isInstance: Boolean
		function instantiate(parent: Number, name: String): void
		function aiEntityChanged(entity: Number): void
		function finishExecution(): void
		function changeSelfPriority(priority: Number): void
		function enableAI(name: String, priority: Number, extra: any): void
		function disableAI(name: String): void
		function setPriority(name: String, priority: Number): void
		function getAI(name: String): void
		function getPriority(name: String): void
		function attackedBy(entity: Number): void
		function hurtBy(entity: Number): void
		function projectileHit(projectile: any): void
		function death(entity: Number): void
	}
	namespace Panic {
		function getDefaultPriority(): void
		function getDefaultName(): void
		namespace params {
			const speed: Number
			const angular_speed: Number
		}
		function setParams(params: any): void
		function executionStarted(): void
		function executionEnded(): void
		function executionPaused(): void
		function executionResumed(): void
		function execute(): void
		function setExecutionTimer(timer: any): void
		function removeExecutionTimer(): void
		namespace data {
			const yaw: Number
			const add: Number
		}
		const isInstance: Boolean
		function instantiate(parent: Number, name: String): void
		function aiEntityChanged(entity: Number): void
		function finishExecution(): void
		function changeSelfPriority(priority: Number): void
		function enableAI(name: String, priority: Number, extra: any): void
		function disableAI(name: String): void
		function setPriority(name: String, priority: Number): void
		function getAI(name: String): void
		function getPriority(name: String): void
		function attackedBy(entity: Number): void
		function hurtBy(entity: Number): void
		function projectileHit(projectile: any): void
		function death(entity: Number): void
		function randomize(): void
	}
	namespace Wander {
		function getDefaultPriority(): void
		function getDefaultName(): void
		namespace params {
			const speed: Number
			const angular_speed: Number
			const delay_weight: Number
		}
		function setParams(params: any): void
		function executionStarted(): void
		function executionEnded(): void
		function executionPaused(): void
		function executionResumed(): void
		function execute(): void
		function __execute(): void
		function setExecutionTimer(timer: any): void
		function removeExecutionTimer(): void
		namespace data {
			const yaw: Number
			const add: Number
			const delay: Boolean
			const _delay: Boolean
		}
		const isInstance: Boolean
		function instantiate(parent: Number, name: String): void
		function aiEntityChanged(entity: Number): void
		function finishExecution(): void
		function changeSelfPriority(priority: Number): void
		function enableAI(name: String, priority: Number, extra: any): void
		function disableAI(name: String): void
		function setPriority(name: String, priority: Number): void
		function getAI(name: String): void
		function getPriority(name: String): void
		function attackedBy(entity: Number): void
		function hurtBy(entity: Number): void
		function projectileHit(projectile: any): void
		function death(entity: Number): void
		function randomize(): void
	}
	namespace Attack {
		function getDefaultPriority(): void
		function getDefaultName(): void
		namespace params {
			const attack_damage: Number
			const attack_range: Number
			const attack_rate: Number
		}
		function setParams(params: any): void
		function executionStarted(): void
		function executionEnded(): void
		function executionPaused(): void
		function executionResumed(): void
		function execute(): void
		function setExecutionTimer(timer: any): void
		function removeExecutionTimer(): void
		namespace data {
			const timer: Number
		}
		const isInstance: Boolean
		function instantiate(parent: Number, name: String): void
		function aiEntityChanged(entity: Number): void
		function finishExecution(): void
		function changeSelfPriority(priority: Number): void
		function enableAI(name: String, priority: Number, extra: any): void
		function disableAI(name: String): void
		function setPriority(name: String, priority: Number): void
		function getAI(name: String): void
		function getPriority(name: String): void
		function attackedBy(entity: Number): void
		function hurtBy(entity: Number): void
		function projectileHit(projectile: any): void
		function death(entity: Number): void
	}
	namespace Swim {
		function getDefaultPriority(): void
		function getDefaultName(): void
		namespace params {
			const velocity: Number
		}
		function setParams(params: any): void
		function executionStarted(): void
		function executionEnded(): void
		function executionPaused(): void
		function executionResumed(): void
		function execute(): void
		function setExecutionTimer(timer: any): void
		function removeExecutionTimer(): void
		namespace data {
			const executionTimer: Number
		}
		const isInstance: Boolean
		function instantiate(parent: Number, name: String): void
		function aiEntityChanged(entity: Number): void
		function finishExecution(): void
		function changeSelfPriority(priority: Number): void
		function enableAI(name: String, priority: Number, extra: any): void
		function disableAI(name: String): void
		function setPriority(name: String, priority: Number): void
		function getAI(name: String): void
		function getPriority(name: String): void
		function attackedBy(entity: Number): void
		function hurtBy(entity: Number): void
		function projectileHit(projectile: any): void
		function death(entity: Number): void
		const inWater: Boolean
	}
	namespace PanicWatcher {
		function getDefaultPriority(): void
		function getDefaultName(): void
		namespace params {
			const panic_time: Number
			const priority_panic: Number
			const priority_default: Number
			const name: String
		}
		function setParams(params: any): void
		function executionStarted(): void
		function executionEnded(): void
		function executionPaused(): void
		function executionResumed(): void
		function execute(): void
		function __execute(): void
		function setExecutionTimer(timer: any): void
		function removeExecutionTimer(): void
		namespace data {
			const timer: Number
		}
		const isInstance: Boolean
		function instantiate(parent: Number, name: String): void
		function aiEntityChanged(entity: Number): void
		function finishExecution(): void
		function changeSelfPriority(priority: Number): void
		function enableAI(name: String, priority: Number, extra: any): void
		function disableAI(name: String): void
		function setPriority(name: String, priority: Number): void
		function getAI(name: String): void
		function getPriority(name: String): void
		function attackedBy(entity: Number): void
		function hurtBy(): void
		function projectileHit(projectile: any): void
		function death(entity: Number): void
	}
}
declare namespace GenerationUtils {
	function isTerrainBlock(id: Number): void
	function isTransparentBlock(id: Number): void
	function canSeeSky(x: Number, y: Number, z: Number): void
	function randomXZ(cx: Number, cz: Number): void
	function randomCoords(cx: Number, cz: Number, lowest: any, highest: any): void
	function findSurface(x: Number, y: Number, z: Number): void
	function findHighSurface(x: Number, z: Number): void
	function findLowSurface(x: Number, z: Number): void
	namespace __lockedReal {
		const id: Number
		const data: Number
	}
	function lockInBlock(id: Number, data: Number, checkerTile: any, checkerMode: any): void
	function setLockedBlock(x: Number, y: Number, z: Number): void
	function genMinable(x: Number, y: Number, z: Number, params: any): void
	function generateOre(x: Number, y: Number, z: Number, id: Number, data: Number, amount: any, noStoneCheck: any): void
}
declare namespace Animation {
	const Base: (x: Number, y: Number, z: Number) => {
		/**
		 * Создает анимацию в игре
		 */
		load(): any
		/**
		 * Cоздает динамичную анимацию в игре, используя функцию callable для изменения рендера и положения.
		 * @param {Function} callable
		 */
		loadCustom(callable: Function): any
		/**
		 * @param x новая позиция по x
		 * @param y новая позиция по y
		 * @param z новая позиция по z
		 */
		setPos(x: Number, y: Number, z: Number): any
		/**
		 * Получает координаты анимации в мире.
		 * @returns x y z
		 */
		coords: { x: Number, y: Number, z: Number }
		/**
		 * Возвращает 0. Вдруг кому пригодится.
		 */
		getAge(): any
		/**
		 * Обновляет объект рендера анимации.
		 */
		refresh(): any
		/**
		 * Уничтожает анимацию в мире.
		 */
		destroy(): any
		/**
		 * Задает настройки для анимации
		 * @param {{}} description render: Number,skin: String, scale: Number
		 */
		describe(description: {}): any
	}
}

declare namespace Particles {
	function addParticlenull(): void
	function addFarParticlenull(): void
	function line(particle: any, coords1: any, coords2: any, gap: any, vel: any, data: Number): void
}
declare namespace Textures {
	namespace bottom {
		const name: String
		const index: Number
	}
	namespace top {
		const name: String
		const index: Number
	}
	namespace back {
		const name: String
		const index: Number
	}
	namespace front {
		const name: String
		const index: Number
	}
	namespace left {
		const name: String
		const index: Number
	}
	namespace right {
		const name: String
		const index: Number
	}
}
declare namespace BlockRenderer {
	const Model: {
		(): {
			addBox(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, id: Number, data: Number): any
			addBox(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, name: String, index: Number): any
			addBox(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, texture_set: String[]): any
			addMesh(mesh: any): any
		};
		(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, texture_set: String[]): any;
		(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, name: String, index: Number): any;
		(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, id: Number, data: Number): any;
		(texture_set: String[]): any;
		(name: String, index: Number): any;
		(id: Number, data: Number): any
	}
	function setCustomCollisionShape(id: Number, data: Number, model: any): any
	function setStaticICRender(id: Number, data: Number, model: any): any
	function mapAtCoords(x: Number, y: Number, z: Number, model: any): any
	function unmapAtCoords(x: Number, y: Number, z: Number): any
}
declare namespace ICRender {
	const Model: () => {
		addEntry(): {
			setCondition(): any
		}
	}
	const CollisionShape: () => {
		addEntry(): {
			setCondition(): any
			addBox(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any): any
		}
	}
	const getGroup: (name: String) => {
		/**
		 * добавляет блок с данным id и data в группу, если вместо data передано число -1, в группу будут добавлены все блоки с этим id
		 */
		add(id: Number, data: Number): any
		/**
		 * возвращает имя группы
		 * @returns name
		 */
		getName(): any
	}
	const getUnnamedGroup: () => {
		/**
		 * добавляет блок с данным id и data в группу, если вместо data передано число -1, в группу будут добавлены все блоки с этим id
		 */
		add(id: Number, data: Number): any
		/**
		 * возвращает имя группы
		 * @returns name
		 */
		getName(): any
	}

	/**
	 *Условие проверки одного блока на координатах (координаты задаются относительно позиции блока, к примеру, позиция на 1 блок выше будет задаваться как 0, 1, 0). Если параметр exclude false, условие выполнится, если данная группа содержит блок на данных координатах, а если exclude true, то если группа его не содержит.
	 * @param x координаты блока
	 * @param y координаты блока
	 * @param z координаты блока
	 * @param group группа
	 * @param exclude будет выполняться если не стоит на координатах. если true
	 */
	function BLOCK(x: Number, y: Number, z: Number, group: String, exclude: Boolean): any
	/**
	 * Логический оператор НЕТ от данного условия, выполняется, если данное условие не выполняется.
	 * @param {*} condition условие
	 */
	function NOT(condition: any): any
	/**
	 * Логический оператор И, принимает 2 или больше условий на вход, выполняется, если все эти условия тоже выполняются.
	 * @param {*} condition1 условие 1
	 * @param {*} condition2 условие 2
	 */
	function AND(condition1: any, condition2: any): any
	/**
	 *
	 * @param {*} condition1 условие 1
	 * @param {*} condition2 условие 2
	 */
	function OR(condition1: any, condition2: any): any
}
declare namespace Block {
	function getNumericId(id: Number): void
	function createBlock(namedID: (String | Number), defineData: any, blockType: any): void
	function createBlockWithRotation(namedID: (String | Number), defineData: any, blockType: any): void
	function isNativeTile(id: Number): void
	function registerDropFunctionForID(numericID: any, dropfunc: Function, level: any): void
	function registerDropFunction(namedID: (String | Number), dropfunc: Function, level: any): void
	function defaultDropFunction(blockcoords: { x: Number, y: Number, z: Number }, blockID: Number, blockData: any, diggingLevel: any): void
	function getDropFunction(id: Number): void
	function setDestroyLevelForID(id: Number, level: any): void
	function setDestroyLevel(namedID: (String | Number), level: any): void
	function setDestroyTime(namedID: (String | Number), time: any): void
	function getDestroyTime(numericID: any): void
	function setTempDestroyTime(numericID: any, time: any): void
	function setBlockMaterial(namedID: (String | Number), material: any, level: any): void
	function setRedstoneTile(namedID: (String | Number), data: Number, isRedstone: any): void
	function onBlockDestroyed(coords: { x: Number, y: Number, z: Number }, fullTile: any): void
	function getBlockDropViaItem(block: any, item: any, coords: { x: Number, y: Number, z: Number }): void
	function registerPlaceFunctionForID(block: any, func: Function): void
	function registerPlaceFunction(namedID: (String | Number), func: Function): void
	function getPlaceFunc(block: any): void
	function setBlockShape(id: Number, pos1: any, pos2: any, data: Number): void
	function setShape(id: Number, x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, data: Number): void
	function createSpecialType(description: any, nameKey: Number): void
	const TYPE_BASE: String
	const TYPE_ROTATION: String
	function setPrototype(namedID: (String | Number), Prototype: any): void
}
declare namespace Item {
	function getNumericId(id: Number): void
	function getItemById(id: Number): void
	function createItem(namedID: (String | Number), name: String, texture: any, params: any): void
	function createFoodItem(namedID: (String | Number), name: String, texture: any, params: any): void
	function createFuelItem(namedID: (String | Number), name: String, texture: any, params: any): void
	function createArmorItem(namedID: (String | Number), name: String, texture: any, params: any): void
	function createThrowableItem(namedID: (String | Number), name: String, texture: any, params: any): void
	function isNativeItem(id: Number): void
	function getMaxDamage(id: Number): void
	function getMaxStack(id: Number): void
	function getName(id: Number, data: Number, encode: any): void
	function isValid(id: Number, data: Number): void
	function addToCreative(id: Number, count: Number, data: Number): void
	function describeItem(numericID: any, description: any): void
	function setCategory(id: Number, category: Number): void
	function setEnchantType(id: Number, enchant: any, value: any): void
	function setToolRender(id: Number, enabled: any): void
	function setMaxDamage(id: Number, maxdamage: any): void
	function setGlint(id: Number, enabled: any): void
	function setLiquidClip(id: Number, enabled: any): void
	function setStackedByData(id: Number, enabled: any): void
	function setProperties(id: Number, props: any): void
	function setUseAnimation(id: Number, animType: any): void
	function registerUseFunctionForID(numericID: any, usefunc: Function): void
	function registerUseFunction(namedID: (String | Number), usefunc: Function): void
	function onItemUsed(coords: { x: Number, y: Number, z: Number }, item: any, block: any): void
	function registerThrowableFunctionForID(numericID: any, usefunc: Function): void
	function registerThrowableFunction(namedID: (String | Number), usefunc: Function): void
	function onProjectileHit(projectile: any, item: any, target: any): void
	function registerIconOverrideFunction(namedID: (String | Number), func: Function): void
	function onIconOverride(item: any): void
	function registerNameOverrideFunction(namedID: (String | Number), func: Function): void
	function onNameOverride(item: any, name: String): void
	function registerNoTargetUseFunction(namedID: (String | Number), func: Function): void
	function onUseNoTarget(item: any): void
	function registerUsingReleasedFunction(namedID: (String | Number), func: Function): void
	function onUsingReleased(item: any, ticks: any): void
	function registerUsingCompleteFunction(namedID: (String | Number), func: Function): void
	function onUsingComplete(item: any): void
	function registerDispenseFunction(namedID: (String | Number), func: Function): void
	function onDispense(coords: { x: Number, y: Number, z: Number }, item: any): void
	const TYPE_BASE: String
	const TYPE_FOOD: String
	const TYPE_ARMOR: String
	const TYPE_THROWABLE: String
	function setPrototype(namedID: (String | Number), Prototype: any): void
}
declare namespace Container {
	function getSlot(name: String): void
	function setSlot(name: String, id: Number, count: Number, data: Number): void
	function clearSlot(name: String): void
	function validateSlot(name: String): void
	function validateAll(): void
	function dropAt(x: Number, y: Number, z: Number): void
	function refreshSlots(): void
	function applyChanges(): void
	function openAs(obj: any): void
	function isOpened(): void
	function close(): void
	function getGuiContent(): void
	function getGuiScreen(): void
	function getElement(name: String): void
	function requireElement(name: String, type: Number): void
	function setScale(name: String, value: any): void
	function setScaleAsLiquid(name: String, id: Number, value: any): void
	function setText(name: String, text: any): void
	function setTextSize(name: String, size: any): void
	function setTextColor(name: String, color: any): void
	function setTextShadow(name: String, shadow: any): void
}
declare namespace ToolAPI {
	const needDamagableItemFix: Boolean
	/**
	 * Добавляет материал блоку
	 * @param name имя самого материала
	 * @param breakingMultiplier число которые будет уровнем ломания блока
	 */
	function addBlockMaterial(name: String, breakingMultiplier: Number): void
	/**
	 * Добавляет материал инструменту
	 * @param name имя материала
	 * @param material материал который будет создан для инструмента
	 */
	function addToolMaterial(name: String, material: String): void
	/**
	 * Регистрирует инструмент
	 * @param id уникальный идентификатор
	 * @param toolMaterial материал из которого сделан инструмент
	 * @param blockMaterials материалы которые может ломать
	 * @param params параметры
	 */
	function registerTool(id: Number, toolMaterial: String, blockMaterials: String, params: any[]): void
	/**
	 * Регистрирует меч
	 * @param id уникальный идентификатор
	 * @param toolMaterial материал из которого сделан инструмент
	 * @param params параметры
	 */
	function registerSword(id: Number, toolMaterial: String, params: any[]): void
	/**
	 * Регистрация материала для блока
	 * @param uid уникальный идентификатор
	 * @param materialName имя материала
	 * @param level уровень
	 * @param isNative является ли ванильным предметом
	 */
	function registerBlockMaterial(uid: String, materialName: String, level: Number, isNative: Boolean): void
	/**
	 * Регистрация уровня ломания для блока
	 * @param uid уникальный идентификатор
	 * @param level уровень
	 */
	function registerBlockDiggingLevel(uid: Number, level: Number): void
	/**
	 * Регистрирует для блоков в массиве UIDs материал
	 * @param materialName имя материала
	 * @param UIDs уникальные идентификаторы
	 * @param isNative является ли ванильным предметом
	 */
	function registerBlockMaterialAsArray(materialName: String, UIDs: any, isNative: Boolean): void
	/**
	 * Обновляет список
	 */
	function refresh(): void
	/**
	 * Возвращает данные блока
	 * @param blockID идентификатор блока
	 * @return data
	 */
	function getBlockData(blockID: Number): Number
	/**
	 * Возвращает материал блока
	 * @param blockID идентификатор блока
	 * @return material
	 */
	function getBlockMaterial(blockID: Number): String
	/**
	 * Возвращает уровень ломания блока
	 * @param blockID идентификатор блока
	 * @return level
	 */
	function getBlockDestroyLevel(blockID: Number): Number
	/**
	 * Возвращает зачарование из extra
	 * @param enchant
	 */
	function getEnchantExtraData(enchant: Number): void
	function fortuneDropModifier(drop: any, level: any): void
	function getDestroyTimeViaTool(fullBlock: any, toolItem: any, coords: { x: Number, y: Number, z: Number }, ignoreNative: Boolean): void
	function getToolData(itemID: Number): void
	function getToolLevel(itemID: Number): void
	function getToolLevelViaBlock(itemID: Number, blockID: Number): void
	function getCarriedToolData(): void
	function getCarriedToolLevel(): void
	function startDestroyHook(coords: { x: Number, y: Number, z: Number }, block: any, carried: Boolean): void
	function destroyBlockHook(coords: { x: Number, y: Number, z: Number }, block: any, carried: Boolean): void
	const LastAttackTime: Number
	function playerAttackHook(attackerPlayer: any, victimEntity: Number, carried: Boolean): void
	function resetEngine(): void
	function dropExpOrbs(x: Number, y: Number, z: Number, value: any): void
	function dropOreExp(coords: { x: Number, y: Number, z: Number }, minVal: any, maxVal: any, modifier: any): void
}
declare namespace Armor {
	function registerFuncs(id: Number, funcs: Function): void
	function preventDamaging(id: Number): void
}
declare namespace LiquidRegistry {
	const liquidStorageSaverId: Number
	namespace liquids {
		namespace water {
			const key: String
			const name: String
			const uiTextures: {
				0: any
			}
			function addUITexture(name: String): void
			function addModelTexture(name: String): void
		}
		namespace lava {
			const key: String
			const name: String
			const uiTextures: {
				0: any
			}
			function addUITexture(name: String): void
			function addModelTexture(name: String): void
		}
		namespace milk {
			const key: String
			const name: String
			const uiTextures: {
				0: any
			}
			function addUITexture(name: String): void
			function addModelTexture(name: String): void
		}
	}
	function registerLiquid(key: Number, name: String, uiTextures: any, modelTextures: any): void
	function getLiquidData(key: Number): void
	function isExists(key: Number): void
	function getLiquidName(key: Number): void
	function getLiquidUITexture(key: Number, width: any, height: any): void
	function getLiquidUIBitmap(key: Number, width: any, height: any): void
	const FullByEmpty: {
		325: {
			milk: {
				id: Number
				data: Number
			}
		}[]
		374: {
			water: {
				id: Number
				data: Number
			}
		}[]
	}
	const EmptyByFull: {
		325: {
			1: {
				id: Number
				data: Number
				liquid: String
			}
		}[]
		373: {
			0: {
				id: Number
				data: Number
				liquid: String
			}
		}[]
	}
	function registerItem(liquid: any, empty: Number, full: any): void
	function getEmptyItem(id: Number, data: Number): void
	function getItemLiquid(id: Number, data: Number): void
	function getFullItem(id: Number, data: Number, liquid: any): void
	function Storage(tileEntity: Number): void
}
declare namespace Native {
	namespace ArmorType {
		const helmet: Number | 0
		const chestplate: Number | 1
		const leggings: Number | 2
		const boots: Number | 3
	}
	namespace ItemCategory {
		const DECORATION: Number | 2
		const FOOD: Number | 4
		const INTERNAL: Number | 0
		const MATERIAL: Number | 1
		const TOOL: Number | 3
	}
	namespace ParticleType {
		const angryVillager: Number | 30
		const bubble: Number | 1
		const carrotboost: String | 'carrotboost'
		const cloud: Number | 4
		const crit: Number | 2
		const dripLava: Number | 22
		const dripWater: Number | 21
		const enchantmenttable: Number | 32
		const fallingDust: Number | 23
		const flame: Number | 6
		const happyVillager: Number | 31
		const heart: Number | 15
		const hugeexplosion: Number | 13
		const hugeexplosionSeed: Number | 12
		const ink: Number | 27
		const itemBreak: Number | 10
		const largeexplode: Number | 5
		const lava: Number | 7
		const mobFlame: Number | 14
		const note: Number | 24
		const portal: Number | 18
		const rainSplash: Number | 29
		const redstone: Number | 9
		const slime: Number | 28
		const smoke: Number | 3
		const smoke2: Number | 8
		const snowballpoof: Number | 11
		const spell: Number | 24
		const spell2: Number | 25
		const spell3: Number | 26
		const splash: Number | 19
		const suspendedTown: Number | 17
		const terrain: Number | 16
		const waterWake: Number | 20
		const witchspell: String | 'witchspell'
	}
	namespace Color {
		const AQUA: String | '§b'
		const BEGIN: String | '§'
		const BLACK: String | '§0'
		const BLUE: String | '§9'
		const BOLD: String | '§l'
		const DARK_AQUA: String | '§3'
		const DARK_BLUE: String | '§1'
		const DARK_GRAY: String | '§8'
		const DARK_GREEN: String | '§2'
		const DARK_PURPLE: String | '§5'
		const DARK_RED: String | '§4'
		const GOLD: String | '§6'
		const GRAY: String | '§7'
		const GREEN: String | '§a'
		const LIGHT_PURPLE: String | '§d'
		const RED: String | '§c'
		const RESET: String | '§r'
		const WHITE: String | '§f'
		const YELLOW: String | '§e'
	}
	namespace EntityType {
		const ARROW: Number | 80
		const BAT: Number | 19
		const BLAZE: Number | 43
		const BOAT: Number | 90
		const CAVE_SPIDER: Number | 40
		const CHICKEN: Number | 10
		const COW: Number | 11
		const CREEPER: Number | 33
		const EGG: Number | 82
		const ENDERMAN: Number | 38
		const EXPERIENCE_ORB: Number | 69
		const EXPERIENCE_POTION: Number | 68
		const FALLING_BLOCK: Number | 66
		const FIREBALL: Number | 85
		const FISHING_HOOK: Number | 77
		const GHAST: Number | 41
		const IRON_GOLEM: Number | 20
		const ITEM: Number | 64
		const LAVA_SLIME: Number | 42
		const LIGHTNING_BOLT: Number | 93
		const MINECART: Number | 84
		const MUSHROOM_COW: Number | 16
		const OCELOT: Number | 22
		const PAINTING: Number | 83
		const PIG: Number | 12
		const PIG_ZOMBIE: Number | 36
		const PLAYER: Number | 63
		const POLAR_BEAR: Number | 28
		const PRIMED_TNT: Number | 65
		const RABBIT: Number | 18
		const SHEEP: Number | 13
		const SILVERFISH: Number | 39
		const SKELETON: Number | 34
		const SLIME: Number | 37
		const SMALL_FIREBALL: Number | 94
		const SNOWBALL: Number | 81
		const SNOW_GOLEM: Number | 21
		const SPIDER: Number | 35
		const SQUID: Number | 17
		const THROWN_POTION: Number | 86
		const VILLAGER: Number | 15
		const WOLF: Number | 14
		const ZOMBIE: Number | 32
		const ZOMBIE_VILLAGER: Number | 44
	}
	namespace MobRenderType {
		const arrow: Number | 25
		const bat: Number | 10
		const blaze: Number | 18
		const boat: Number | 35
		const camera: Number | 48
		const chicken: Number | 5
		const cow: Number | 6
		const creeper: Number | 22
		const egg: Number | 28
		const enderman: Number | 24
		const expPotion: Number | 45
		const experienceOrb: Number | 40
		const fallingTile: Number | 33
		const fireball: Number | 37
		const fishHook: Number | 26
		const ghast: Number | 17
		const human: Number | 3
		const ironGolem: Number | 42
		const item: Number | 4
		const lavaSlime: Number | 16
		const lightningBolt: Number | 41
		const map: Number | 50
		const minecart: Number | 34
		const mushroomCow: Number | 7
		const ocelot: Number | 43
		const painting: Number | 32
		const pig: Number | 8
		const player: Number | 27
		const rabbit: Number | 46
		const sheep: Number | 9
		const silverfish: Number | 21
		const skeleton: Number | 19
		const slime: Number | 23
		const smallFireball: Number | 38
		const snowGolem: Number | 44
		const snowball: Number | 29
		const spider: Number | 20
		const squid: Number | 36
		const thrownPotion: Number | 31
		const tnt: Number | 2
		const unknownItem: Number | 30
		const villager: Number | 12
		const villagerZombie: Number | 39
		const witch: Number | 47
		const wolf: Number | 11
		const zombie: Number | 14
		const zombiePigman: Number | 15
	}
	namespace PotionEffect {
		const movementSpeed: Number | 1
		const movementSlowdown: Number | 2
		const digSpeed: Number | 3
		const digSlowdown: Number | 4
		const damageBoost: Number | 5
		const heal: Number | 6
		const harm: Number | 7
		const jump: Number | 8
		const confusion: Number | 9
		const regeneration: Number | 10
		const damageResistance: Number | 11
		const fireResistance: Number | 12
		const waterBreathing: Number | 13
		const invisibility: Number | 14
		const blindness: Number | 15
		const nightVision: Number | 16
		const hunger: Number | 17
		const weakness: Number | 18
		const poison: Number | 19
		const wither: Number | 20
		const healthBoost: Number | 21
		const absorption: Number | 22
		const saturation: Number | 23
	}
	namespace Dimension {
		const END: Number | 2
		const NETHER: Number | 1
		const NORMAL: Number | 0
	}
	namespace ItemAnimation {
		const bow: Number | 4
		const normal: Number | 0
	}
	namespace BlockSide {
		const DOWN: Number | 0
		const EAST: Number | 5
		const NORTH: Number | 2
		const SOUTH: Number | 3
		const UP: Number | 1
		const WEST: Number | 4
	}
	namespace Enchantment {
		const AQUA_AFFINITY: Number | 7
		const BANE_OF_ARTHROPODS: Number | 11
		const BLAST_PROTECTION: Number | 3
		const DEPTH_STRIDER: Number | 8
		const EFFICIENCY: Number | 15
		const FEATHER_FALLING: Number | 2
		const FIRE_ASPECT: Number | 13
		const FIRE_PROTECTION: Number | 1
		const FLAME: Number | 21
		const FORTUNE: Number | 18
		const INFINITY: Number | 22
		const KNOCKBACK: Number | 12
		const LOOTING: Number | 14
		const LUCK_OF_THE_SEA: Number | 23
		const LURE: Number | 24
		const POWER: Number | 19
		const PROJECTILE_PROTECTION: Number | 4
		const PROTECTION: Number | 0
		const PUNCH: Number | 20
		const RESPIRATION: Number | 6
		const SHARPNESS: Number | 9
		const SILK_TOUCH: Number | 16
		const SMITE: Number | 10
		const THORNS: Number | 5
		const UNBREAKING: Number | 17
	}
	namespace EnchantType {
		const all: Number | 16383
		const axe: Number | 512
		const book: Number | 16383
		const bow: Number | 32
		const fishingRod: Number | 4096
		const flintAndSteel: Number | 256
		const hoe: Number | 64
		const pickaxe: Number | 1024
		const shears: Number | 128
		const shovel: Number | 2048
		const weapon: Number | 16
	}
	namespace BlockRenderLayer {
		const alpha: Number | 4099
		const alpha_seasons: Number | 5
		const alpha_single_side: Number | 4
		const blend: Number | 6
		const doubleside: Number | 2
		const far: Number | 9
		const opaque: Number | 0
		const opaque_seasons: Number | 1
		const seasons_far: Number | 10
		const seasons_far_alpha: Number | 11
		const water: Number | 7
	}
}
