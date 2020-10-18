import firebase from "../../firebase";

const db = firebase.ref("/payment");
export default class Payments {
    supplierName;
    orderID;
    amount;
    accountNo;
    branch;
    creditNote;

    makePayment(){
        console.log('hyyyyyyyyy')
        const obj = {
            amount:this.amount,
            sname:this.supplierName,
            orderid:this.orderID,
            creditNote:this.creditNote,
            accountNo:this.accountNo,
            branch:this.branch
        }

        db.push(obj).then((res) => {
            console.log(res);
        })
            .catch((e) => {
                console.log(e);
            });

    }

    getPaidIds(){
        let paid = [];
        db.on('value', snapshot => {
            snapshot.forEach(snap => {
                paid.push(snap.val().orderid);
            });
        })
        return paid
    }


}
