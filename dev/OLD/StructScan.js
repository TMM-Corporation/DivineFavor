
// var sides = [
// 	[1, 0, 0],
// 	[-1, 0, 0],
// 	[0, 1, 0],
// 	[0, -1, 0],
// 	[0, 0, 1],
// 	[0, 0, -1],
// ]
// var BlockBlackList = {
// 	0: 'air',
// 	2: 'grass',
// 	3: 'dirt'
// }

// var NOTABLOCK = {}
// var structure = []
// function scan(c) {
// 	var coords = [c.x, c.y, c.z];
// 	for (let i in sides) {
// 		var coord = [];
// 		for (let side in sides[i]) {
// 			coord[side] = coords[side] + sides[i][side];
// 		}
// 		var coord = { x: coord[0], y: coord[1], y: coord[2] },
// 			block = World.getBlockID(coord.x, coord.y, coord.z);

// 		if (!(block in BlockBlackList)) {
// 			for (let i in structure) {
// 				let cc = structure[i];
// 				if (cc.x != coord.x && cc.y != coord.y && cc.z != coord.z)
// 					structure.push(coord);
// 				scan(coord)
// 			}
// 		}
// 	}
// }

	// else if (item.id == 280 && sn){
	// 	if(!BlockBlackList[block.id])
	// 		BlockBlackList[block.id] = Item.getName(World.getBlock(c.x, c.y, c.z).id, World.getBlock(c.x, c.y, c.z).data);
	// 	else delete BlockBlackList[block.id];
	// }
	// FileTools.WriteText(__dir__ + 'Structure.js', structure + '\n\n' + JSON.stringify(BlockBlackList))
