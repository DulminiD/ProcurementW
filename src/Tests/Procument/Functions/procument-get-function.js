import firebase from "../../../firebase";
const db = firebase.ref("/Orders");

export function getOrderID(id) {
   return id;
}



export function getOrder() {
    let orderObj = [];
    let orderID = 'ORD-1'
    db.child('Orders/' + orderID).on('value', snapshot => {
        if (snapshot.exists()) {
            orderObj = snapshot.val()
        }
    })
    return "Object for order receieved successfully";

}


export function getItems() {
    let itemArray = [];
    let orderID = 'ORD-1'
    db.child('Orders/' + orderID).on('value', snapshot => {
        if (snapshot.exists()) {
            itemArray = snapshot.val().item
        }
    })
    return "Items assigned successfully";
}
