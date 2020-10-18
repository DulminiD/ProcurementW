
import Item from "../../../Management/Modal/item";
let item = new Item();

export function getItems() {
    let obj = [];
    obj = item.getItems();
    return obj;
}

export function getLength() {
    let length = item.getItems().length;
    return length;
}
