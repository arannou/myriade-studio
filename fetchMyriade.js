function get_myriade_menu_items() {
    return get_all_objects("myriade_menu_item")[myriade_menu_item]
}

function add_myriade_menu_item(item) {
    return create_object("myriade_menu_item", item)
}

function get_myriade_texts() {
    return get_all_objects("myriade_text")[myriade_text]
}

function add_myriade_text(item) {
    return create_object("myriade_text", item)
}