import firebase from "../../firebase";
const budgetdb = firebase.ref("/budget");
const db = firebase.ref();



export default class Procument {

    unitPriceInvalid;
    orderID


    getOrderID(id) {
        this.orderID = id;
    }




    getOrder() {
        let orderObj = [];
        db.child('Orders/' + this.orderID).on('value', snapshot => {
            if (snapshot.exists()) {
                orderObj = snapshot.val()
            }
        })
        return orderObj;

    }


    getItems() {
        let itemArray = [];
        db.child('Orders/' + this.orderID).on('value', snapshot => {
            if (snapshot.exists()) {
                itemArray = snapshot.val().item
            }
        })
        return itemArray;
    }


}
