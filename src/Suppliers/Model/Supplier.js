import firebase from "../../firebase";

const db = firebase.ref("/suppliers");
export default class Supplier {
    supplierName;
    telephoneNo;
    email;
    address;
    accountNo
    branch
    itemList

    addSupplier(){
        console.log('hyyyyyyyyy')
        const obj = {
            sname: this.supplierName,
            tel: this.telephoneNo,
            email: this.email,
            address: this.address,
            accountNo: this.accountNo,
            branch: this.branch,
            itemList: this.itemList
        }

        console.log(obj.itemList)
        db.push(obj).then((res) => {
            console.log("Created new item successfully!");
            console.log(res);
        })
            .catch((e) => {
                console.log(e);
            });

    }

    getSupplier(){
        let array = []
        db.on("value", (items) => {
            items.forEach((item) => {
                let obj = item.val()
                obj.id = item.key
                array.push(obj);

            });
        });
        console.log(array)
        return array
    }

    getSupplierbyid(id){
        let data = {}
        db.on("value", (items) => {
            items.forEach((item) => {
                console.log(item.key)
                if (item.key === id) {
                    data = item.val()
                }
            });
        });
        return data
    }

    updateSupplier(id,obj){
        db.child(id).update(obj)
        //     .then(() => {
        //     this.props.history.push("/viewsupliers")
        // })
    }
}
