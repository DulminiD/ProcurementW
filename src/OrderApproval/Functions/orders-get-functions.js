import firebase from "../../firebase";
const db = firebase.ref("/Orders");

export function  displayOrderDetails() {
    let orderArray = [];
    db.on("value", (orders)=>{
        orders.forEach((order) => {
            orderArray.push(order.val())
        });
    });
    console.log(orderArray);
    return 'all orders received successfully';
}
