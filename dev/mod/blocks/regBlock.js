var t_int = java.lang.Integer.TYPE;
var t_float = java.lang.Float.TYPE;
var block_api = java.lang.Class.forName("zhekasmirnov.launcher.api.NativeBlock", true, UI.getContext().getClass().getClassLoader());
var setFriction = block_api.getMethod("setFriction", t_int, t_float);

BlockFriction = function (id, friction) {
	if(id<256)
		try {
			setFriction.invoke(null, new java.lang.Integer(id), new java.lang.Float(friction));
		}catch(e){
			Logger.Log("Cannot add Block friction for id:"+id+", friction: "+friction+"\nERROR StackTrace:\n"+e, "BlockFriction ERROR")
		}
	else Logger.Log("Cannot works with non Vanilla blocks, caused by InnerCore :D")
};

function regBlock(id, name, texture, inCreative) {
	IDRegistry.genBlockID(id);
	Block.createBlockWithRotation(id, [
		{
			name: name,
			texture: texture, 
			inCreative: inCreative 
		}
	]);
	return BlockID[id];
}