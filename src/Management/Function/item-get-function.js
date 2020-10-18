import firebase from "../../firebase";
const db = firebase.ref("/item");

export function getItems() {
    let itemArray = [];
    db.on("value", (items)=>{
        items.forEach((item) => {
            itemArray.push(item.val())
        });
    });
    console.log(itemArray);
    return 'hello';
}

