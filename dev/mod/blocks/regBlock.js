function regBlock(id, name, texture, inCreative) {
    IDRegistry.genBlockID(id);
    Block.createBlockWithRotation(id, [
        {
            name: name,
            texture: texture, 
            inCreative: inCreative 
        }
    ]) // создание простого блока на ID "testBlock" с текстурой досок на всех сторонах, будет добавлен в креатив
    if (tooltip) Item.registerNameOverrideFunction(ItemID[texture], function (item, name) {
        return name + tooltip;
    });
    return texture;
}