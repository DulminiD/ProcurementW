import firebase from "../../firebase";
const db = firebase.ref("/item");

export default class Item {
    itemID;
    itemName;

    addItems(itemObject){
        db.push(itemObject)
            .then((res) => {
                console.log("Created new item successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getItems(){
        let itemArray = [];
        db.on("value", (items)=>{
            items.forEach((item) => {
            itemArray.push(item.val())
            });
        });
        console.log(itemArray);
        return itemArray;
    }
}
