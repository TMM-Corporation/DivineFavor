function translateRu(name, ru) {
    return Translation.addTranslation(name, {ru: ru});
}
function getTranslate(name) {
    return Translation.translate(name);
}
function regItem(texture, name, stack, tooltip) {
    IDRegistry.genItemID(texture);
    Item.createItem(texture, name, { name: texture }, { stack: stack });
    if(tooltip)Item.registerNameOverrideFunction(ItemID[texture], function (item, name) {
        return name + tooltip;
    });
    return texture;
}
// regItem("", "", 1);
// regex \);\nItem\.createItem\("(.*?)"
// regex \{ name: "(.*?)" \}, \{ stack: 
// regex ); to);
// regex IDRegistry\.genItemID\(to regItem(



regItem("ice_arrow", "Ice arrow", 64);
regItem("memory_drop", "Memory drop", 64);
regItem("blade_green", "Green Spell blade", 1);
regItem("blade_red", "Red Spell blade", 1);
regItem("pick_blue", "Blue Spell pickaxe", 1);
regItem("pick_orange", "Orange Spell pickaxe", 1);
regItem("banishing_wand", "Banishing wand", 1);
regItem("paint", "Paint Ethereal Brush", 1);
regItem("big_vial", "Goo vial", 64);
Item.registerIconOverrideFunction(ItemID.big_vial, function (item, name) {
    return { name: "big_vial", meta: item.data }
}); regItem("medium_vial", "Goo vial", 1);
Item.registerIconOverrideFunction(ItemID.medium_vial, function (item, name) {
    return { name: "medium_vial", meta: item.data }
});
regItem("small_vial", "Goo vial", 1);
Item.registerIconOverrideFunction(ItemID.small_vial, function (item, name) {
    return { name: "small_vial", meta: item.data }
});
regItem("mystic_architect_stick", "Mystic architect stick", 1);
regItem("contract_binder", "Contract binder", 1);
regItem("grimoire", "Grimoire", 1);
regItem("memory_pouch", "Memory pouch", 1);
regItem("capacity_major", "Capacity major contract", 1);
regItem("capacity_minor", "Capacity minor contract", 1);
regItem("creative", "Creative contract", 1);
regItem("inform", "Inform contract", 1);
regItem("regen_major", "Regen major contract", 1);
regItem("regen_minor", "Regen minor contract", 1);
regItem("milky_apple", "Milky apple", 1);
regItem("ritual_pouch", "Ritual pouch", 1);
regItem("stone_ball", "Stone ball", 1);
// regItem("roots", "Roots Cursed Arrow", 1);
regItem("book_green", "Book green Spell blade", 1);
regItem("book_red", "Book red Spell blade", 1);
regItem("spell_bow_book", "Spell bow book", 1);
regItem("book_blue", "Book blue Spell pickaxe", 1);
regItem("book_orange", "Book orange Spell pickaxe", 1);
// regItem("hand_swap", "Hand swap Spell arrow", 1);
regItem("bone_key", "Bone key", 1);
regItem("caving_rope", "Caving rope", 1);
// regItem("clock", "Clock", 1);
regItem("immaterial_guide", "Immaterial guide", 1);
regItem("invite_gem", "Invite gem", 1);
regItem("invite_pebble", "Invite pebble", 1);
regItem("marked_glass", "Marked glass", 1);
regItem("storage_gem", "Storage gem", 1);
regItem("warp_gem", "Warp gem", 1);
regItem("warp_pebble", "Warp pebble", 1);

