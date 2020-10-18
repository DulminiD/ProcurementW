import firebase from '../../firebase'
const db = firebase.ref();

export default class Order {



    displayOrderDetails(){
        let allOrders = [];
        db.child('Orders').on('value', snapshot => {
            snapshot.forEach(snap => {
                console.log(snap.key);
                allOrders.push(snap.val());
            });
            console.log(allOrders)
        });
        return allOrders;
    }



}
