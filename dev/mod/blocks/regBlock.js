function regBlock(id, name, texture, inCreative) {
    IDRegistry.genBlockID(id);
    Block.createBlockWithRotation(id, [
        {
            name: name,
            texture: texture, 
            inCreative: inCreative 
        }
    ]);
}