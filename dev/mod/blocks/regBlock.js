var t_int = java.lang.Integer.TYPE
var t_float = java.lang.Float.TYPE
var block_api = java.lang.Class.forName("zhekasmirnov.launcher.api.NativeBlock", true, UI.getContext().getClass().getClassLoader())
var setFriction = block_api.getMethod("setFriction", t_int, t_float)

BlockFriction = function (id, friction) {
	if (id < 256)
		try {
			setFriction.invoke(null, new java.lang.Integer(id), new java.lang.Float(friction))
		} catch (e) {
			LogError(e, 'Block Friction', true)
		}
	else LogWarning(null, "Cannot works with non Vanilla blocks, caused by InnerCore :D", 'Block Friction')
}

function regBlock(id, name, texture, inCreative, rotation) {
	IDRegistry.genBlockID(id)
	rotation ? Block.createBlock(id, [{ name: name, texture: texture, inCreative: inCreative || true }]) : Block.createBlockWithRotation(id, [{ name: name, texture: texture, inCreative: inCreative || true }])
	return BlockID[id]
}