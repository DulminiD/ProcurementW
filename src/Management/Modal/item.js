import firebase from "../../firebase";
const db = firebase.ref("/item");


export default class Item {
    itemID;
    itemName;
    itemPrice;
    /*
   The item details set from the service class are sent to the database
    */
    addItems(itemObject){
        db.push(itemObject)
            .then((res) => {
                console.log("Created new item successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    /*
    Item details are retreived from the database
     */
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
